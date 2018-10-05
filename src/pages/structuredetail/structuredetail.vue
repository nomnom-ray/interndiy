<template>
  <div>
    <input 
      class="titleCSSSD"
      v-model='title'
      :maxlength="100"
      placeholder="Board Title"
    >
    <icon type="info" size="23" color='rbg(0, 255, 255)'/>
    <wux-button
      block
      clear
      type="assertive"
      @click='drawerToggle'
    >Add Concepts
    </wux-button>
    <i-drawer mode="right" :visible="showDrawer" @close="drawerToggle">
      <view class='drawerCSSSD'>
        <i-collapse name="subjects">
          <i-collapse-item
            v-if='subject.id != 0'
            :key="subjectIndex"
            v-for='(subject, subjectIndex) in subjects'
            :title="'subject' + subject.id"
            :name="subjectIndex"
          >
            <view slot="content">
              <wux-checkbox-group
                name="concepts"
                :value='checkBoxValues'
                @change='checkBoxChange(subject.id, $event)'>
                <wux-checkbox
                  :key='conceptIndex'
                  v-for='(concept, conceptIndex) in subject.concepts'
                  color="assertive"
                  :title="'concept' + concept.id"
                  :value="concept.id" />
              </wux-checkbox-group>
            </view>
          </i-collapse-item>
        </i-collapse>
      </view>
    </i-drawer>
    <!-- <wux-floating-button 
      position="bottomRight"
      theme="assertive"
      :actionRotate="false"
      @change="drawerToggle" /> -->
    <div>
      <div>Upload Picture</div>
      <div>{{structurePics.length}}/1</div>
      <div v-if='picsTotal != 0'>{{picsRemaining}}</div>
    </div>
    <!-- <wux-gallery v-if='pageActive === 6' id="wux-gallery"></wux-gallery> -->
    <wux-gallery v-if='true' id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url, index) in structurePics[id]"
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
    <div v-if='picToAdd' class="weui-uploader__input-box">
      <div class="weui-uploader__input" @click="chooseImage"></div>
    </div>
    <van-button
      type='default'
      @click='presentationDelete'
      :disabled="clicked"
    >delete
    </van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { $wuxGallery } from '../../util/wux';

export default {
  data() {
    return {
      id: 0,
      clicked: false,
      picToAdd: true,
      title: '',
      checkBoxValues: [],
      // checkBoxObjects: [],
      showDrawer: false,
      picsRemaining: 0,
      picsTotal: 0,
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      structuresCount: 'structuresCount',
      subjects: 'subjects',
      structurePics: 'structurePics',
      conceptList: 'conceptList',
      pageActive: 'pageActive',
    }),
  },
  methods: {
    ...mapActions({
      structuresAdd: 'structuresAdd',
      structuresDel: 'structuresDel',
      structuresCountAdd: 'structuresCountAdd',
      structuresCountDel: 'structuresCountDel',
      structuresUpdate: 'structuresUpdate',
      structurePicsAdd: 'structurePicsAdd',
      structurePicsDel: 'structurePicsDel',
      conceptListAdd: 'conceptListAdd',
      conceptListDel: 'conceptListDel',
    }),
    drawerToggle() {
      this.showDrawer = !this.showDrawer;
    },
    // behaviorsAdd() {
    //   this.conceptListAdd([...this.checkBoxObjects]);
    //   this.checkBoxValues = [];
    //   this.checkBoxObjects = [];
    //   // console.log(this.conceptList);
    //   // this.conceptListDel(conceptSplicedId);
    // },
    checkBoxChange(subjectId, event) {
      const checkedBox = event.mp.detail;
      const checkBoxValues = [...this.checkBoxValues];
      // const concept = { ...this.subjects[subjectId].concepts[checkedBox.index] };
      if (checkedBox.checked) {
        checkBoxValues.push(JSON.stringify(checkedBox.index));
        this.checkBoxValues = checkBoxValues;
        this.conceptListAdd({ boardId: this.id, subjectId, conceptId: checkedBox.index });
      } else {
        const checkedBoxIndex = this.checkBoxValues.indexOf(JSON.stringify(checkedBox.index));
        checkBoxValues.splice(checkedBoxIndex, 1);
        this.checkBoxValues = checkBoxValues;
        const conceptSplicedId = this.conceptList
          .findIndex(item => item.subjectId === subjectId &&
            item.conceptId === checkedBox.index &&
            item.boardId === this.id);
        this.conceptListDel(conceptSplicedId);
      }
    },
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
              that.structurePicsAdd({ boardId: that.id, urls: [resSaved.savedFilePath] });
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
          if (picsSizeTotal !== 0) {
            const picAvgSize = picsSizeTotal / that.picsTotal;
            that.picsRemaining = Math.round((10000000 - picsSizeTotal) / picAvgSize);
          }
        },
      });
    },
    setData(data) {
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    showGallery(url, current) {
      // const picsThisBoard = this.structurePics.findIndex(pic => pic.boardId === this.id);
      const urls = [...this.structurePics[this.id]];
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        current,
        urls,
        delete: (currentDel, urlsDel) => {
          const that = this;
          wx.removeSavedFile({
            filePath: urls[currentDel],
            success() {
              that.storageRemainGet();
            },
          });
          this.structurePicsDel({ boardIndex: this.id, currentDel });
          this.setData({
            urlsDel,
          });
          return true;
        },
        onTap() {
          return true;
        },
        // doesn't work
        // indicatorDots: true,
        // indicatorColor: '#fff',
        // indicatorActiveColor: '#04BE02',
      });
    },
    presentationDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.structuresDel(this.id);
      this.structuresCountDel();
      wx.navigateBack();
    },
  },
  watch: {
    title() {
      // console.log(this.structures);
      this.structuresUpdate({ index: this.id, type: 'title', content: this.title });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = Number(this.$root.$mp.query.id);
    // console.log(this.$root.$mp.page.data.$root[0]);
    this.clicked = false;
    // existing entries gets the data from localstorage
    this.title = this.structures[this.id].title || '';
    // this.description = this.qualifications[this.id].description || '';
  },
  created() {
    const that = this;
    wx.getSavedFileList({
      success(res) {
        let picsSizeTotal = 0;
        that.picsTotal = res.fileList.length;
        for (let i = 0; i <= res.fileList.length - 1; i += 1) {
          picsSizeTotal += res.fileList[i].size;
        }
        if (picsSizeTotal !== 0) {
          const picAvgSize = picsSizeTotal / that.picsTotal;
          that.picsRemaining = Math.round((10000000 - picsSizeTotal) / picAvgSize);
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSD {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
  .drawerCSSSD{
    margin-top: 16vh;
    width: 80vw;
    height: 100vh;
    background:#fff;
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