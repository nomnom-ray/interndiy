<template>
  <a :href="detailURL">
    <div class="cardCSSSBC">
      Title: {{propBundle.title}}
    </div>
    <wux-gallery v-if='pageActive === 6' id="wux-gallery"></wux-gallery>
    <div
      v-if='structures[propStructureIndex].bundles[propBundleIndex]'
      :key='index'
      v-for="(url, index) in structures[propStructureIndex].bundles[propBundleIndex].structurePics"
    >
      <div>
        <img
          class="weui-uploader__img"
          :src="url" mode="aspectFill"
          :id="index"
        />
      </div>
    </div>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import { $wuxGallery } from '../util/wux';

export default {
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
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
}
</style>