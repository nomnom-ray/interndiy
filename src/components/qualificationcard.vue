<template>
  <a :href="detailURL">
    <div class="cardCSSQC">
      <div class="titleCSSQC">
      Title: {{propQualification.title}}
      </div>
      <div class="descriptionCSSQC">
        <p>Description: {{propQualification.description}}</p>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['propQualification'],
  computed: {
    detailURL() {
      return `/pages/qualificationdetail/main?id=${this.propQualification.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.cardCSSQC {
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
  .titleCSSQC{
    padding: 5px;
  }
  .descriptionCSSQC{
    padding: 5px;
    white-space: pre;
  }
}
</style>
