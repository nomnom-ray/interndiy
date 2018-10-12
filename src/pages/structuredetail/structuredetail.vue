<template>
  <div>
    <wux-toptips id="wux-toptips-structure" />
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
      <wux-accordion-group
        title="concepts"
        :auto='false'
        :current='subjectOpen'
        @change="subjectChange"
      >
        <wux-accordion
          v-if='subject.id != 0'
          :key="subjectIndex"
          v-for='(subject, subjectIndex) in subjects'
          :title="'subject' + subject.id"
          :name="subjectIndex"
        >
          <wux-checkbox-group
            :name="subject.id"
            :value='checkBoxValues[subject.id]'
            @change='checkBoxChange(subject.id, $event)'>
            <wux-checkbox
              :key='conceptIndex'
              v-for='(concept, conceptIndex) in subject.concepts'
              color="assertive"
              :title="'concept' + concept.id + ': ' + concept.question"
              :value="concept.id" />
          </wux-checkbox-group>
        </wux-accordion>
      </wux-accordion-group>
      </view>
    </i-drawer>
    <wux-cell-group title="concepts">
        <wux-cell
          :key='conceptIndex'
          v-for='(concept, conceptIndex) in conceptList'
          :title="subjects[concept.subjectId].concepts[concept.conceptId - subjects[concept.subjectId].concepts[0].id].question"
          @click='conceptListedClicked(concept.subjectId, concept.conceptId)'
        >
        </wux-cell>
    </wux-cell-group>

    <wux-accordion-group
      title="bundles"
      :auto='true'
      accordion
      :defaultCurrent="[structures[id].bundleOpen]"
      @change="bundleChange"
    >
      <wux-accordion
        :key="bundleIndex"
        v-for='(bundle, bundleIndex) in structures[id].bundles'
        :title="bundle.title"
        :name="bundleIndex"
      >
        <app-bundle-card
          :propBundle='bundle'
          :propStructureIndex='id'
          :propBundleIndex='bundleIndex'
        >
        </app-bundle-card>
      </wux-accordion>
    </wux-accordion-group>
    <wux-button
      block
      outline
      type="assertive"
      @click='bundleAdd'
    >Add Bundle
    </wux-button>

    <div>
      <div>Upload Picture</div>
      <div>{{structures[id].structurePics.length}}/1</div>
      <div v-if='picsTotal != 0'>Storage: {{picSizeUsed}}MB used; ~{{picSizeRemain}}MB remaining.</div>
    </div>
    <wux-gallery v-if='pageActive === 6' id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url, index) in structures[id].structurePics"
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
    <div v-if='structures[id].structurePics.length < 1' class="weui-uploader__input-box">
      <div class="weui-uploader__input" @click="chooseImage"></div>
    </div>

    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='structureDelete'
    >{{ structures.length > 1 ? 'Delete' : 'Go back' }}
    </wux-button>
      <!-- <wux-floating-button 
    position="bottomRight"
    theme="assertive"
    :actionRotate="false"
    @change="drawerToggle" /> -->
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { $wuxGallery, $wuxToptips } from '../../util/wux';
import BundleCard from '../../components/structurebundlecard';

export default {
  components: {
    appBundleCard: BundleCard,
  },
  data() {
    return {
      id: 0,
      subjectOpen: ['1'],
      bundleOpen: '0',
      clicked: false,
      picToAdd: true,
      title: '',
      bundlesCount: 0,
      checkBoxValues: [],
      picURLs: [],
      conceptList: [],
      showDrawer: false,
      picsTotal: '0',
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      structuresCount: 'structuresCount',
      subjects: 'subjects',
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
      structuresAdd: 'structuresAdd',
      structuresDel: 'structuresDel',
      structuresCountAdd: 'structuresCountAdd',
      structuresCountDel: 'structuresCountDel',
      structuresUpdate: 'structuresUpdate',
      bundlesAdd: 'bundlesAdd',
      bundlesUpdate: 'bundlesUpdate',
    }),
    bundleAdd() {
      // the other bundlesDetail declaration is in structure
      const bundleDetail = {
        title: '',
        picURLs: [],
      };
      this.bundlesAdd({ boardIndex: this.id, type: 'add', bundleDetail });
      const bundleId = this.structures[this.id].bundles.length - 1;
      this.bundlesCount = this.structures[this.id].bundles.length;
      wx.navigateTo({
        url: `/pages/structurebundle/main?board=${this.id}&bundle=${bundleId}`,
      });
    },
    conceptListedClicked(subjectId, conceptId) {
      $wuxToptips().error({
        hidden: true,
        text: `subject: ${subjectId}, concept: ${conceptId}`,
        duration: 1111,
      });
    },
    subjectChange(e) {
      this.subjectOpen = e.mp.detail.key;
    },
    bundleChange(e) {
      this.bundleOpen = e.mp.detail.key;
      this.structuresUpdate({ index: this.id, type: 'bundleOpen', content: this.bundleOpen });
    },
    drawerToggle() {
      this.showDrawer = !this.showDrawer;
    },
    checkBoxChange(subjectId, event) {
      if (subjectId >= this.checkBoxValues.length) {
        const subjectsToAdd = subjectId - this.checkBoxValues.length;
        for (let i = 0; i <= subjectsToAdd; i += 1) {
          this.checkBoxValues.push([]);
        }
      }
      const checkedBox = event.mp.detail;
      const checkBoxValue = [...this.checkBoxValues[subjectId]];
      if (checkedBox.checked) {
        checkBoxValue.push(checkedBox.value);
        Vue.set(this.checkBoxValues, subjectId, checkBoxValue);

        this.conceptList.push({ subjectId, conceptId: checkedBox.value });
      } else {
        const checkedBoxIndex = checkBoxValue.indexOf(checkedBox.value);
        checkBoxValue.splice(checkedBoxIndex, 1);
        Vue.set(this.checkBoxValues, subjectId, checkBoxValue);
        const conceptSplicedId = this.conceptList.findIndex(item => item.subjectId ===
          subjectId && item.conceptId === checkedBox.value);
        this.conceptList.splice(conceptSplicedId, 1);
      }
      this.structuresUpdate({
        index: this.id, type: 'conceptListSet', content: this.conceptList,
      });
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
              that.structuresUpdate({
                index: that.id, type: 'picURLs', content: [resSaved.savedFilePath],
              });
              that.picURLs = that.structures[that.id].structurePics;
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
          this.structuresUpdate({
            index: this.id, type: 'picURLs', content: [],
          });
          return true;
        },
        onTap() {
          return true;
        },
      });
    },
    structureDelete() {
      if (this.clicked) {
        return;
      }
      if (this.structures.length > 1) {
        this.clicked = true;
        this.structuresDel(this.id);
        if (this.id !== 0) {
          this.id -= 1;
        }
        this.structuresCountDel();
      }
      wx.navigateBack();
    },
  },
  watch: {
    title() {
      this.structuresUpdate({ index: this.id, type: 'title', content: this.title });
    },
    picURLs() {
      this.structuresUpdate({ index: this.id, type: 'picURLs', content: this.picURLs });
    },
    conceptList() {
      this.structuresUpdate({ index: this.id, type: 'conceptListSet', content: this.conceptList });
    },
    bundlesCount() {
      this.structuresUpdate({ index: this.id, type: 'bundlesCount', content: this.bundlesCount });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = Number(this.$root.$mp.query.id);
    this.clicked = false;
    this.storageRemainGet();
    // existing entries gets the data from localstorage
    this.title = this.structures[this.id].title || '';
    this.picURLs = this.structures[this.id].structurePics || [];
    this.conceptList = this.structures[this.id].conceptList || [];
    this.bundleOpen = this.structures[this.id].bundleOpen || '0';
    this.checkBoxValues = [];
    let subjectTempMax = 0;
    for (let i = 0; i <= this.conceptList.length - 1; i += 1) {
      if (this.conceptList[i].subjectId > subjectTempMax) {
        const subjectsToAdd = this.conceptList[i].subjectId - subjectTempMax;
        subjectTempMax = this.conceptList[i].subjectId;
        for (let j = 0; j <= subjectsToAdd; j += 1) {
          this.checkBoxValues.push([]);
        }
      }
      const checkBoxValue = [...this.checkBoxValues[this.conceptList[i].subjectId]];
      checkBoxValue.push(this.conceptList[i].conceptId);
      Vue.set(this.checkBoxValues, this.conceptList[i].subjectId, checkBoxValue);
    }
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSD {
    position: relative;
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
  .drawerCSSSD{
    overflow: scroll;
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