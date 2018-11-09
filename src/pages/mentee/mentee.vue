<template>
  <div v-if='bannerLocal'>
    <app-banner
    :propBannerHide='bannerLocal'
    ></app-banner>
  </div>
  <div v-else>
    <!-- search for flex in tabs css; there are 2 enteries changed to 31% width -->
    <van-tabs :active="pageActive || 1" @change="pageChange">
      <van-tab title=" " :disabled="true">
      </van-tab>
      <van-tab title="Tab 1. Story">
        <app-project-story></app-project-story>
      </van-tab>
      <van-tab title="Tab 2. Behavior">
        <app-conceptmap></app-conceptmap>
      </van-tab>
      <van-tab title="Tab 3. Roadmap">
        <app-structures></app-structures>
      </van-tab>
      <van-tab title="Tab 4. Tasks">
        <app-tasks></app-tasks>
      </van-tab>
      <van-tab title="Tab 5. Narrative">
        <app-qualifications></app-qualifications>
      </van-tab>
      <van-tab title="Zero21">
        <app-banner></app-banner>
      </van-tab>
      <van-tab title=" " :disabled="true">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Banner from '../../components/banner';
import Qualifications from '../../components/qualifications';
import ProjectStory from '../../components/projectstory';
import Conceptmap from '../../components/conceptmap';
import Structures from '../../components/structures';
import Tasks from '../../components/tasks';

export default {
  components: {
    appBanner: Banner,
    appConceptmap: Conceptmap,
    appQualifications: Qualifications,
    appProjectStory: ProjectStory,
    appStructures: Structures,
    appTasks: Tasks,
  },
  data() {
    return {
      bannerLocal: true,
    };
  },
  computed: {
    ...mapGetters({
      pageActive: 'pageActive',
      banner: 'banner',
    }),
  },
  methods: {
    ...mapActions({
      pageActiveUpdate: 'pageActiveUpdate',
      bannerUpdate: 'bannerUpdate',
    }),
    pageChange(event) {
      this.pageActiveUpdate(event.mp.detail.index);
    },
  },
  watch: {
    bannerLocal() {
      this.bannerUpdate(this.bannerLocal);
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
    wx.getStorage({
      key: 'BANNER',
      success(res) {
        that.bannerUpdate(res.data);
        that.bannerLocal = that.banner;
      },
    });
    this.$root.$on('bannerHide', () => {
      this.bannerLocal = false;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
