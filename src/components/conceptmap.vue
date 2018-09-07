<template>
  <div>
    <van-row gutter='15'>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='conceptAddTop'>T</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='conceptAddBottom'>B</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='conceptDelete'>D</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='subjectNew'>S</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='subjectsOnScreen += 1'>L</van-button>
        </van-col>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button type='default' @click='subjectsOnScreen -= 1'>R</van-button>
        </van-col>
    </van-row>

    <van-row gutter='15'>
        <app-subjects 
          :propSubjectsOnScreen='subjectsOnScreen'
          :propConceptClickReset='conceptClickReset'
        >
        </app-subjects>
    </van-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Subjects from './conceptsubject';

  export default {
    components: {
      // appCard: Card,
      appSubjects: Subjects,
    },
    data() {
      return {
        // subjectsOnScreen = 1 leaves the leftmost subject empty by using a blank reserved subject
        // there is no appended blank reserve subject
        subjectsOnScreen: 1,
        conceptClickReset: false,
        concept: {
          id: 0,
          type: '',
          behavior: '',
        },
        subject: {
          id: 0,
          length: 0,
          summary: '',
          concepts: [],
        },
      };
    },
    computed: {
      ...mapGetters({
        subjects: 'subjects',
        conceptsSelected: 'conceptsSelected',
      }),
    },
    methods: {
      ...mapActions({
        conceptClear: 'conceptClear',
      }),
      conceptAddTop() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subject);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].id);
          const concept = { ...this.concept };
          concept.id = conceptIndex + 1;
          this.subjects[subjectIndex].concepts.splice(conceptIndex, 0, concept);
          // TODO: reassign original ID including and after selected
          this.selectClear();
        }
      },
      conceptAddBottom() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subject);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].id);
          const concept = { ...this.concept };
          // placeholder until when concepts are added for new subjects
          concept.id = conceptIndex + 2;
          this.subjects[subjectIndex].concepts.splice(conceptIndex + 1, 0, concept);
          this.selectClear();
        }
      },
      conceptDelete() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subject);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].id);
          this.subjects[subjectIndex].concepts.splice(conceptIndex, 1);
          this.selectClear();
        }
      },
      subjectNew() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subject);
          const subject = { ...this.subject };
          // add a new subject column to the left of the selected card
          this.subjects.splice(subjectIndex + 1, 0, subject);
          // start subject with 3 types of concepts: blanks, the selected one, and a new concept
          // TODO: add blanks here
          this.subjects[subjectIndex + 1].concepts.push(this.conceptsSelected[0]);
          // const concept = { ...this.concept };
          // FIXME: correct new concept
          // concept.id = 0;
          // this.subjects[subjectIndex + 1].concepts.push(concept);
          this.selectClear();
        }
      },
      selectClear() {
        this.conceptClear();
        this.conceptClickReset = !this.conceptClickReset;
      },
    },
  };

</script>

<style lang='scss'>
.subjectCSSCM {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
</style>
