<template>
  <!-- <van-tabs :active="pageActive || 0" @change="pageChange">
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
    <van-tab title="Story Protrayal">
      <app-conceptmap></app-conceptmap>
    </van-tab>
  </van-tabs> -->
        <app-conceptmap></app-conceptmap>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Conceptmap from '../../components/conceptmap';
import Careerorigin from '../../components/careerorigin';
import Qualifications from '../../components/qualifications';
import NarrativeMore from '../../components/careernarrativemore';
import ProjectStory from '../../components/projectstory';

export default {
  components: {
    appConceptmap: Conceptmap,
    appCareerorigin: Careerorigin,
    appQualifications: Qualifications,
    appNarrativeMore: NarrativeMore,
    appProjectStory: ProjectStory,
  },
  created() {
    this.$store.dispatch('subjectsInit');
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
  mounted() {
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
