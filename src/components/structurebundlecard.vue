<template>
  <a :href="detailURL">
    <div class="cardCSSSBC">
      Title: {{propBundle.title}}
    </div>
  </a>
</template>

<script>
export default {
  props: ['propBundle', 'propBundleIndex', 'propStructureIndex'],
  computed: {
    detailURL() {
      return `/pages/structurebundle/main?board=
      ${this.propStructureIndex}&bundle=${this.propBundleIndex}`;
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