<template>
  <a :href="detailURL">
    <wux-wing-blank size="small">
      <wux-white-space />
      <div
        class='card_CSSSC'
      >
        <wux-white-space />
        <div style='font-weight:bold;text-align:center;width:100%;font-size:90%'>
          Subcategory {{propStructureIndex}}
        </div>

        <div
          v-if="propStructure.title ===''"
          class='struc_title_CSSSC struc_title_empty_CSSSC'
        >
          Nameless subcategory. Open to edit.
        </div>
        <div
          v-else
          class='struc_title_CSSSC'
        >
          {{propStructure.title}}
        </div>

      <div
        v-if='propStructure.bundles[propStructure.bundleOpen]'
      >
        <div
        :key='index'
        v-for="(url, index) in propStructure.bundles[propStructure.bundleOpen].structurePics"
        >
          <img
            class='pic_position_CSSSC'
            :src="url" mode="aspectFit"
            :id="index"
            @click.stop="thumbPreview(index)"
          />
        </div>
      </div>
      <div
        class='uploader_position_CSSSC'
        v-if='propStructure.bundles[propStructure.bundleOpen] && propStructure.bundles[propStructure.bundleOpen].structurePics.length < 1'
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
        v-if="propStructure.bundles[propStructure.bundleOpen] && propStructure.bundles[propStructure.bundleOpen].title === ''"
        class='bundle_title_CSSSC bundle_title_empty_CSSSC'
      >
        <span style='font-weight:bold'>Strategy used: </span>Nameless strategy. Open to edit.
      </div>
      <div
        v-else-if="propStructure.bundles[propStructure.bundleOpen]"
        class='bundle_title_CSSSC'
      >
        <span style='font-weight:bold'>Strategy used: </span>{{propStructure.bundles[propStructure.bundleOpen].title}}
      </div>

      <div class='info_strategy_CSSSC'>
        <span style='color:red'>*</span>Number of strategies: {{propStructure.bundles.length}}
      </div>
      <wux-white-space />
      <wux-white-space />
      <div
        v-if='propStructure.bundles[propStructure.bundleOpen]'
      >
        <div
          class='annotate_container_CSSSC'
          :key='annotateIndex'
          v-for='(annotate, annotateIndex) in propStructure.bundles[propStructure.bundleOpen].annotates'
        >
          <div class='flex_container_CSSSC'>
            <div class="swipe_out_icon_CSSSC flex_text_CSSSC" :style="colors[annotate.colorPicked]">
              <div class='icon_pin_CSSSC'></div>
            </div>

            <div
              v-if="annotate.text !== ''"
              class='swipe_out_title_CSSSC flex_text_CSSSC'
            >
              {{annotate.text}}
            </div>
            <div v-else style='color:grey;text-align:center;font-size:100%'>
              Empty task description.
            </div>
          </div>
          <div
            v-if="annotate.result !== ''"
            class='swipe_out_resolution_CSSSC'
          >
            <span class="swipe_out_resolution_title_CSSSC">Detail: </span>
            {{annotate.result}}
          </div>
        </div>
      </div>
      <wux-white-space />
      </div>
    </wux-wing-blank>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';

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
  props: ['propStructure', 'propStructureIndex'],
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
    }),
    detailURL() {
      return `/pages/structuredetail/main?id=${this.propStructureIndex}`;
    },
  },
  methods: {
    thumbPreview(current) {
      wx.previewImage({
        current,
        urls: this.propStructure.bundles[this.propStructure.bundleOpen].structurePics,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card_CSSSC{
  width: 100%;
  margin-bottom: 10px;
  background-color: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.pic_position_CSSSC{
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
.uploader_position_CSSSC{
  width: 77px;
  height: 77px;
  margin: 0 auto;
}
.swipe_out_icon_CSSSC{
  width: 36px;
  height: 50px;
  position: relative;
  border-radius:5px;
  border: 1px solid #161d20;
  background: rgba(0, 0, 0, 0);
}
.annotate_container_CSSSC{
  font-size: 80%;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 0 5px 0;
  border-top: 1px solid #eff1f7;
  border-bottom: 1px solid #eff1f7;
}
.flex_container_CSSSC{
  display: table;
  width: 100%;
}
.flex_text_CSSSC{
  display: table-cell;
}
.icon_pin_CSSSC {
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
.icon_pin_CSSSC::after {
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
.swipe_out_title_CSSSC{
  padding: 5px 5px 0 10px;
  text-align: justify;
  text-justify: inter-word;
}
.swipe_out_resolution_CSSSC{
  padding: 5px;
  text-align: justify;
  text-justify: inter-word;
}
.swipe_out_resolution_title_CSSSC{
  font-weight: bold;
}
.struc_title_empty_CSSSC{
  color: grey;
}
.struc_title_CSSSC{
  font-size: 80%;
  padding: 5px 10px 0 10px;
  text-align: justify;
  text-justify: inter-word;
}
.bundle_title_empty_CSSSC{
  color: grey;
}
.bundle_title_CSSSC{
  padding: 0 10px 5px 10px;
  font-size: 80%;
  text-align: justify;
  text-justify: inter-word;
}
.info_strategy_CSSSC{
  padding: 0 10px;
  float: right;
  font-size: 80%;
}
</style>
