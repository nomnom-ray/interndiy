<template>
  <div>
    <van-col
      :key='subjectIndex'
      v-for='(subject, subjectIndex) in subjectSelector'
      :custom-class="'subjectCSSCS-' + ((subjectIndex % 3) + 1)"
      :span='(subjectIndex % 2)* 6 + 6'
    >
      {{subject.id}}
      <app-cards
      :key='conceptIndex'
      v-for='(concept, conceptIndex) in subject.concepts'
      :propConcept='concept'
      :propSubject='subject.id'
      :propConceptClickReset='propConceptClickReset'
      >
      </app-cards>
    </van-col>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Cards from './conceptcard';

  export default {
    components: {
      appCards: Cards,
    },
    props: [
      'propSubjectsOnScreen',
      'propConceptClickReset',
    ],
    data() {
    },
    computed: {
      ...mapGetters({
        concepts: 'concepts',
        subjects: 'subjects',
      }),
      subjectSelector() {
        // keeps 3 subjects on screen by the subject array index
        const subjectsOnScreen = this.subjects
          .slice(this.propSubjectsOnScreen - 1, this.propSubjectsOnScreen + 2);
        // assign subjects index to each on-screen subject
        for (let i = 0; i <= subjectsOnScreen.length - 1; i += 1) {
          subjectsOnScreen[i].id = this.propSubjectsOnScreen + (i - 1);
        }
        return subjectsOnScreen;
      },
    },
  };
</script>

<style lang='scss'>
.subjectCSSCS-1 {
  text-align: right;
  direction: rtl;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
.subjectCSSCS-2 {
  text-align: center;
  background-color: rgb(102, 250, 134);;
}
.subjectCSSCS-3 {
  text-align: left;
  direction: ltr;
  background-color: rgb(162, 253, 182);
}
</style>
