<template>
  <van-cell-group>
    <input 
      class="originfieldsCSSCO"
      v-model='jobTitleGETSET'
      :maxlength="200"
      placeholder="Job Title"
    >
    <input
      class="originfieldsCSSCO"
      v-model='organizationNameGETSET'
      :maxlength="200"
      placeholder="Company name"
    >
    <input
      class="originfieldsCSSCO"
      v-model='jobLocationGETSET'
      :maxlength="200"
      placeholder="Job Location"
    >
    <p class="origintipsCSSCO">{{randomEncouragements}}</p>
  </van-cell-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      encouragements: ['some encouraging words'],
    };
  },
  computed: {
    ...mapGetters({
      jobTitle: 'jobTitle',
      organizationName: 'organizationName',
      jobLocation: 'jobLocation',
    }),
    jobTitleGETSET: {
      get() {
        return this.jobTitle;
      },
      set(jobTitle) {
        return this.jobTitleUpdate(jobTitle);
      },
    },
    organizationNameGETSET: {
      get() {
        return this.organizationName;
      },
      set(organizationName) {
        return this.organizationNameUpdate(organizationName);
      },
    },
    jobLocationGETSET: {
      get() {
        return this.jobLocation;
      },
      set(jobLocation) {
        return this.jobLocationUpdate(jobLocation);
      },
    },
    randomEncouragements() {
      // start at a random [] index
      // constant timed loop
      return this.encouragements[0];
    },
  },
  methods: {
    ...mapActions({
      jobTitleUpdate: 'jobTitleUpdate',
      organizationNameUpdate: 'organizationNameUpdate',
      jobLocationUpdate: 'jobLocationUpdate',
    }),
  },
  mounted() {
    const that = this;
    wx.getStorage({
      key: 'JOBTITLE_UPDATE',
      success(res) {
        that.jobTitleUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'ORGANIZATIONNAME_UPDATE',
      success(res) {
        that.organizationNameUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'JOBLOCATION_UPDATE',
      success(res) {
        that.jobLocationUpdate(res.data);
      },
    });
  },
};
</script>

<style lang="scss" scoped>
  .originfieldsCSSCO {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);
    padding: 50rpx;
  }
  .origintipsCSSCO {
    position: relative;
    padding: 10rpx;
  }
</style>