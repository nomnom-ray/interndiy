<template>
  <div>
  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 1. Identitfy performance metric</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSSTR'>
      <span style='font-weight:bold'>Why?</span>
        placeholder
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />
<!-- 
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
    <div class='instruction_CSSSTR'>
      <span style='font-weight:bold'>Why?</span>
        placeholder
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Grasp current strategy</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSSTR'>
      <span style='font-weight:bold'>Why?</span>
        placeholder
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Tap to edit" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 3. Annotate key points</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSSTR'>
      <span style='font-weight:bold'>Why?</span>
        placeholder
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space /> -->

  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
  //   ...mapGetters({
  //  }),
  },
  methods: {
    // ...mapActions({
    //   pageActiveUpdate: 'pageActiveUpdate',
    // }),
    // tab2Handle() {
    //   this.pageActiveUpdate(3);
    // },
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