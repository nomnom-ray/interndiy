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
        :propSubjectRelations='subjectRelations'
        >
        </app-cards>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Cards from './conceptcard';
  import Blanks from './conceptblank';


  export default {
    components: {
      appCards: Cards,
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
      // colClicked(colClicked) {
      // // @click='colClicked(subjectIndex)'
      // if (colClicked === 1) {
      //   return;
      // }
      // if (colClicked === 0) {
      //   this.subjectsOnScreen -= 1;
      // }
      // if (colClicked === 2) {
      //   this.subjectsOnScreen += 1;
      // }
      // },
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
          for (let j = subjectIndex; j <= this.subjects.length - 1; j += 1) {
            const blanksCount = this.subjects[j].concepts[0].id;
            for (let i = conceptIndex;
              i <= this.subjects[j].concepts.length - 1; i += 1) {
              this.conceptsId({ subjectIndex: j, idNew: i + blanksCount, blanksCount });
            }
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
          for (let j = subjectIndex; j <= this.subjects.length - 1; j += 1) {
            const blanksCount = this.subjects[j].concepts[0].id;
            for (let i = conceptIndex + 1;
              i <= this.subjects[j].concepts.length - 1; i += 1) {
              this.conceptsId({ subjectIndex: j, idNew: i + blanksCount, blanksCount });
              // console.log('j: ', j, 'idNew: ', i + blanksCount, 'blanksCount: ', blanksCount);
            }
          }
          this.selectClear();
        }
      },
      conceptDelete() {
        if (this.conceptsSelected.length === 1) {
          const parentRecord = this.subjectRelations
            .find(element => element.parentId.subject.id ===
              this.conceptsSelected[0].subjectId &&
                element.parentId.concept.id === this.conceptsSelected[0].conceptId);
          // is the clicked concept a parent?
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
          // delete the subjectRelation object if the concept-kids[] is 0
          const subjectParentCheckIndex = this.subjectRelations
            .findIndex(kinship => kinship.kids.find(kid => kid.id ===
              this.conceptsSelected[0].subjectId));
          const subjectParentCheck = this.subjectRelations[subjectParentCheckIndex];
          if (subjectParentCheck) {
            const kidIdIndex = subjectParentCheck.kids.findIndex(kid => kid.id ===
              this.conceptsSelected[0].subjectId);
            if (subjectParentCheck.kids.length <= 1 &&
              this.subjects[subjectIndex].concepts.length <= 1) {
              // will glitch with only first blank placeholding subject
              this.subjectRelations.splice(subjectParentCheckIndex, 1);
            }
            if (this.subjects[subjectIndex].concepts.length <= 1) {
              subjectParentCheck.kids.splice(kidIdIndex, 1);
            }
          }
          this.conceptsDel({ subjectIndex, conceptIndex });
          // reassign original ID including and after deselected
          // to reassign, check whether the concept deleted is the last one in the subject
          if (this.subjects[subjectIndex]) {
            for (let j = subjectIndex; j <= this.subjects.length - 1; j += 1) {
              const blanksCount = this.subjects[j].concepts[0].id;
              for (let i = conceptIndex;
                i <= this.subjects[j].concepts.length - 1; i += 1) {
                this.conceptsId({ subjectIndex: j, idNew: i + blanksCount, blanksCount });
              }
            }
          }
          this.selectClear();
        }
      },
      subjectNew() {
        if (this.conceptsSelected.length === 1) {
          // condition to limit actionable concepts
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);

          const subject = { ...this.subject };
          // [CAUTION] using .push() for .concepts will introduce binding between them...
          // ...even after JSON .parse & .stringify
          // [CAUTION] the copied concept is binded to the originally selected concept; this is good
          const blanksCount = this.subjects[subjectIndex].concepts[0].id;
          subject.concepts = [this.subjects[subjectIndex]
            .concepts[this.conceptsSelected[0].conceptId - blanksCount]];

          // create kinship between subjects for better deletion control
          // each array element is 1 kinship with 1 parent concept and multiple kids subject
          const subjectKin = { ...this.subjectKin };
          subjectKin.parentId = {
            subject: this.subjects[subjectIndex],
            concept: this.subjects[subjectIndex]
              .concepts[this.conceptsSelected[0].conceptId - blanksCount],
          };
          // The selected concept is both a subjectParent && conceptParent
          const parentRecord = this.subjectRelations.find(element => element.parentId.subject.id ===
            this.conceptsSelected[0].subjectId &&
            element.parentId.concept.id === this.conceptsSelected[0].conceptId);

          if (parentRecord) {
            // if as both sub & con parent, then the new subject is adjacent to an existing kid
            // console.log('both con/sub parent');
            // look for the lowest subject.id and splice it
            const subjectMin = parentRecord.kids
              .reduce((min, current) => (min < current.id ? min : current.id), parentRecord
                .kids[0].id);
            subject.id = subjectMin;
            this.subjectsAdd({ indexNew: subject.id, subject });
            // spread because e.g. 'the different .kids are not all pushing to the same array'
            parentRecord.kids = [...parentRecord.kids, this.subjects[subject.id]];
          } else {
            // There is at least one parent with the same subject as the selected concept
            const subjectRecord = this.subjectRelations
              .find(element => element.parentId.subject.id === this.conceptsSelected[0].subjectId);

            if (subjectRecord) {
              // if at least one parent in this subject, then there must be kids to rearrange
              // the to-be subject asks: "does the next subject eventually...
              // ...lead to the same subjectParent as me? If it does, i ...
              // can either be in front or behind it depends on concept[0].id"
              // console.log('only sub parent');
              for (let i = subjectRecord.parentId.subject.id + 1;
                i <= this.subjects.length - 0; i += 1) {
                // TODO: a case after i++, where i points to empty subjects[]
                if (!this.subjects[i]) {
                  // console.log('last by empty []');
                  //  subjects[i].id reached the end of subjects
                  subject.id = i;
                  this.subjectsAdd({ indexNew: subject.id, subject });
                  subjectKin.kids = [this.subjects[subject.id]];
                  // only push when ceating new subjectKin relation
                  this.subjectRelations.push(subjectKin);
                  break;
                }
                // iterratively look for the previous parentSubject starting from subject[i]
                const subjectParentCheck = this.subjectRelations
                  .find(kinship => kinship.kids.find(kid => kid.id === this.subjects[i].id));
                let parentLookBack = subjectParentCheck;
                while (parentLookBack.parentId.subject.id >= subjectRecord.parentId.subject.id) {
                  if (!parentLookBack || parentLookBack.parentId.subject.id ===
                    subjectRecord.parentId.subject.id) {
                    break;
                  }
                  parentLookBack = this.parentLookBackHelper(parentLookBack);
                }
                // subject[i] either has a parent matched to the subject of the selected concept...
                // ...or subject[i] is undefined cuz it passed the subjectID of aforementioned parent
                if (parentLookBack) {
                  if (subject.concepts[0].id < this.subjects[i].concepts[0].id) {
                    // i+ to try whether the next this.subjects[] will have a smaller concept[0].id
                    // console.log('i++', i);
                  } else {
                    // subject.concepts[0].id is at the its top most position...
                    // ...within this parent-kids chain
                    // console.log('add');
                    subject.id = i;
                    this.subjectsAdd({ indexNew: subject.id, subject });
                    subjectKin.kids = [this.subjects[subject.id]];
                    // only push when ceating new subjectKin relation
                    this.subjectRelations.push(subjectKin);
                    break;
                  }
                } else {
                  // console.log('last by parent');
                  //  subjects[i].id reached a different subject parent
                  subject.id = i;
                  this.subjectsAdd({ indexNew: subject.id, subject });
                  subjectKin.kids = [this.subjects[subject.id]];
                  // only push when ceating new subjectKin relation
                  this.subjectRelations.push(subjectKin);
                  break;
                }
              }
            } else {
              // condition for no matching subjectParent nor conceptParent (i.e. init)
              // create a new subject on the immediate right of original
              // console.log('no con/sub parent');
              subject.id = subjectIndex + 1;
              this.subjectsAdd({ indexNew: subject.id, subject });
              subjectKin.kids = [this.subjects[subject.id]];
              // only push when ceating new subjectKin relation
              this.subjectRelations.push(subjectKin);
            }
          }
          // reassign all subjects index within the subjects []
          for (let i = subjectIndex + 1; i <= this.subjects.length - 1; i += 1) {
            this.subjectsId({ idNew: i });
          }
          // this.subjectsOnScreen += 1;
          this.selectClear();
        }
      },
      parentLookBackHelper(helper) {
        return this.subjectRelations.find(kinship => kinship.kids.find(kid => kid.id ===
          helper.parentId.subject.id));
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
  background-color: rgb(102, 250, 134);
}
.subjectCSSCM-3 {
  text-align: left;
  direction: ltr;
  background-clip: content-box;
  background-color: rgb(162, 253, 182);
}
</style>
