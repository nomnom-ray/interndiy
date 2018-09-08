<template>
  <div>
    <van-row gutter='15'>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptAddTop'
          >T
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptAddBottom'
          >B
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptDelete'
          >D
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button 
            type='default'
            @click='subjectNew'
          >S
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='subjectsOnScreen += 1'
          >L
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='subjectsOnScreen -= 1'
          >R
          </van-button>
        </van-col>
    </van-row>

    <van-row>
      <van-col
        :key='subjectIndex'
        v-for='(subject, subjectIndex) in subjectSelector'
        :custom-class="'subjectCSSCM-' + ((subjectIndex % 3) + 1)"
        :span='(subjectIndex % 2)* 6 + 6'
      >
        Subject: {{subject.id}}

        <app-blanks
        :key='blankIndex'
        v-for='(blank, blankIndex) in subject.concepts[0].id'
        >
        </app-blanks>

        <app-cards
        :key='conceptIndex'
        v-if='subject.id != 0'
        v-for='(concept, conceptIndex) in subject.concepts'
        :propConcept='concept'
        :propSubject='subject.id'
        :propConceptClickReset='conceptClickReset'
        >
        </app-cards>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import Subjects from './conceptsubject';
  import Cards from './conceptcard';
  import Blanks from './conceptblank';


  export default {
    components: {
      appCards: Cards,
      // appSubjects: Subjects,
      appBlanks: Blanks,
    },
    data() {
      return {
        // subjectsOnScreen = 1 leaves the leftmost subject empty by using a blank reserved subject
        // there is no appended blank reserve subject
        subjectsOnScreen: 1,
        conceptClickReset: false,
        subjectIndex: 0,
        conceptIndex: 0,
        conceptFirst: 3,
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
      subjectSelector() {
        // keeps 3 subjects on screen by the subject array index
        const subjectsOnScreen = this.subjects
          .slice(this.subjectsOnScreen - 1, this.subjectsOnScreen + 2);
        // assign subjects index to each on-screen subject
        for (let i = 0; i <= subjectsOnScreen.length - 1; i += 1) {
          subjectsOnScreen[i].id = this.subjectsOnScreen + (i - 1);
        }
        return subjectsOnScreen;
      },
      // disableNewSTop() {
      //   if (this.conceptsSelected.length === 1) {
      //     const subjectIndex = this.subjects.map(element => element.id)
      //       .indexOf(this.conceptsSelected[0].subjectId);
      //     const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
      //       .indexOf(this.conceptsSelected[0].conceptId);
      //     if (this.subjects[subjectIndex].concepts[conceptIndex].type === 'copy') {
      //       return true;
      //     }
      //     return false;
      //   }
      //   return true;
      // },
    },
    methods: {
      ...mapActions({
        conceptClear: 'conceptClear',
        conceptsAdd: 'conceptsAdd',
        subjectsAdd: 'subjectsAdd',
        conceptsId: 'conceptsId',
        conceptsDel: 'conceptsDel',
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
          // [CAUTION] without reassignment, there is no binding between index and id
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
          const blanksCount = this.subjects[subjectIndex].concepts[0].id;
          for (let i = conceptIndex + 1;
            i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
            this.conceptsId({ subjectIndex, idNew: i + blanksCount, blanksCount });
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
          // this.subjects[subjectIndex].concepts.splice(conceptIndex, 1);
          this.conceptsDel({ subjectIndex, conceptIndex });
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
          // [CAUTION] using .push() for .concepts will introduce binding between them...
          // ...even after JSON .parse & .stringify
          // [CAUTION] the copied concept is binded to the originally selected concept; this is good
          subject.concepts = [this.subjects[subjectIndex]
            .concepts[this.conceptsSelected[0].conceptId]];
          this.subjectsAdd({
            subjectIndex,
            subject,
          });
          // TODO: add blanks &  new concept above and below
          this.subjectIndex = subject.id;
          this.conceptIndex = this.conceptsSelected[0].conceptId;
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
.subjectCSSCM-1 {
  text-align: right;
  direction: rtl;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
.subjectCSSCM-2 {
  text-align: center;
  background-clip: content-box;
  background-color: rgb(102, 250, 134);;
}
.subjectCSSCM-3 {
  text-align: left;
  direction: ltr;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
</style>
