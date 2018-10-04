<template>
  <div>
    <van-popup
    :show="conceptPopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <div class='popupCSSCM'>
        <input 
          class="popupinputCSSCM"
          v-model='conceptQuestion'
          :maxlength="200"
          placeholder="Qualification Title"
          :disabled='topAddDisable && !triggerTopDisable'
        >
        <textarea
          class="popupfieldsCSSCM"
          v-model='conceptDescription'
          :maxlength="200"
          placeholder="Qualification Description"
          :disabled='topAddDisable && !triggerTopDisable'
        >
        </textarea>
      </div>
      
      <wux-row gutter='15'>
        <wux-col span='2'>
          <wux-button
            block
            outline
            type="assertive"
            @click='conceptAddTop'
            :disabled='conceptsSelected.length != 1 | topAddDisable'
          >T
          </wux-button>
        </wux-col>

        <wux-col span='2'>
          <wux-button
            block
            outline
            type="assertive"
            @click='conceptAddBottom'
            :disabled="conceptsSelected.length != 1 | resultBottomDisable"
          >B
          </wux-button>
        </wux-col>
        
        <wux-col span='2'>
          <wux-button
            block
            outline
            type="assertive"
            @click='conceptDelete'
            :disabled="conceptsSelected.length != 1 | resultBottomDisable | triggerTopDisable"
          >D
          </wux-button>
        </wux-col>

        <wux-col span='2'>
          <wux-button
            block
            outline
            type="assertive"
            @click='subjectNew'
            :disabled="conceptsSelected.length != 1 | topAddDisable | resultBottomDisable"
          >{{ topAddDisable ? 'P' : 'S' }}
          </wux-button>
        </wux-col>
    </wux-row>
    </van-popup>
    <van-popup
      :show="subjectPopupShow"
      @close="popupCloseHandler()"
      position='top'
    >
      <input 
        class="popupCSSCM popupinputCSSCM"
        v-model='subjectSummary'
        :maxlength="200"
        placeholder="Subject Summary"
      >
    </van-popup>
    <wux-row>
      <wux-col
        :key='subjectIndex'
        v-for='(subject, subjectIndex) in subjectSelector'
        :span='(subjectIndex % 2)* 3 + 3'
        @click='colClickedHandler(subjectIndex)'
      >
        <view :class="'subjectCSSCM-' + ((subjectIndex % 3) + 1)">
          <div
          @click='subjectPopupShow=true, subjectSelected=subject.id'
          >
            Subject: {{subject.id}}
          </div>

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
          :propSubjectIndex='subjectIndex'
          >
          </app-cards>
        </view>
      </wux-col>
    </wux-row>
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
        subjectRelations: [],
        conceptPopupShow: false,
        subjectPopupShow: false,
        conceptQuestion: '',
        conceptDescription: '',
        subjectSummary: '',
        subjectSelected: 0,
      };
    },
    computed: {
      ...mapGetters({
        subjects: 'subjects',
        conceptsSelected: 'conceptsSelected',
      }),
      subjectSelector() {
        // keeps 3 subjects on screen by the subject array index
        // console.log(this.subjectRelations);
        const subjectsOnScreen = this.subjects
          .slice(this.subjectsOnScreen - 1, this.subjectsOnScreen + 2);
        // assign subjects index to each on-screen subject
        for (let i = 0; i <= subjectsOnScreen.length - 1; i += 1) {
          subjectsOnScreen[i].id = this.subjectsOnScreen + (i - 1);
        }
        return subjectsOnScreen;
      },
      topAddDisable() {
        if (this.conceptsSelected[0] &&
          this.subjects[this.conceptsSelected[0].subjectId].concepts) {
          const conceptFirst = this.subjects[this.conceptsSelected[0].subjectId].concepts
            .findIndex(element => element.id === this.conceptsSelected[0].conceptId);
          if (conceptFirst === 0) {
            return true;
          }
        }
        return false;
      },
      resultBottomDisable() {
        if (this.conceptsSelected[0] &&
          this.subjects[this.conceptsSelected[0].subjectId].concepts) {
          const resultIndex = this.subjects[this.conceptsSelected[0].subjectId].concepts.length - 1;
          if (this.conceptsSelected[0].subjectId === 1 &&
            this.conceptsSelected[0].conceptId === resultIndex) {
            return true;
          }
        }
        return false;
      },
      triggerTopDisable() {
        if (this.conceptsSelected[0] &&
          this.subjects[this.conceptsSelected[0].subjectId].concepts) {
          if (this.conceptsSelected[0].subjectId === 1 && this.conceptsSelected[0].conceptId === 0) {
            return true;
          }
        }
        return false;
      },
    },
    created() {
      this.$root.$on('conceptPopupShow', (state) => {
        this.conceptPopupShow = state;
      });
      // on start up, localstorage data populates vuex states
      const that = this;
      wx.getStorage({
        key: 'CONCEPTSCOUNT',
        success(resCount) {
          that.conceptsCountInit(resCount.data);
          const subjectsStored = [];
          for (let i = 0; i <= resCount.data.length - 1; i += 1) {
            const subject = {
              id: i,
              summary: '',
              concepts: [],
            };
            for (let j = 0; j <= resCount.data[i] - 1; j += 1) {
              const concept = {
                id: 0,
                question: '',
                description: '',
              };
              try {
                const resId = wx.getStorageSync(`SUBJECTS_${i}_CONCEPTS_${j}_ID`);
                if (resId) {
                  // console.log(resId);
                  concept.id = resId;
                }
                const resQuestion = wx.getStorageSync(`SUBJECTS_${i}_CONCEPTS_${resId}_QUESTION`);
                concept.question = resQuestion;
                const resDescription = wx.getStorageSync(`SUBJECTS_${i}_CONCEPTS_${resId}_DESCRIPTION`);
                concept.description = resDescription;
                subject.concepts.push(concept);
                // console.log(i, j, concept);
              } catch (err) {
                // eslint-disable-next-line
                console.log('err @ ID: ', `SUBJECTS_${i}_CONCEPTS_${j}_ID`, err);
              }
            }
            subjectsStored.push(subject);
          }

          try {
            const resShips = wx.getStorageSync('RELATIONS');
            if (resShips) {
              const subjectRelationsString = resShips;
              const subjectRelationsStored = [];
              for (let i = 0; i <= subjectRelationsString.length - 1; i += 1) {
                const blanksCount = subjectsStored[subjectRelationsString[i].parent.subject]
                  .concepts[0].id;
                const subjectKin = {
                  parentId: {},
                  kids: [],
                };
                subjectKin.parentId = {
                  subject: subjectsStored[subjectRelationsString[i].parent.subject],
                  concept: subjectsStored[subjectRelationsString[i].parent.subject]
                    .concepts[subjectRelationsString[i].parent.concept - blanksCount],
                };
                for (let j = 0; j <= subjectRelationsString[i].kids.length - 1; j += 1) {
                  subjectsStored[subjectRelationsString[i].kids[j]].concepts
                    .splice(0, 1, subjectsStored[subjectRelationsString[i].parent.subject]
                      .concepts[subjectRelationsString[i].parent.concept - blanksCount]);
                  const kid = subjectsStored[subjectRelationsString[i].kids[j]];
                  subjectKin.kids.push(kid);
                }
                subjectRelationsStored.push(subjectKin);
              }
              that.subjectRelations = subjectRelationsStored;
            }
          } catch (err) {
            // eslint-disable-next-line
            console.log('err @ ships: ', err);
          }
          that.subjectsInit({ type: 'localstored', content: subjectsStored });
          // console.log(that.subjectRelations);
          // console.log(subjectsStored);
        },
        fail() {
          that.subjectsInit({ type: 'new', content: '' });
        },
      });
    },
    watch: {
      //  same logic used in 'qualificationdetial'
      conceptQuestion() {
        if (this.conceptsSelected[0]) {
          const blanksCount = this.subjects[this.conceptsSelected[0].subjectId].concepts[0].id;
          this.subjectsUpdate({
            subjectIndex: this.conceptsSelected[0].subjectId,
            conceptIndex: this.conceptsSelected[0].conceptId - blanksCount,
            type: 'question',
            content: this.conceptQuestion,
          });
        }
      },
      conceptDescription() {
        if (this.conceptsSelected[0]) {
          const blanksCount = this.subjects[this.conceptsSelected[0].subjectId].concepts[0].id;
          this.subjectsUpdate({
            subjectIndex: this.conceptsSelected[0].subjectId,
            conceptIndex: this.conceptsSelected[0].conceptId - blanksCount,
            type: 'description',
            content: this.conceptDescription,
          });
        }
      },
      subjectSummary() {
        // may need a if to catch empty subjectselected
        this.subjectsUpdate({
          subjectIndex: this.subjectSelected,
          conceptIndex: '',
          type: 'summary',
          content: this.subjectSummary,
        });
      },
      conceptPopupShow() {
        if (this.conceptPopupShow === true) {
          const blanksCount = this.subjects[this.conceptsSelected[0].subjectId].concepts[0].id;
          const conceptObject = this.subjects[this.conceptsSelected[0]
            .subjectId].concepts[this.conceptsSelected[0].conceptId - blanksCount];
          this.conceptQuestion = conceptObject.question;
          this.conceptDescription = conceptObject.description;
        }
      },
    },
    methods: {
      ...mapActions({
        conceptClear: 'conceptClear',
        conceptsAdd: 'conceptsAdd',
        subjectsAdd: 'subjectsAdd',
        conceptsId: 'conceptsId',
        conceptsDel: 'conceptsDel',
        conceptsCountInit: 'conceptsCountInit',
        subjectsId: 'subjectsId',
        subjectsInit: 'subjectsInit',
        subjectsUpdate: 'subjectsUpdate',
      }),
      subjectRelationsStore() {
        const relations = [];
        for (let i = 0; i <= this.subjectRelations.length - 1; i += 1) {
          const kin = {
            parent: {
              subject: 0,
              concept: 0,
            },
            kids: [],
          };
          kin.parent.subject = this.subjectRelations[i].parentId.subject.id;
          kin.parent.concept = this.subjectRelations[i].parentId.concept.id;
          for (let j = 0; j <= this.subjectRelations[i].kids.length - 1; j += 1) {
            kin.kids.push(this.subjectRelations[i].kids[j].id);
          }
          relations.push(kin);
        }
        wx.setStorage({
          key: 'RELATIONS',
          data: relations,
          // success(res) {
          //   console.log('set', type, ': ', res);
          // },
        });
      },
      colClickedHandler(colClicked) {
        if (colClicked === 1) {
          return;
        }
        if (colClicked === 0) {
          this.subjectsOnScreen -= 1;
          this.selectClear();
        }
        if (colClicked === 2) {
          this.subjectsOnScreen += 1;
          this.selectClear();
        }
      },
      popupCloseHandler() {
        // important that clear is before setting data to '' because of watch
        this.selectClear();
        this.conceptQuestion = '';
        this.conceptDescription = '';
        this.subjectSummary = '';
        this.conceptPopupShow = false;
        this.subjectPopupShow = false;
      },
      conceptAddTop() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          const concept = {
            id: 0,
            question: '',
            description: '',
          };
          concept.id = conceptIndex;
          this.conceptsAdd({ subjectIndex, position: 'top', concept });
          // [CAUTION] without reassignment, there is no binding between index and id
          // reassign original ID including and after selected
          // there is a double for, because [0].id determines # of blank cards...
          // ...thie height of all subjects depends on these for loops
          for (let j = subjectIndex; j <= this.subjects.length - 1; j += 1) {
            const blanksCount = this.subjects[j].concepts[0].id;
            for (let i = conceptIndex;
              i <= this.subjects[j].concepts.length - 1; i += 1) {
              this.conceptsId({ subjectIndex: j, idNew: i + blanksCount, blanksCount });
            }
          }
          this.popupCloseHandler();
        }
      },
      conceptAddBottom() {
        if (this.conceptsSelected.length === 1) {
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          const conceptIndex = this.subjects[subjectIndex].concepts.map(element => element.id)
            .indexOf(this.conceptsSelected[0].conceptId);
          const concept = {
            id: 0,
            question: '',
            description: '',
          };
          concept.id = conceptIndex + 2;
          this.conceptsAdd({ subjectIndex, position: 'bottom', concept });
          // reassign original ID including and after selected
          for (let j = subjectIndex; j <= this.subjects.length - 1; j += 1) {
            const blanksCount = this.subjects[j].concepts[0].id;
            for (let i = conceptIndex + 1;
              i <= this.subjects[j].concepts.length - 1; i += 1) {
              this.conceptsId({ subjectIndex: j, idNew: i + blanksCount, blanksCount });
            }
          }
          this.popupCloseHandler();
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
            this.popupCloseHandler();
            return;
          }
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);
          if (this.subjects[subjectIndex].concepts.length > 1 &&
          this.conceptsSelected[0].conceptId === this.subjects[subjectIndex].concepts[0].id) {
            // eslint-disable-next-line
            console.log('please delete concepts first');
            this.popupCloseHandler();
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
          const conceptLastIndex = (this.subjects[subjectIndex]
            .concepts.length) - 1;
          const conceptLastId = this.subjects[subjectIndex]
            .concepts[conceptLastIndex].id;
          this.conceptsDel({
            subjectIndex,
            conceptIndex,
            conceptLastIndex,
            conceptLastId,
          });
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
          this.subjectRelationsStore();
          this.popupCloseHandler();
        }
      },
      subjectNew() {
        if (this.conceptsSelected.length === 1) {
          // condition to limit actionable concepts
          const subjectIndex = this.subjects.map(element => element.id)
            .indexOf(this.conceptsSelected[0].subjectId);

          const subject = {
            id: 0,
            summary: '',
            concepts: [],
          };
          // [CAUTION] using .push() for .concepts will introduce binding between them...
          // ...even after JSON .parse & .stringify
          // [CAUTION] the copied concept is binded to the originally selected concept; this is good
          const blanksCount = this.subjects[subjectIndex].concepts[0].id;
          subject.concepts = [this.subjects[subjectIndex]
            .concepts[this.conceptsSelected[0].conceptId - blanksCount]];

          // create kinship between subjects for better deletion control
          // each array element is 1 kinship with 1 parent concept and multiple kids subject
          const subjectKin = {
            parentId: {},
            kids: [],
          };
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
          this.subjectRelationsStore();
          // TODO: jump to new subject
          // console.log(this.subjects);
          this.popupCloseHandler();
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
.popupCSSCM {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  z-index: 999;
  .popupinputCSSCM{
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
  .popupfieldsCSSCM{
    overflow:scroll;
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
}
</style>
