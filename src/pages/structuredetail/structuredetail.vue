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
    <div>
      Keep the primary strategy open to display on the presentation board.
    </div>
    <wux-accordion-group
      v-if='structures[id]'
      title="bundles"
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
    <wux-button
      block
      outline
      type="assertive"
      @click='bundleAdd'
    >Add Bundle
    </wux-button>
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='structureDelete'
    >Delete
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
</style>
