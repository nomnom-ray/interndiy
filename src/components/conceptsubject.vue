<template>
  <div>
    <van-col
      :key='index'
      v-for='(subject, index) in subjectSelector'
      :custom-class="'subjectCSSCS-' + ((index % 3) + 1)"
      :span='(index % 2)* 6 + 6'
    >
      {{(index % 2)* 6 + 6}}
      <app-cards
      :key='index1'
      v-for='(concept, index1) in subject.concepts'
      :propConcept='concept'
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
    props: ['propSubjectsOnScreen'],
    data() {
    },
    computed: {
      ...mapGetters({
        concepts: 'concepts',
        subjects: 'subjects',
      }),
      subjectSelector() {
        // 3 is the smallest "range of 3 coumns" subjects to be displayed
        return this.subjects.filter(subject => subject.column <= this.propSubjectsOnScreen
        && subject.column >= this.propSubjectsOnScreen - 2);
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
