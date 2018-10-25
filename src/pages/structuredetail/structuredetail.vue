<template>
  <div>
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
          :title="'subject ' + subject.id + ': ' + subject.summary"
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
              :title="'concept ' + concept.id + ': ' + concept.description"
              :value="concept.id" />
          </wux-checkbox-group>
        </wux-accordion>
      </wux-accordion-group>
      </view>
    </i-drawer>

    <wux-divider position="left" :text="'1. Theme title of subcategory ' + id" />
      <wux-wing-blank size="large">
        <textarea
          class="titleCSSSD"
          v-model='title'
          :maxlength="100"
          placeholder="The theme may be titled with an subject summary or few words that summarize part of the subject."
        >
        </textarea>
      </wux-wing-blank>

    <wux-divider position="left" :text="'2. Relevant behaviors in subcategory ' + id" />
      <wux-wing-blank size="large">
        <wux-cell-group>
          <wux-cell
            :key='conceptIndex'
            v-for='(concept, conceptIndex) in conceptList'
            :title="subjects[concept.subjectId].concepts[concept.conceptId - subjects[concept.subjectId].concepts[0].id].description"
            @click='conceptListedClicked(concept.subjectId, concept.conceptId)'
          >
          </wux-cell>
        </wux-cell-group>
      </wux-wing-blank>
      <wux-white-space />
      <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
        <button
          class='button_new_CSSSD'
          @click='drawerToggle'
        >Select behaviors
        </button>
      </wux-wing-blank>
    <wux-divider position="left" :text="'3. Strategies for subcategory ' + id" />
    <wux-row>
      <wux-col span='9' push='3'>
        <div class='info_bundle_CSSSD'>
          <span style='color:red'>*</span>Choose a primary strategy by keeping it open.</div>
      </wux-col>
    </wux-row>
    <wux-accordion-group
      v-if='structures[id]'
      :auto='true'
      accordion
      :defaultCurrent="[structures[id].bundleOpen]"
      @change="bundleChange"
    >
      <wux-accordion
        v-if='structures[id].bundles'
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
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSSD'
        @click='bundleAdd'
      >Add strategy
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <wux-row>
      <wux-col span='10' push='1'>
        <div class='info_icon_CSSSD'>
          <icon
            type="info"
            size="50"
            color='rgba(9,45,66,.08)'
          />
        </div>
        <div class='info_content_CSSSD'>1. Sketch a strategy for visualization on paper.</div>
        <div class='info_content_CSSSD'>2. Mark the sketch with colored annotations.</div>
        <div class='info_content_CSSSD'>3. Correlate the annotations with description.</div>
      </wux-col>
    </wux-row>
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_delete_CSSSD'
        @click='structureDelete'
      >Delete
      </button>
    </wux-wing-blank>
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
      title: '',
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
    structureDelete() {
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
      this.structuresUpdate({ index: this.id, type: 'title', content: this.title });
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
  width: 100%;
  height: 50px;
  overflow:scroll;
  font-size: 80%;
}
.drawerCSSSD{
  overflow-y: scroll;
  overflow-x: hidden;
  width: 80vw;
  height: 100vh;
  background:#fff;
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
  font-size: 13px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
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
  font-size: 13px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.info_bundle_CSSSD{
  font-size: 75%;
}
.info_icon_CSSSD{
  width: 60px;
  margin: 0 auto;
}
.info_content_CSSSD{
  text-align: justify;
  text-justify: inter-word;
  font-size: 80%;
}
</style>
