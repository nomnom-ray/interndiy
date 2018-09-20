<template>
  <van-tabs>
    <van-tab title="Career Origin">
      <app-careerorigin></app-careerorigin>
    </van-tab>
    <van-tab title="Story Protrayal">
      Story Protrayal
      <!-- <app-conceptmap></app-conceptmap> -->
    </van-tab>
  </van-tabs>
</template>

<script>
import Conceptmap from '../../components/conceptmap';
import careerorigin from '../../components/careerorigin';

export default {
  components: {
    appConceptmap: Conceptmap,
    appCareerorigin: careerorigin,
  },
  created() {
    // this.$store.dispatch('subjectsInit');
  },
};
</script>

<style>

</style>
