<template>
  <a :href="detailURL">
    <div class="cardCSSPTC">
      Title: {{propTask.title}}
    </div>
  </a>
</template>

<script>
export default {
  props: ['propTask', 'propTaskIndex', 'propStructureIndex'],
  computed: {
    detailURL() {
      return `/pages/taskdetail/main?board=
      ${this.propStructureIndex}&task=${this.propTaskIndex}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.cardCSSTC {
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
}
</style>