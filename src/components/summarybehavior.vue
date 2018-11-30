<template>
  <div>
  <van-cell-group>
  <van-cell>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>1-on-1 tutorial</span>
      <van-tag v-if="true" type="danger">Undone</van-tag>
      <van-tag v-else type="success">Done</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        Message Ray, and ask how you can avoid boring co-op work,
        because your supervisor needs to explain just enough
        to get you working, regardless of what.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 1. Connect the beginning and end</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <!-- TODO: X steps Saved -->
      <van-tag v-else type="success">X steps</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
      This connection tells you the step-by-step logic behind the
      <span style='text-decoration: underline;'> planned offering.</span>
      Click on a card to create a new step, and ask your supervisor
      to describe the logic of the it.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Branch out from the steps</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">X subjects</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        These steps tell you where your responsibilities begin and end.
        Create a new column to expand on any 1 step until you find the
        steps in your scope(s) of work.
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
    tab2Handle() {
      this.pageActiveUpdate(3);
    },
  },
};
</script>

<style lang="scss" scoped>
.instruction_CSSSB{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>