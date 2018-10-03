<template>
  <!-- a lazy preview here  -->
  <a :href="detailURL">
    <div class="cardCSSPSC">
      {{propStructure.title}}
    </div>
  </a>
</template>

<script>
export default {
  props: ['propStructure', 'propStructureIndex'],
  computed: {
    detailURL() {
      return `/pages/structuredetail/main?id=${this.propStructureIndex}`;
    },
  },
};
</script>


<style lang="scss" scoped>
.cardCSSSC {
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
}
</style>