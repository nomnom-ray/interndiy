<template>
  <div>
    <van-notify id="van-notify" />
    <van-col span="4" offset="22">
      <van-button type="default" @click="showNotify">测试Notify</van-button>
    </van-col>
  </div>
</template>

<script>
  import Notify from '../../static/vant/notify/notify';

  export default {
    methods: {
      showNotify() {
        Notify('test');
      },
    },
  };
</script>

<style>

</style>
