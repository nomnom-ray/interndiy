<template>
  <div class='banner_CSSB'>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-row>
      <wux-col span='4'>
        <div class=cat_container_CSSB>
          <img
            class="cat_CSSB"
            :src="catHungry" mode="aspectFit"
            :id="url"
          />
        </div>
      </wux-col>
      <wux-col span='1' push='3'>
        123
      </wux-col>
    </wux-row>

    <wux-row>
      <wux-col span='4'>
        12333
      </wux-col>
      <wux-col span='3' push='4'>
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
      <wux-col span='4'>
        <div class=cat_container_CSSB>
          <img
            class="cat_CSSB"
            :src="catSing" mode="aspectFit"
            :id="url"
          />
        </div>
      </wux-col>
      <wux-col span='1' push='3'>
        123
      </wux-col>
    </wux-row>
    <div class="name_container_CSSB">
      <span style='font-weight:bold;color:#264436'>Zero21</span> Co-op Guide
    </div>
    <wux-wing-blank class="button_container_CSSB">
      <button
        class='button_new_CSSB'
        @click='bannerHide'
      >Start Your Narrative
      </button>
    </wux-wing-blank>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catHungry: '../../static/img/cat-hungry.svg',
      catFood: '../../static/img/cat-food.png',
      catSing: '../../static/img/cat-sing.png',
    };
  },
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
.button_container_CSSB {
  position: absolute;
  bottom: 7%;
  margin-left:80px;
  margin-right:80px;
}
.name_container_CSSB{
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 130%;
  bottom: 17%;
}
.cat_CSSB {
  max-width: 200rpx; 
  max-height: 200rpx;
}
.cat_container_CSSB{
  padding: 40rpx;
}
</style>