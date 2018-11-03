<template>
  <div class='banner_CSSB'>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-row>
      <wux-col span='2'>
        <div class=cat_container_CSSB>
          <img
            class="cat_CSSB"
            :src="catHungry" mode="aspectFit"
            :id="url"
          />
        </div>
      </wux-col>
      <wux-col span='7' push='3'>
        <div class='info_content_CSSB'>Co-op is more than just the pay. Zero21 can easily
          <span style='font-weight:bold;color:#264436'>get you the Outstanding</span> to impress that oppertunity within your career narrative.
        </div>
      </wux-col>
    </wux-row>

    <wux-row>
      <wux-col span='7' push='1'>
        <div class='info_content_CSSB'>
          Make this app a part of your co-op experience! Contact <span style='font-weight:bold;color:#264436'>Ray (WechatID: r8chen)</span> for a 4-month guidance.
        </div>
          <!-- <img
            class="ray_CSSB"
            :src="rayQr" mode="aspectFit"
            :id="url"
          /> -->
      </wux-col>
      <wux-col span='2' push='1'>
        <div class=cat_container_CSSB>
          <img
            class="cat_CSSB"
            :src="catFood" mode="aspectFit"
            :id="url"
          />
        </div>
      </wux-col>
    </wux-row>

    <wux-row>
      <wux-col span='2'>
        <div class=cat_container_CSSB>
          <img
            class="cat_CSSB"
            :src="catSing" mode="aspectFit"
            :id="url"
          />
        </div>
      </wux-col>
      <wux-col span='7' push='3'>
        <div class='info_content_CSSB'>
          <span style='font-weight:bold;color:#264436'>Your data is only on this device!</span> However, digital data is never 100% secure.
            Zero21 can guide you with pen/paper if privacy is a must.
        </div>
      </wux-col>
    </wux-row>
    <div class="name_container_CSSB">
      <span style='font-weight:bold;color:#264436'>Zero21</span> Co-op Guide
    </div>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
      <button
        v-if='propBannerHide'
        class='button_new_CSSB'
        @click='bannerHide'
      >Start Your Outstanding
      </button>
    </wux-wing-blank>
    <wux-white-space />
  </div>
</template>

<script>
export default {
  data() {
    return {
      catHungry: '../../static/img/cat-hungry.svg',
      catFood: '../../static/img/cat-food.png',
      catSing: '../../static/img/cat-sing.png',
      rayQr: '../../static/img/ray-qr.png',
    };
  },
  props: ['propBannerHide'],
  methods: {
    bannerHide() {
      this.$root.$emit('bannerHide');
    },
  },
};
</script>

<style lang="scss" scoped>
.banner_CSSB {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
  background-color: #fff;
  background-image:
  linear-gradient(90deg, transparent 126rpx, #abced4 126rpx, #abced4 134rpx, transparent 134rpx),
  linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em;
}
.info_content_CSSB{
  width: 100%;
  padding: 50rpx 30rpx 0 0;
  float: right;
  text-align: justify;
  text-justify: inter-word;
  font-size: 90%;
}
.button_new_CSSB{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 83%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.name_container_CSSB{
  width: 100%;
  text-align: center;
  font-size: 130%;
}
.cat_CSSB {
  max-width: 200rpx; 
  max-height: 200rpx;
}
.ray_CSSB{
  max-width: 160rpx; 
  max-height: 160rpx;
}
.cat_container_CSSB{
  padding: 30rpx;
}
</style>