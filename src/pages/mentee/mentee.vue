<template>
  <van-tabs>
    <van-tab title="Career Origin">
      <app-careerorigin></app-careerorigin>
    </van-tab>
    <van-tab title="Qualifications">
      <app-qualifications></app-qualifications>
    </van-tab>
    <van-tab title="Story Protrayal">
      Story Protrayal
      <!-- <app-conceptmap></app-conceptmap> -->
    </van-tab>
  </van-tabs>
</template>

<script>
import Conceptmap from '../../components/conceptmap';
import Careerorigin from '../../components/careerorigin';
import Qualifications from '../../components/qualifications';

export default {
  components: {
    appConceptmap: Conceptmap,
    appCareerorigin: Careerorigin,
    appQualifications: Qualifications,
  },
  created() {
    // this.$store.dispatch('subjectsInit');
  },
};
</script>

<style>

</style>
