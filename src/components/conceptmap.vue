<template>
  <div>
    <van-row gutter='15'>
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptAddTop'
            :disabled='conceptsSelected.length != 1 | conceptsSelected[0].conceptId === 0'
          >T
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptAddBottom'
            :disabled="conceptsSelected.length != 1 | conceptsSelected[0].conceptType === 'result'"
          >B
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='conceptDelete'
            :disabled="conceptsSelected.length != 1 | conceptsSelected[0].conceptType === 'trigger' | conceptsSelected[0].conceptType === 'result'"
          >D
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button 
            type='default'
            @click='subjectNew'
            :disabled="conceptsSelected.length != 1 | conceptsSelected[0].conceptType === 'trigger' | conceptsSelected[0].conceptType === 'result'"
          >S
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='subjectsOnScreen += 1'
            :disabled='subjectsOnScreen >= subjects.length - 1 ? true : false'
          >L
          </van-button>
        </van-col>
        
        <van-col custom-class='subjectCSSCM' span='4'>
          <van-button
            type='default'
            @click='subjectsOnScreen -= 1'
            :disabled='subjectsOnScreen <= 1 ? true : false'
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
        subjectRelations: [],
        conceptRelations: [],
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
        subjectKin: {
          parentId: {},
          kids: [],
        },
        conceptMarriage: {
          spouse1: '',
          spouse2: '',
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
      disableNewSTop() {

      },
    },
    methods: {
      ...mapActions({
        conceptClear: 'conceptClear',
        conceptsAdd: 'conceptsAdd',
        subjectsAdd: 'subjectsAdd',
        conceptsId: 'conceptsId',
        conceptsDel: 'conceptsDel',
        subjectsId: 'subjectsId',
      }),
      conceptAddTop() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          const concept = { ...this.concept };
          // [CAUTION] .type must come before .id for some reason for html to behave correctly
          concept.type = 'step';
          concept.id = conceptIndex;
          this.conceptsAdd({ subjectIndex, position: 'top', concept });
          // [CAUTION] without reassignment, there is no binding between index and id
          // reassign original ID including and after selected
          const blanksCount = this.subjects[subjectIndex].concepts[0].id;
          for (let i = conceptIndex;
            i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
            this.conceptsId({ subjectIndex, idNew: i + blanksCount, blanksCount });
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
          concept.type = 'step';
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
          const parentRecord = this.subjectRelations
            .find(element => element.parentId.subjectId ===
              this.conceptsSelected[0].subjectId &&
                element.parentId.conceptId === this.conceptsSelected[0].conceptId);
          if (parentRecord) {
            // eslint-disable-next-line
            console.log('please delete children first');
            this.selectClear();
            return;
          }
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          if (this.subjects[subjectIndex].concepts.length > 1 &&
          this.conceptsSelected[0].conceptId === this.subjects[subjectIndex].concepts[0].id) {
            // eslint-disable-next-line
            console.log('please delete concepts first');
            this.selectClear();
            return;
          }
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          this.conceptsDel({ subjectIndex, conceptIndex });
          // reassign original ID including and after deselected
          // checks whether the last concept is deleted by lookin at current index vs mapped index
          if ((this.subjects.length - 1) === subjectIndex) {
            const blanksCount = this.subjects[subjectIndex].concepts[0].id;
            for (let i = conceptIndex;
              i <= this.subjects[subjectIndex].concepts.length - 1; i += 1) {
              this.conceptsId({ subjectIndex, idNew: i + blanksCount, blanksCount });
            }
          }
          const record = this.subjectRelations.find(kin => kin.kids
            .find(kid => kid.kidsIds.id === subjectIndex));

          const parentIndex = this.subjectRelations
            .findIndex(kin => kin.parentId.subjectId === record.parentId.subjectId);

          const kidIndex = this.subjectRelations[parentIndex].kids
            .findIndex(kid => kid.kidsIds.id === subjectIndex);

          this.subjectRelations[parentIndex].kids.splice(kidIndex, 1);

          // console.log('in del SR: ', kidIndex);
          console.log('in del: ', this.subjectRelations);
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
          subject.summary = 'test summary';
          // [CAUTION] using .push() for .concepts will introduce binding between them...
          // ...even after JSON .parse & .stringify
          // [CAUTION] the copied concept is binded to the originally selected concept; this is good
          const blanksCount = this.subjects[subjectIndex].concepts[0].id;
          subject.concepts = [this.subjects[subjectIndex]
            .concepts[this.conceptsSelected[0].conceptId - blanksCount]];
          this.subjectsAdd({
            subjectIndex,
            subject,
          });
          // screen always updates to the newly generated subject
          this.subjectsOnScreen += 1;
          // create kinship between subjects for better deletion control
          // each array element is 1 kinship with 1 parent concept and multiple kids subject
          const parentRecord = this.subjectRelations.find(element => element.parentId.subjectId ===
            this.conceptsSelected[0].subjectId &&
            element.parentId.conceptId === this.conceptsSelected[0].conceptId);
          if (parentRecord) {
            // spread because e.g. 'the different .kids are not all pushing to the same array'
            parentRecord.kids = [...parentRecord.kids,
              { parentId: { ...this.conceptsSelected[0] }, kidsIds: this.subjects[subject.id] }];
            // reassign all subjects index within the subjects []
            for (let i = subjectIndex + 1; i <= this.subjects.length - 1; i += 1) {
              this.subjectsId({ idNew: i });
            }
          } else {
            const subjectKin = { ...this.subjectKin };
            subjectKin.parentId = { ...this.conceptsSelected[0] };
            subjectKin.kids = [
              { parentId: { ...this.conceptsSelected[0] }, kidsIds: this.subjects[subject.id] },
            ];
            // having only 1 push allows the subjectKin arrays to be separate from mutual binding
            this.subjectRelations.push(subjectKin);
          }
          console.log('in sub: ', this.subjectRelations);
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
