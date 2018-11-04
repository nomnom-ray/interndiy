<template>
  <div :class="annotatePopupShow || galleryShow ? 'popup_CSSSB' : ''">
    <wux-divider position="left" :text="'1. Description of strategy ' + bundleId + ' in Subcat. ' + boardId + ' (' + title.length + '/200)'" />
    <wux-wing-blank size="large">
      <textarea
        v-if='!annotatePopupShow && !galleryShow'
        class="titleCSSSB"
        v-model='title'
        :maxlength="200"
        placeholder="Name this strategy for implementing the subcategorized behaviors in the project story."
      >
      </textarea>
    </wux-wing-blank>
    <wux-divider position="left" :text="'2. Strategy visualization (' + picURLs.length + '/1 picture)'" />

    <wux-gallery v-if='pageActive === 4' id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url, index) in picURLs"
    >
    <wux-wing-blank size="default">
      <img
        class="pic_position_CSSSB"
        :src="url" mode="aspectFit"
        @click="showGallery(url, index)"
        :id="index"
      />
    </wux-wing-blank>
    </div>
    <div class='uploader_position_CSSSB'>
      <div
        v-if='picURLs.length < 1'
        class="weui-uploader__input-box"
      >
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>

    <wux-row>
      <wux-col span='9' push='3'>
        <div class='info_file_CSSSB' v-if='picsTotal != 0'>
          <span style='color:red'>*</span>
          Storage: {{picSizeUsed}}MB used; ~{{picSizeRemain}}MB remaining.
        </div>
      </wux-col>
    </wux-row>

    <van-popup
    :show="annotatePopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <wux-divider v-if='annotateAddText' position="left" :text="'Annotation: description (' + annotateText.length + '/200)'" />
      <wux-divider v-else position="left" :text="'Annotation: resolution (' + resultText.length + '/400)'" />
      <wux-row>
        <wux-wing-blank size="large">
          <textarea
            v-if='annotateAddText'
            class="popup_annotate_CSSSB"
            v-model='annotateText'
            :maxlength="200"
            placeholder="Name an annotation on the sketch; click on the left-side icon to match it by color."
          >
          </textarea>
          <textarea
            v-else
            class="popup_annotate_CSSSB"
            v-model='resultText'
            :maxlength="400"
            placeholder="Describe how the annotated component contributes to this subcategory's behavior."
          >
          </textarea>
        </wux-wing-blank>
      </wux-row>
      <wux-white-space />
    </van-popup>

    <wux-divider position="left" text="3. Description of annotations" />
    <div
      v-if='structures[boardId].bundles[bundleId] && structures[boardId].bundles[bundleId].annotates.length === 0'
      style='color:grey;text-align:center;font-size:83%;padding:10px'
    >
      No annotation assigned. 
    </div>
    <div
      v-if='structures[boardId].bundles[bundleId]'
    >
    <app-annotatecard
      :key='annotateIndex'
      v-for='(annotate, annotateIndex) in structures[boardId].bundles[bundleId].annotates'
      :propAnnotate = annotate
      :propAnnotateIndex = annotateIndex
      :propBoardIndex = boardId
      :propBundleIndex = bundleId
    ></app-annotatecard>
    </div>

    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSSB'
        @click='annotateNew'
      >Add annotation
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <div class='info_icon_CSSSB'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:40px;margin-right:40px">
      <div class='info_content_CSSSB'>Sketch a strategy for visualization on paper.</div>
      <div class='info_content_CSSSB'>Mark the sketch with colored annotations.</div>
      <div class='info_content_CSSSB'>Match the color of the sketched annotations by 
        adding an annotation here and tapping on the icon.</div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_delete_CSSSB'
        @click='bundleDelete'
      >Delete
      </button>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
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
      galleryShow: false,
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
      this.galleryShow = true;
      const self = this;
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
          this.bundlesUpdate({
            boardIndex: this.boardId,
            bundleIndex: this.bundleId,
            type: 'picURLs',
            content: [],
          });
          that.picURLs = that.structures[that.boardId].bundles[that.bundleId]
            .structurePics;
          self.galleryShow = false;
          return true;
        },
        onTap() {
          self.galleryShow = false;
          return true;
        },
      });
    },
    bundleDelete() {
      if (this.clicked) {
        this.clicked = true;
        return;
      }
      if (this.picURLs.length !== 0) {
        wx.showModal({
          title: 'Delete picture first.',
          confirmText: 'OK',
          cancelText: 'cancel',
          showCancel: false,
        });
      } else {
        const that = this;
        wx.showModal({
          title: 'Confirm Delete',
          confirmText: 'Confirm',
          cancelText: 'cancel',
          success: (resModal) => {
            if (resModal.confirm) {
              that.bundlesDel({ boardIndex: that.boardId, bundleIndex: that.bundleId });
              if (Number(that.structures.bundleOpen) === that.bundleId) {
                that.structures.bundleOpen = JSON
                  .stringify(that.structures[that.boardId].bundles.length - 1);
              }
              if (that.bundleId !== 0) {
                that.bundleId -= 1;
              }
              that.structuresUpdate({
                index: that.boardId,
                type: 'bundlesCount',
                content: that.structures[that.boardId].bundles.length,
              });
              wx.navigateBack();
            }
          },
        });
      }
    },
    popupCloseHandler() {
      this.annotatePopupShow = false;
      this.annotateAddText = false;
      this.resultAddText = false;
      this.galleryShow = false;
      this.annotateText = '';
      this.resultText = '';
      this.annotateToChange = '';
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
    this.annotatePopupShow = false;
    this.annotateAddText = false;
    this.resultAddText = false;
    this.galleryShow = false;
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
      this.bundlesUpdate({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'annotatesCount',
        content: this.structures[this.boardId].bundles[this.bundleId].annotates.length,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.popup_CSSSB{
  position: fixed;
  z-index: 999;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
  .titleCSSSB {
    width: 100%;
    height: 50px;
    overflow:scroll;
    font-size: 83%;
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
.info_file_CSSSB{
  font-size: 75%;
}
.uploader_position_CSSSB{
  width: 77px;
  margin: 0 auto;
}
.pic_position_CSSSB{
  width: 100%;
}
.button_delete_CSSSB{
  background-color: white;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 83%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.button_new_CSSSB{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 83%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.info_icon_CSSSB{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSSB{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: center;
  font-size: 83%;
}
.popup_annotate_CSSSB{
  width: 100%;
  height: 100px;
  overflow:scroll;
  font-size: 83%;
}
</style>
