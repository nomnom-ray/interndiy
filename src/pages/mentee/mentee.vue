<template>
  <!-- search for flex in tabs css; there are 2 enteries changed to 30% width -->
  <van-tabs :active="pageActive || 1" @change="pageChange">
    <van-tab title=" " :disabled="true">
    </van-tab>
    <!-- <van-tab title="Career Origin">
      <app-careerorigin></app-careerorigin>
    </van-tab> -->
    <!-- <van-tab title="Job Narrative">
      <app-narrative-more></app-narrative-more>
    </van-tab> -->
    <van-tab title="Job Narrative">
      <app-qualifications></app-qualifications>
    </van-tab>
    <van-tab title="Project Story">
      <app-project-story></app-project-story>
    </van-tab>
    <van-tab title="Project Behavior">
      <app-conceptmap></app-conceptmap>
    </van-tab>
    <van-tab title="Project Roadmap">
      <app-structures></app-structures>
    </van-tab>
    <van-tab title="Project Tasks">
      <app-tasks></app-tasks>
    </van-tab>
    <van-tab title=" " :disabled="true">
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import Careerorigin from '../../components/careerorigin';
// import NarrativeMore from '../../components/careernarrativemore';
// import Testtodo from '../../components/testpage';
import Qualifications from '../../components/qualifications';
import ProjectStory from '../../components/projectstory';
import Conceptmap from '../../components/conceptmap';
import Structures from '../../components/structures';
import Tasks from '../../components/tasks';

export default {
  components: {
    // appCareerorigin: Careerorigin,
    // appNarrativeMore: NarrativeMore,
    // appTesttodo: Testtodo,
    appConceptmap: Conceptmap,
    appQualifications: Qualifications,
    appProjectStory: ProjectStory,
    appStructures: Structures,
    appTasks: Tasks,
  },
  computed: {
    ...mapGetters({
      pageActive: 'pageActive',
    }),
  },
  methods: {
    ...mapActions({
      pageActiveUpdate: 'pageActiveUpdate',
    }),
    pageChange(event) {
      this.pageActiveUpdate(event.mp.detail.index);
    },
  },
  created() {
    const that = this;
    wx.getStorage({
      key: 'PAGEACTIVE',
      success(res) {
        that.pageActiveUpdate(res.data);
      },
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
