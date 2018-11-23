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
      Make it clear with your supervisor that you expect
      an Outstanding if expectations are made and met.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Ask for project story</span>
      <van-tag v-if="storyValue === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      <!-- TODO: -->
      All your effort at work is built on this statement.
      Simply summarize your work environment is the best way to
      extract the essential aspects that can impact you.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 3. Empathize with your user</span>
      <van-tag v-if="objectiveResult === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      Work knowing that your effort is spend justifiably on the
      <span style='text-decoration: underline;'> planned product</span>.
      Find out about the user expectation sets your direction and endgame.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 4. Imagine the planned product</span>
      <van-tag v-if="trigger === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      Work is easy when you have a step-by-step understanding of the
      <span style='text-decoration: underline;'> planned product.</span>
      Make the first step an action that will lead the 
      <span style='text-decoration: underline;'> planned product </span>
      to deliver its value to your user.
    </div>
  </wux-wing-blank>
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