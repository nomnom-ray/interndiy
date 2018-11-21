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
      All your effort at work is built on this statement.
      Simply summarize your new work is the best way
      extract the essential aspects that impact you.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <!-- TODO: -->
      <span style='padding:0 20rpx 0 0'>Step 3. Frame the targeted behavior</span>
      <van-tag v-if="objectiveResult === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
      The targeted behavior acts as the reference in Tab 2.
      Frame the targeted behavior from the perspective of your user;
      it will let you extrapolate the full picture of your work in Tab 2.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab1Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 4. Empathize with your user</span>
      <van-tag v-if="trigger === ''" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSS'>
      <span style='font-weight:bold'>Why?</span>
        Your best decisions impact the user positively.
        Use the first step of the diagram to imagine how your
        user will interact with the
        <span style='text-decoration: underline;'> planned product.</span>
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