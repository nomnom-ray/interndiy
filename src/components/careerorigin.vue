<template>
  <van-cell-group>
    <input 
      class="originfieldsCSSCO"
      v-model='jobTitle'
      :maxlength="200"
      placeholder="Job Title"
    >
    <input
      class="originfieldsCSSCO"
      v-model='organizationName'
      :maxlength="200"
      placeholder="Company name"
    >
    <input
      class="originfieldsCSSCO"
      v-model='jobLocation'
      :maxlength="200"
      placeholder="Job Location"
    >
    <p class="origintipsCSSCO">{{randomEncouragements}}</p>
  </van-cell-group>
</template>

<script>
export default {
  data() {
    return {
      organizationName: '',
      jobTitle: '',
      jobLocation: '',
      encouragements: ['some encouraging words'],
    };
  },
  mounted() {
    const that = this;
    wx.getStorage({
      key: 'organizationName',
      success(res) {
        that.organizationName = res.data;
      },
    });
    wx.getStorage({
      key: 'jobTitle',
      success(res) {
        that.jobTitle = res.data;
      },
    });
    wx.getStorage({
      key: 'jobLocation',
      success(res) {
        that.jobLocation = res.data;
      },
    });
  },
  computed: {
    randomEncouragements() {
      // sart at a random [] index
      // constant timed loop
      return this.encouragements[0];
    },
  },
  watch: {
    organizationName() {
      wx.setStorage({
        key: 'organizationName',
        data: this.organizationName,
        success(res) {
          console.log('set success', res);
        },
      });
    },
    jobTitle() {
      wx.setStorage({
        key: 'jobTitle',
        data: this.jobTitle,
        success(res) {
          console.log('set success', res);
        },
      });
    },
    jobLocation() {
      wx.setStorage({
        key: 'jobLocation',
        data: this.jobLocation,
        success(res) {
          console.log('set success', res);
        },
      });
    },
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