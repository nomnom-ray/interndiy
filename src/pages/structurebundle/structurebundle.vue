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

export default {
  data() {
    return {
      boardId: 0,
      bundleId: 0,
      clicked: false,
      title: '',
      picToAdd: true,
      picURLs: [],
      picsTotal: '0',
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

  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.bundleId = Number(this.$root.$mp.query.bundle);
    this.clicked = false;
    this.storageRemainGet();
    this.title = this.structures[this.boardId].bundles[this.bundleId].title || '';
    this.picURLs = this.structures[this.boardId].bundles[this.bundleId].structurePics || [];
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
</style>
