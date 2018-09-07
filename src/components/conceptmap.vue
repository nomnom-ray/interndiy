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
        conceptsAdd: 'conceptsAdd',
        subjectsAdd: 'subjectsAdd',
        conceptsId: 'conceptsId',
      }),
      conceptAddTop() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          const concept = { ...this.concept };
          concept.id = conceptIndex;
          this.conceptsAdd({ subjectIndex, position: 'top', concept });
          // reassign original ID including and after selected
          for (let i = conceptIndex; i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
            this.conceptsId({ subjectIndex, idNew: i });
          }
          this.selectClear();
        }
      },
      conceptAddBottom() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          const concept = { ...this.concept };
          concept.id = conceptIndex + 2;
          this.conceptsAdd({ subjectIndex, position: 'bottom', concept });
          // reassign original ID including and after selected
          for (let i = conceptIndex + 1;
            i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
            this.conceptsId({ subjectIndex, idNew: i });
          }
          this.selectClear();
        }
      },
      conceptDelete() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          this.subjects[subjectIndex].concepts.splice(conceptIndex, 1);
          // reassign original ID including and after deselected
          for (let i = conceptIndex;
            i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
            this.conceptsId({ subjectIndex, idNew: i });
          }
          this.selectClear();
        }
      },
      subjectNew() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const subject = { ...this.subject };
          // add a new subject column to the left of the selected card
          // start subject with 3 types of concepts: blanks, the selected one, and a new concept
          subject.id = subjectIndex + 1;
          subject.concepts.push(this.subjects[subjectIndex]
            .concepts[this.conceptsSelected[0].conceptId]);
          // TODO: add blanks &  new concept above and below
          this.subjectsAdd({
            subjectIndex,
            subject,
          });
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
