<template>
  <div>
    bundle: {{boardId}} + {{bundleId}}
    <input
      class="titleCSSSB"
      v-model='title'
      :maxlength="100"
      placeholder="bundle Title"
    >

    <div>
      <div>Upload Picture</div>
      <div>{{picURLs.length}}/1</div>
      <div v-if='picsTotal != 0'>Storage: {{picSizeUsed}}MB used; ~{{picSizeRemain}}MB remaining.</div>
    </div>
    <wux-gallery v-if='pageActive === 6' id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url, index) in picURLs"
    >
      <div class="thumbContainer">
        <img
          class="weui-uploader__img"
          :src="url" mode="aspectFill"
          @click="showGallery(url, index)"
          :id="index"
        />
      </div>
    </div>
    <div
      v-if='picURLs.length < 1'
      class="weui-uploader__input-box"
    >
      <div class="weui-uploader__input" @click="chooseImage"></div>
    </div>
    <van-popup
    :show="annotatePopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <div class='popupCSSSB'>
        <input
          v-if='annotateAddText'
          class="popupinputCSSSB"
          v-model='annotateText'
          :maxlength="200"
          placeholder="depending"
        >
        <input
          v-else
          class="popupinputCSSSB"
          v-model='resultText'
          :maxlength="200"
          placeholder="depending"
        >
      </div>
    </van-popup>
    <div>
      <div>Image Annotations</div>
      <app-annotatecard
        v-if='structures[boardId].bundles[bundleId]'
        :key='annotateIndex'
        v-for='(annotate, annotateIndex) in structures[boardId].bundles[bundleId].annotates'
        :propAnnotate = annotate
        :propAnnotateIndex = annotateIndex
        :propBoardIndex = boardId
        :propBundleIndex = bundleId
      ></app-annotatecard>
    </div>
    <wux-button
      block
      outline
      type="assertive"
      @click='annotateNew'
    >Add annotation
    </wux-button>
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='bundleDelete'
    >Delete
    </wux-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { $wuxGallery } from '../../util/wux';
import Annotatecard from '../../components/annotatecard';

export default {
  components: {
    appAnnotatecard: Annotatecard,
  },
  data() {
    return {
      boardId: 0,
      bundleId: 0,
      clicked: false,
      title: '',
      picToAdd: true,
      picURLs: [],
      picsTotal: '0',
      annotatePopupShow: false,
      annotateText: '',
      resultText: '',
      annotateToChange: 0,
      annotateAddText: false,
      resultAddText: false,
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
    }),
    picSizeUsed() {
      return (this.picsTotal / 1000000).toPrecision(2);
    },
    picSizeRemain() {
      return ((10000000 - this.picsTotal) / 1000000).toPrecision(2);
    },
  },
  methods: {
    ...mapActions({
      tasksAdd: 'tasksAdd',
      tasksDel: 'tasksDel',
      tasksUpdate: 'tasksUpdate',
      structuresUpdate: 'structuresUpdate',
      qualificationUpdate: 'qualificationUpdate',
      bundlesUpdate: 'bundlesUpdate',
      bundlesDel: 'bundlesDel',
      annotatesAdd: 'annotatesAdd',
      annotatesUpdate: 'annotatesUpdate',
      annotatesDel: 'annotatesDel',
    }),
    chooseImage() {
      const that = this;
      wx.chooseImage({
        // count limits how many pictures can be chosen at once
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(resTemp) {
          wx.saveFile({
            tempFilePath: resTemp.tempFilePaths[0],
            success(resSaved) {
              that.bundlesUpdate({
                boardIndex: that.boardId,
                bundleIndex: that.bundleId,
                type: 'picURLs',
                content: [resSaved.savedFilePath],
              });
              that.picURLs = that.structures[that.boardId].bundles[that.bundleId]
                .structurePics;
              that.storageRemainGet();
            },
          });
        },
        fail() {
        },
      });
    },
    storageRemainGet() {
      const that = this;
      wx.getSavedFileList({
        success(res) {
          let picsSizeTotal = 0;
          that.picsTotal = res.fileList.length;
          for (let i = 0; i <= res.fileList.length - 1; i += 1) {
            picsSizeTotal += res.fileList[i].size;
          }
          that.picsTotal = picsSizeTotal;
        },
      });
    },
    showGallery(url, current) {
      const urls = [...this.picURLs];
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        current,
        urls,
        delete: (currentDel) => {
          const that = this;
          wx.removeSavedFile({
            filePath: urls[currentDel],
            success() {
              that.storageRemainGet();
            },
          });
          that.bundlesUpdate({
            boardIndex: this.boardId,
            bundleIndex: this.bundleId,
            type: 'picURLs',
            content: [],
          });
          return true;
        },
        onTap() {
          return true;
        },
      });
    },
    bundleDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.bundlesDel({ boardIndex: this.boardId, bundleIndex: this.bundleId });
      if (Number(this.structures.bundleOpen) === this.bundleId) {
        this.structures.bundleOpen = JSON
          .stringify(this.structures[this.boardId].bundles.length - 1);
      }
      if (this.bundleId !== 0) {
        this.bundleId -= 1;
      }
      this.structuresUpdate({
        index: this.boardId,
        type: 'bundlesCount',
        content: this.structures[this.boardId].bundles.length,
      });
      wx.navigateBack();
    },
    popupCloseHandler() {
      this.annotatePopupShow = false;
      this.annotateText = '';
      this.resultText = '';
      this.annotateToChange = '';
      this.annotateAddText = false;
      this.resultAddText = false;
    },
    annotateNew() {
      const annotateDetail = {
        text: '',
        done: false,
        result: '',
        showResult: false,
        colorPicked: 0,
      };
      this.annotatesAdd({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'add',
        annotateDetail,
      });
      this.annotateAddText = true;
      this.annotateToChange = this.structures[this.boardId].bundles[this.bundleId]
        .annotates.length - 1;
      this.bundlesUpdate({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'annotatesCount',
        content: this.structures[this.boardId].bundles[this.bundleId].annotates.length,
      });
      this.annotatePopupShow = !this.annotatePopupShow;
    },
  },
  watch: {
    title() {
      this.bundlesUpdate({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'title',
        content: this.title,
      });
    },
    picURLs() {
      this.bundlesUpdate({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'picURLs',
        content: this.picURLs,
      });
    },
    annotateText() {
      if (this.annotateToChange !== '') {
        this.annotatesUpdate({
          boardIndex: this.boardId,
          bundleIndex: this.bundleId,
          annotateIndex: this.annotateToChange,
          type: 'text',
          content: this.annotateText,
        });
      }
    },
    resultText() {
      if (this.annotateToChange !== '') {
        this.annotatesUpdate({
          boardIndex: this.boardId,
          bundleIndex: this.bundleId,
          annotateIndex: this.annotateToChange,
          type: 'result',
          content: this.resultText,
        });
      }
    },
    annotatePopupShow() {
      if (this.annotatePopupShow === true && this.annotateToChange !== '') {
        this.annotateText = this.structures[this.boardId].bundles[this.bundleId]
          .annotates[this.annotateToChange].text;
        this.resultText = this.structures[this.boardId].bundles[this.bundleId]
          .annotates[this.annotateToChange].result;
      }
    },
  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.bundleId = Number(this.$root.$mp.query.bundle);
    this.clicked = false;
    this.storageRemainGet();
    this.title = this.structures[this.boardId].bundles[this.bundleId].title || '';
    this.picURLs = this.structures[this.boardId].bundles[this.bundleId].structurePics || [];
  },
  created() {
    this.$root.$on('annotateText', (state) => {
      this.annotateAddText = true;
      this.annotatePopupShow = true;
      this.annotateToChange = state;
    });
    this.$root.$on('resultText', (state) => {
      this.resultAddText = true;
      this.annotatePopupShow = true;
      this.annotateToChange = state;
    });
    this.$root.$on('annotateDelete', (state) => {
      this.annotateToChange = state;
      this.annotatesDel({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        annotateIndex: this.annotateToChange,
      });
      this.annotatesUpdate({
        boardIndex: this.boardId,
        annotateIndex: this.annotateId,
        type: 'annotatesCount',
        content: this.structures[this.boardId].bundles[this.bundleId].annotates.length,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSB {
    position: relative;
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
  .weui-uploader__img {
    display: block;
    width: 79px;
    height: 79px;
  }
  .weui-uploader__input-box {
    float: left;
    position: relative;
    margin-right: 9px;
    margin-bottom: 9px;
    width: 77px;
    height: 77px;
    border: 1px solid #d9d9d9;
  }
  .weui-uploader__input-box:after,
  .weui-uploader__input-box:before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #d9d9d9;
  }
  
  .weui-uploader__input-box:before {
    width: 2px;
    height: 39.5px;
  }
  
  .weui-uploader__input-box:after {
    width: 39.5px;
    height: 2px;
  }
  
  .weui-uploader__input-box:active {
    border-color: #999;
  }
  
  .weui-uploader__input-box:active:after,
  .weui-uploader__input-box:active:before {
    background-color: #999;
  }

  .weui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .popupCSSSB {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  z-index: 999;
  .popupinputCSSSB{
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
  .popupfieldsCSSSB{
    overflow:scroll;
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
}
</style>
