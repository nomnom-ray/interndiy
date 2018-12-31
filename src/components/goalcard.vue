<template>
  <div
    v-if="!arrowLeftShow"
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
import { mapGetters } from 'vuex';

export default {
  props: ['propConcept', 'propConceptIndex', 'propSubjectIndex'],
  computed: {
    ...mapGetters({
      subjects: 'subjects',
      relations: 'relations',
    }),
    // showrelation() {
    //   console.log(this.relations);
    //   console.log(this.conceptParent);
    // },
    arrowLeftShow() {
      // left arrow is visible when: 1) concept id of a last kid; 2) id is of a mid subject
      if (this.conceptFirst && (this.conceptIncludeKid && !this.conceptParent)) {
        return true;
      }
      return false;
    },
    conceptFirst() {
      // smallest concept ID in any subject: first concept
      // console.log(this.propSubject, 'conceptFirst', this.subjects[this.propSubject]);
      // console.log(this.subjects[this.propSubject].concepts[0].id);
      if (this.subjects[this.propSubjectIndex] &&
        this.propConcept.id <= this.subjects[this.propSubjectIndex].concepts[0].id) {
        return true;
      }
      return false;
    },
    conceptIncludeKid() {
      // concepts[0] of kid with non-biggest subject ID < concepts.len: mid-kid w concept
      // concepts[0] of kid with non-biggest subject ID = concepts.len: mid kid
      const kidCheck = this.relations
        .find(kinship => kinship.kids.find(kid => kid.id === this.propSubjectIndex));
      if (kidCheck) {
        return true;
      }
      return false;
    },
    conceptParent() {
      const parentRecord = this.relations
        .find(element => element.parent.subject.id === this.propSubjectIndex &&
        element.parent.concept.id === this.propConcept.id);
      if (parentRecord) {
        return true;
      }
      return false;
    },
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