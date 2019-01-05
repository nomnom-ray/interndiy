<template>
  <div>
  <!-- <van-cell-group>
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
  <wux-white-space /> -->

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 1. Connect beginning and end</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag> -->
      <!-- TODO: X steps Saved -->
      <!-- <van-tag v-else type="success">X steps</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>How?</span>
      Tap on a card to create a new step, and ask your supervisor
      to describe what happens at this step. Iterate until there are enough
      steps to give you a clear understanding on how the
      <span style='text-decoration: underline;'>planned offering</span> delivers its value to your stakeholders.
    </div>
    <wux-white-space />
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
      This is a step-by-step break-down of the big picture of your role. You can use this as a guide to
      find topics for question to discuss with your team. 
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Create detailed topics</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag> -->
      <!-- <van-tag v-else type="success">X subjects</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>How?</span>
      Tap on a card to create a new topic, and describe in steps
      for a topic related to this card. Iterate until there are enough
      topics to capture the scope of your work.
    </div>
    <wux-white-space />
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        Some of these topics are your co-op responsibilities.
        You can use its connection to the big picture to negotiate for work that you prefer.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 3. Add performance metric</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag> -->
      <!-- <van-tag v-else type="success">X subjects</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>How?</span>
      Tap on the cards within the scope of your responsibilities, and edit the metric.
      Ask your supervisor to describe the metrics that mark this step accomplished.
    </div>
    <wux-white-space />
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        A quantifiable metric is how your supervisor will evaluate your work.
        You are aligned with your supervisor once you understand what needs to happen in your scope of work
        and the metrics for evaluating its performance.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 4. Add summary statement</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">X subjects</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>How?</span>
      Tap on the top yellow bar of a topic column, and give the topic a title.
    </div>
    <wux-white-space />
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
      The steps in your scope of work with performance metric are listed as goals in Tab 3,
      and the summary statements organize the goals into easy-to-find categories.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

    <van-cell-group>
  <van-cell>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 5. Move onto Tab 3</span>
      <!-- <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">X subjects</van-tag> -->
    </view>
  </van-cell>
  </van-cell-group>
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
    tab3Handle() {
      this.pageActiveUpdate(4);
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