<template>
  <div :class="showDrawer ? 'popup_CSSSD' : ''">
    <wux-toptips id="wux-toptips" />
    <i-drawer mode="right" :visible="showDrawer" @close="drawerToggle">
      <view class='drawerCSSSD'>
      <wux-accordion-group
        :auto='false'
        :current='subjectOpen'
        @change="subjectChange"
      >
        <wux-accordion
          v-if='subject.id != 0'
          :key="subjectIndex"
          v-for='(subject, subjectIndex) in subjects'
          :title="'Subject ' + subject.id + ': ' + subject.summary"
          :name="subjectIndex"
        >
        <!-- font-size of everything here is changed in accordion wxss -->
          <wux-checkbox-group
            :name="subject.id"
            :value='checkBoxValues[subject.id]'
            @change='checkBoxChange(subject.id, $event)'>
            <wux-checkbox
              :key='conceptIndex'
              v-for='(concept, conceptIndex) in subject.concepts'
              color="assertive"
              :title="'Step ' + concept.id + ': ' + concept.description"
              :value="concept.id" />
          </wux-checkbox-group>
        </wux-accordion>
      </wux-accordion-group>
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      </view>
    </i-drawer>

    <wux-white-space />
    <div class='divider_container_CSSSD'>
      <div class='divider_content_CSSSD'>
        <wux-divider position="left" text="1. Identitfy performance metric" />
      </div>
      <div class='divider_icon_CSSSD'>
        <button @click="titleTips = !titleTips" class='button_new_CSSSD'>info</button>
      </div>
    </div>
    <wux-white-space />
      <div v-if='titleTips' @click="titleTips = false" class='instruction_CSSSD'>
        <wux-wing-blank size="large">
          <span style='font-weight:bold'>Info: </span> placeholder.
        </wux-wing-blank>
      </div>
    <wux-white-space v-if='titleTips' />
    <wux-white-space v-if='titleTips' />

    <wux-wing-blank size="large">
      <div
        class='concepts_CSSSD'
        :key='conceptIndex'
        v-for='(concept, conceptIndex) in conceptList'
        @click='conceptListedClicked(concept.subjectId, concept.conceptId)'
      >{{subjects[concept.subjectId].concepts[concept.conceptId - subjects[concept.subjectId].concepts[0].id].description}}
      </div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:80px;margin-right:80px">
      <button
        class='button_new_CSSSD'
        @click='drawerToggle'
      >Select characteristics
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <wux-white-space />
    <div class="title_container_CSSSD">
      The performance metric
    </div>
    <wux-white-space />
    <wux-wing-blank size="large">
      <div
        class='display_CSSSD'
        :class="titleLocal === '' ? 'emptytext_CSSSD' : '' "
        v-if="titleSaved"
        @click='titleSaved = false'
      >{{titleLocal === '' ? 'Tap here to type.' : titleLocal}}
      <wux-white-space />
      </div>
      <div v-else>
        <textarea
          class='text_CSSSD'
          v-model='titleLocal'
          :maxlength="200"
          auto-height
          cursor-spacing='20'
          auto-focus
        >
        </textarea>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
          <button
            class='button_new_CSSSD'
            @click="titleSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>

    <!-- <wux-white-space />
    <div class='divider_container_CSSSD'>
      <div class='divider_content_CSSSD'>
        <wux-divider position="left" text="2. Add implementation strategy" />
      </div>
      <div class='divider_icon_CSSSD'>
        <button @click="strategyTips = !strategyTips" class='button_new_CSSSD'>info</button>
      </div>
    </div>
    <wux-white-space />
      <div v-if='strategyTips' @click="strategyTips = false" class='instruction_CSSSD'>
        <wux-wing-blank size="large">
          <span style='font-weight:bold'>Info: </span> placeholder.
        </wux-wing-blank>
      </div>
    <wux-white-space v-if='strategyTips' />
    <wux-white-space v-if='strategyTips' />

    <div
      v-if='structures[id] && structures[id].bundles'
    >
      <wux-accordion-group
        v-if='structures[id]'
        :auto='true'
        accordion
        :defaultCurrent="[structures[id].bundleOpen]"
        @change="bundleChange"
      >
          <wux-accordion
            :key="bundleIndex"
            v-for='(bundle, bundleIndex) in structures[id].bundles'
            :title="'Strategy' + ' ' + (bundleIndex + 1) + ': ' + bundle.title"
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
    </div>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:80px;margin-right:80px">
      <button
        class='button_new_CSSSD'
        @click='bundleAdd'
      >Add strategy
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <div class='info_icon_CSSSD'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:40px;margin-right:40px">
      <div class='info_content_CSSSD'>Categorize behaviors to implement as a group.</div>
      <div class='info_content_CSSSD'>Propose and compare strategies for the implementation.</div>
      <div class='info_content_CSSSD'>Choose one primary strategy to be used as part of the roadmap set.</div>
    </wux-wing-blank>   -->
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:80px;margin-right:80px">
      <button
        class='button_delete_CSSSD'
        @click='structureDelete'
      >Delete subcategory
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
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
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
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { $wuxToptips } from '../../util/wux';
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
      strategyTips: true,
      titleLocal: '',
      titleTips: true,
      titleSaved: true,
      bundlesCount: 0,
      checkBoxValues: [],
      conceptList: [],
      showDrawer: false,
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      structuresCount: 'structuresCount',
      subjects: 'subjects',
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
    titleSavedHandle() {
      this.titleSaved = true;
      this.titleTips = false;
    },
    bundleAdd() {
      // the other bundlesDetail declaration is in structure
      const bundleDetail = {
        title: '',
        structurePics: [],
        annotates: [],
        annotatesCount: 0,
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
        text: `subject: ${subjectId}, step: ${conceptId}`,
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
    structureDelete() {
      if (this.clicked) {
        this.clicked = true;
        return;
      }
      if (this.structures[this.id].bundles.length !== 0) {
        wx.showModal({
          title: 'Delete strategies first.',
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
              that.structuresDel(this.id);
              that.structuresCountDel();
              wx.navigateBack();
            }
          },
        });
      }
    },
  },
  watch: {
    titleLocal() {
      this.structuresUpdate({ index: this.id, type: 'title', content: this.titleLocal });
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
    this.showDrawer = false;
    // existing entries gets the data from localstorage
    this.titleLocal = this.structures[this.id].title || '';
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
.popup_CSSSD{
  position: fixed;
  z-index: 999;
  top:0;
  left:0;
  bottom:0;
  right:0;
}
.placeholder_CSSSD{
  width: 100%;
  text-align: left;
  font-size: 85%;
  margin-bottom: 16rpx;
}
.titleCSSSD {
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
}
.drawerCSSSD{
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 85%;
  width: 80vw;
  height: 100vh;
  background:#fff;
}
.concepts_CSSSD{
  white-space: pre-wrap;
  font-size: 85%;
  margin-bottom: 10px;
  margin-top: 5px;
  max-height: 58px;
  overflow: scroll;
  padding: 5px 10px 5px 10px;
  text-align: justify;
  text-justify: inter-word;
  background: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.button_new_CSSSD{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
}
.button_delete_CSSSD{
  background-color: white;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 75%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.info_bundle_CSSSD{
  width: 100%;
  color: red;
  padding: 2px 0 4px 0;
  text-align: center;
  font-size: 75%;
}
.info_icon_CSSSD{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSSD{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: center;
  font-size: 85%;
}
.divider_container_CSSSD{
  width: 100%;
  display: table;
}
.divider_content_CSSSD{
  display: table-cell;
  width: 85%;
}
.divider_icon_CSSSD{
  display: table-cell;
  vertical-align: middle;
  width: 15%;
  padding: 0 20rpx 0 0;
  margin: 0 auto;
}
.emptytext_CSSSD{
  color: grey;
}
.instruction_CSSSD{
  width: auto;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
  padding: 10rpx;
  background: rgba(244,207,108,0.1);
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
}
.display_CSSSD{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
  white-space: pre-wrap;
}
.text_CSSSD{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
  background: rgba(239, 241, 247, 0.4);
}
.title_container_CSSSD{
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 85%;
}
</style>
