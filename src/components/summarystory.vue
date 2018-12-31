<template>
  <div>
  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 1. Identify the supervisor</span>
      <van-tag v-if="evaluator === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      Never leave your evaluation as a last-day-surprise.
      Make it clear with your supervisors that you expect
      an Outstanding if expectations are made and met.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <!-- <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>1-on-1 tutorial</span>
      <van-tag v-if="storyValue === ''" type="danger">Undone</van-tag>
      <van-tag v-else type="success">Done</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
        Message Ray, and ask how you can actively make a
        teacher out of your supervisor, because your supervisor
        is not paid to train you.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space /> -->

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Ask for a project story</span>
      <van-tag v-if="storyValue === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      All your effort at work is built on the alignment with your supervisors.
      Simply summarize your responsibility at work is the best way to
      extract the essential things that can impact you.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 3. Empathize with stakeholder</span>
      <van-tag v-if="objectiveResult === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      Your responsibility is easy to understand when broken down into finer topics.
      Find out about the stakeholder expectation will set the direction, scope, and endgame.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 4. Imagine the planned offering</span>
      <van-tag v-if="trigger === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      Breakng down a big picture is accomplished in a step-by-step way.
      Make the first step an action that will lead the 
      <span style='text-decoration: underline;'>planned offering</span>
      to deliver its value to your stakeholders.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 5. Move onto Tab 2</span>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />
  <wux-white-space />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      evaluator: 'evaluator',
      objectiveResult: 'objectiveResult',
      trigger: 'trigger',
      storyRole: 'storyRole',
      storyWork: 'storyWork',
      storyGoal: 'storyGoal',
      storyUser: 'storyUser',
      storyValue: 'storyValue',
    }),
  },
  methods: {
    ...mapActions({
      pageActiveUpdate: 'pageActiveUpdate',
    }),
    tab1Handle() {
      this.pageActiveUpdate(2);
    },
  },
};
</script>


<style lang="scss" scoped>
.instruction_CSSSS{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>