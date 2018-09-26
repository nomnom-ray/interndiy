<template>
  <van-tabs class='tabsCSSM'>
    <van-tab class='tabCSSM' title="Career Origin">
      <app-careerorigin></app-careerorigin>
    </van-tab>
    <van-tab class='tabCSSM' title="Qualifications">
      <app-qualifications></app-qualifications>
    </van-tab>
    <van-tab class='tabCSSM' title="Job Narrative">
      <app-narrative-more></app-narrative-more>
    </van-tab>
    <van-tab class='tabCSSM' title="Story Protrayal">
      Story Protrayal
      <!-- <app-conceptmap></app-conceptmap> -->
    </van-tab>
    <van-tab class='tabCSSM' title="Job Identity">
      Job Identity
    </van-tab>
  </van-tabs>
</template>

<script>
import Conceptmap from '../../components/conceptmap';
import Careerorigin from '../../components/careerorigin';
import Qualifications from '../../components/qualifications';
import NarrativeMore from '../../components/careernarrativemore';

export default {
  components: {
    appConceptmap: Conceptmap,
    appCareerorigin: Careerorigin,
    appQualifications: Qualifications,
    appNarrativeMore: NarrativeMore,
  },
  created() {
    // this.$store.dispatch('subjectsInit');
  },
};
</script>

<style lang="scss" scoped>
.tabsCSSM{
  white-space: nowrap;
}
  .tabCSSM{
  }
</style>
