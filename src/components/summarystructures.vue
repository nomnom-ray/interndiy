<template>
  <div>
  <van-cell-group>
  <van-cell>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Revisit and communicate</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSSTR'>
      <span style='font-weight:bold'>Why?</span>
      This list of goals is created as a project orientation to get you caught up at work
      and start your assignment with your work-term report in mind. The goals will change over time.
      You should revisit Tab 2 to catch errors and correct the gaps in your knowledge. 
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import { mapActions } from 'vuex';

export default {
  computed: {
  //   ...mapGetters({
  //  }),
  },
  methods: {
    ...mapActions({
      pageActiveUpdate: 'pageActiveUpdate',
    }),
    tab3Handle() {
      this.pageActiveUpdate(4);
    },
  },
};
</script>

<style lang="scss" scoped>
.instruction_CSSSSTR{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>