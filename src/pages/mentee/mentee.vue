<template>
  <!-- search for flex in tabs css; there are 2 enteries changed to 30% width -->
  <van-tabs :active="pageActive || 8" @change="pageChange">
    <van-tab title=" " :disabled="true">
    </van-tab>
    <van-tab title="Career Origin">
      <app-careerorigin></app-careerorigin>
    </van-tab>
    <van-tab title="Qualifications">
      <app-qualifications></app-qualifications>
    </van-tab>
    <van-tab title="Job Narrative">
      <app-narrative-more></app-narrative-more>
    </van-tab>
    <van-tab title="Project Story">
      <app-project-story></app-project-story>
    </van-tab>
    <van-tab title="Project Behavior">
      <app-conceptmap></app-conceptmap>
    </van-tab>
    <van-tab title="Project Structure">
      <app-structures></app-structures>
    </van-tab>
    <van-tab title="Project Tasks">
      <app-tasks></app-tasks>
    </van-tab>
    <van-tab title="todo">
      <app-todolist></app-todolist>
    </van-tab>
    <van-tab title=" " :disabled="true">
    </van-tab>
  </van-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Conceptmap from '../../components/conceptmap';
import Careerorigin from '../../components/careerorigin';
import Qualifications from '../../components/qualifications';
import NarrativeMore from '../../components/careernarrativemore';
import ProjectStory from '../../components/projectstory';
import Structures from '../../components/structures';
import Tasks from '../../components/tasks';
import Testpage from '../../components/testpage';

export default {
  components: {
    appConceptmap: Conceptmap,
    appCareerorigin: Careerorigin,
    appQualifications: Qualifications,
    appNarrativeMore: NarrativeMore,
    appProjectStory: ProjectStory,
    appStructures: Structures,
    appTasks: Tasks,
    appTodolist: Testpage,
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
