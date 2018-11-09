<template>
  <a :href="detailURL">
    <div class="cardCSSSBC">
      <wux-white-space />
      <div style="width:100%;text-align:center">
        Open to edit.
      </div>
      <wux-white-space />
      <wux-gallery v-if='pageActive === 3' id="wux-gallery"></wux-gallery>
      <div
        v-if='structures[propStructureIndex].bundles[propBundleIndex]'
        :key='index'
        v-for="(url, index) in structures[propStructureIndex].bundles[propBundleIndex].structurePics"
      >
        <div>
          <img
            class='pic_position_CSSSBC'
            :src="url" mode="aspectFit"
            :id="index"
          />
        </div>
      </div>
      <div
        class='uploader_position_CSSSBC'
        v-if='structures[propStructureIndex].bundles[propBundleIndex].structurePics.length < 1'
      >
        <div
          class="weui-uploader__input-box"
        >
          <div class="weui-uploader__input"></div>
        </div>
      </div>
      <wux-white-space />
      <wux-white-space />
      <div
        class='annotate_container_CSSSBC'
        v-if='structures[propStructureIndex].bundles[propBundleIndex]'
        :key='annotateIndex'
        v-for='(annotate, annotateIndex) in propBundle.annotates'
      >
        <div class='flex_container_CSSSBC'>
          <div class="swipe_out_icon_CSSSBC flex_text_CSSSBC" :style="colors[annotate.colorPicked]">
            <div class='icon_pin_CSSSBC'></div>
          </div>

          <div
            v-if="annotate.text !== ''"
            class='swipe_out_title_CSSSBC flex_text_CSSSBC'
          >
            {{annotate.text}}
          </div>
          <div v-else style='color:grey;text-align:center;font-size:100%'>
            Empty task description.
          </div>
        </div>
        <div
          v-if="annotate.result !== ''"
          class='swipe_out_resolution_CSSSBC'
        >
          <span class="swipe_out_resolution_title_CSSSBC">Detail: </span>
          {{annotate.result}}
        </div>
      </div>
      <wux-white-space />
    </div>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import { $wuxGallery } from '../util/wux';

export default {
  data() {
    return {
      colors: [
        '',
        'background:violet',
        'background:Indigo',
        'background:Blue',
        'background:Green',
        'background:Yellow',
        'background:Orange',
        'background:Red',
      ],
    };
  },
  props: ['propBundle', 'propBundleIndex', 'propStructureIndex'],
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
    }),
    detailURL() {
      return `/pages/structurebundle/main?board=
      ${this.propStructureIndex}&bundle=${this.propBundleIndex}`;
    },
  },
  methods: {
    showGallery(url, current) {
      const urls = [...this.structures[this.propStructureIndex]
        .bundles[this.propBundleIndex].structurePics];
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        current,
        urls,
        onTap() {
          return true;
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cardCSSSBC {
  width: 100%;
  font-size:83%;
  margin-bottom: 10px;
  background-color: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.pic_position_CSSSBC{
  width: 100%;
}
.weui-uploader__img {
  display: block;
  width: 79px;
  height: 79px;
}
.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}
.weui-uploader__input-box:after,
.weui-uploader__input-box:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}

.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}

.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}

.weui-uploader__input-box:active {
  border-color: #999;
}

.weui-uploader__input-box:active:after,
.weui-uploader__input-box:active:before {
  background-color: #999;
}

.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.uploader_position_CSSSBC{
  width: 77px;
  height: 77px;
  margin: 0 auto;
}
.swipe_out_icon_CSSSBC{
  width: 36px;
  height: 50px;
  position: relative;
  border-radius:5px;
  border: 1px solid #161d20;
  background: rgba(0, 0, 0, 0);
}
.annotate_container_CSSSBC{
  font-size: 85%;
  margin-bottom: 10px;
  padding: 5px 0 5px 0;
  border-top: 1px solid #e3e5ee;
  border-bottom: 1px solid #e3e5ee;
}
.flex_container_CSSSBC{
  display: table;
  width: 100%;
}
.flex_text_CSSSBC{
  display: table-cell;
}
.icon_pin_CSSSBC {
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -14px;
  border-radius: 50% 50% 50% 0;
  border: 4px solid #fff;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
}
.icon_pin_CSSSBC::after {
  position: absolute;
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  margin-left: -3px;
  margin-top: -3px;
  background-color: #fff;
}
.swipe_out_title_CSSSBC{
  padding: 5px 5px 0 10px;
  text-align: justify;
  text-justify: inter-word;
}
.swipe_out_resolution_CSSSBC{
  padding: 5px;
  text-align: justify;
  text-justify: inter-word;
}
.swipe_out_resolution_title_CSSSBC{
  font-weight: bold;
}
</style>