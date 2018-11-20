<template>
  <div>
  <van-cell-group>
  <van-cell>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 1. 1-on-1 tutorial with Ray</span>
      <van-tag v-if="true" type="danger">Undone</van-tag>
      <van-tag v-else type="success">Done</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        This is an optional tutorial on empathizing with your user
        to make your effort at work always justifiable. The tutorial
        is held over video chat. Contact Ray to set a time.
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 2. Become your user</span>
      <van-tag v-if="true" type="danger">Empty</van-tag>
      <van-tag v-else type="success">Saved</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        placeholder.........
        imagine youself as your user using your product
        what are the procedure the product takes to deliver the value that the user is looking for?
        write the first step 
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 3. Become the planned product</span>
      <van-tag v-if="false" type="danger">Empty</van-tag>
      <!-- TODO: X steps Saved -->
      <van-tag v-else type="success">X steps</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        placeholder.........
        imagine you are the planned product that you are building
        write the steps of what it has to go through to deliver the expected value to the user
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />

  <van-cell-group>
  <van-cell value="Go to tab" is-link @click='tab2Handle'>
    <view slot="title">
      <span style='padding:0 20rpx 0 0'>Step 4. Find your role</span>
      <van-tag v-if="false" type="danger">Empty</van-tag>
      <van-tag v-else type="success">X subjects</van-tag>
    </view>
  </van-cell>
  </van-cell-group>
  <wux-white-space />

  <wux-wing-blank size="large">
    <div class='instruction_CSSSB'>
      <span style='font-weight:bold'>Why?</span>
        placeholder......... 
        create new subjects to make decribe step in finer, more detailed steps
        stop when you feel you understand the system and your role in this system
    </div>
  </wux-wing-blank>
  <wux-white-space />
  <wux-white-space />
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
.instruction_CSSSB{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>