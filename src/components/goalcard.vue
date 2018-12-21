<template>
  <div
    class="card_undone_CSSG"
  >
    <div style="font-weight: bold;text-align:center;padding: 10rpx 0 0 0">Goal</div>
    <div
    class='description_CSSG'
    >
      <div style="text-decoration: underline">Description</div>
      {{propConcept.description}}
    </div>
    <div
      class='description_CSSG'
    >
      <div style="text-decoration: underline">Performance metric</div>
      {{propConcept.question}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['propConcept', 'propConceptIndex', 'propSubjectIndex'],
  computed: {
  },
};
</script>


<style lang="scss" scoped>
.card_undone_CSSG{
  font-size: 100%;
  width: 100%;
  margin-bottom: 10px;
  background: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);  
}
.description_CSSG{
  padding: 0 10rpx 10rpx 10rpx;
  text-align: justify;
  text-justify: inter-word;
}
</style>