<template>
  <div 
    class='containerCSSCC'
    :class="conceptIsClicked ? 'card_clicked_CSSCC' : 'card_unclicked_CSSCC'"
  >
    <div :class="arrowLeftShow ? 'arrowrightliteCSSCC' : 'arrowrightCSSCC'" v-if='arrowRightShow'></div>
    <div class='arrowleftCSSCC' v-if='arrowLeftShow'></div>
    <div :class="arrowLeftShow ? 'arrowbottomliteCSSCC' : 'arrowbottomCSSCC'" v-if='arrowBottomShow'></div>
    <div class='arrowtopCSSCC' v-if='arrowTopShow'></div>
    <button
      v-if="conceptIsClicked"
      class='button_subject_CSSCC'
      :disabled="topAddDisable | resultBottomDisable"
      @click="subjectHandle"
    >{{ (topAddDisable | resultBottomDisable) ? 'Disabled' : 'Create new subject' }}
    </button>
    <button
      v-if="conceptIsClicked"
      class='button_top_CSSCC'
      :disabled='topAddDisable'
      @click="topHandle"
    >{{ topAddDisable ? 'Disabled' : 'Add a step above' }}
    </button>
    <button
      v-if="conceptIsClicked"
      class='button_question_CSSCC'
      @click='questionTextShow = !questionTextShow'
    >{{ questionTextShow ? 'Edit / view description' : 'Edit / view context'}}
    </button>
    <div 
      class='cardCSSCC'
      :class="arrowLeftShow ? 'card_copy_CSSCC' : 'card_noncopy_CSSCC'"
      :style="conceptIsClicked ? 'position:absolute;top:0;bottom:0;right:0;left:0' : ''"
      @click='cardClicked(propConcept.id, propSubject, propSubjectIndex)'
    >
        <div class='questionCSSCC' v-if="propConcept.question !== '' && !conceptIsClicked"><span class='title_CSSCC'>Context: </span>{{propConcept.question}}</div>
        <div v-if='arrowLeftShow' style='font-weight:bold;text-align:center;color:grey;padding: 6rpx 0 0 0'>Non-editable copy from parent</div>
        <div
          class='descriptionCSSCC'
          :style="propConcept.description === '' ? 'color:grey;text-align:center; font-size: 110%;' : ''"
          v-if="!conceptIsClicked"
        >
          {{propConcept.description === '' ? 'Tap here to type.' : propConcept.description}}
        </div>
        <div v-else>
          <div v-if='!questionTextShow'>
            <div style='padding:24rpx 0 0 0;text-decoration: underline'>
              Description of this step
            </div>
            <textarea
              class='popup_description_CSSCC'
              v-model='descriptionLocal'
              :maxlength="100"
              auto-height
              cursor-spacing='140'
              auto-focus
              :disabled='arrowLeftShow'
            >
            </textarea>
          </div>
          <div v-else>
            <div style='padding:24rpx 0 0 0;text-decoration: underline'>
              Context of this step
            </div>
            <textarea
              class='popup_description_CSSCC'
              v-model='questionLocal'
              :maxlength="100"
              auto-height
              cursor-spacing='140'
              auto-focus
              :disabled='arrowLeftShow'
            >
            </textarea>
          </div>
        </div>

    </div>
    <button
      v-if="conceptIsClicked"
      class='button_save_CSSCC'
      @click='saveHandle(propConcept.id)'
    >Save / Close
    </button>
    <button
      v-if="conceptIsClicked"
      class='button_bottom_CSSCC'
      :disabled="resultBottomDisable"
      @click="bottomHandle"
    >{{ resultBottomDisable ? 'Disabled' : 'Add a step below' }}
    </button>
    <wux-wing-blank body-style="margin-left:180rpx;margin-right:180rpx">
      <button
        v-if="conceptIsClicked"
        class='button_delete_CSSCC'
        :disabled="resultBottomDisable | triggerTopDisable"
        @click="deleteHandle"
      >{{ (resultBottomDisable | triggerTopDisable) ? 'Disabled' : 'Delete' }}
      </button>
    </wux-wing-blank>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: [
      'propConcept',
      'propSubject',
      'propConceptClickReset',
      'propSubjectRelations',
    ],
    data() {
      return {
        conceptIsClicked: false,
        questionTextShow: false,
        descriptionLocal: '',
        questionLocal: '',
      };
    },
    methods: {
      ...mapActions({
        conceptsSelect: 'conceptsSelect',
        conceptsDeselect: 'conceptsDeselect',
        subjectsUpdate: 'subjectsUpdate',
      }),
      subjectHandle() {
        this.$root.$emit('newSubject');
        this.saveHandle(this.propConcept.id);
      },
      topHandle() {
        this.$root.$emit('addTop');
        this.saveHandle(this.propConcept.id);
      },
      bottomHandle() {
        this.$root.$emit('addBottom');
        this.saveHandle(this.propConcept.id);
      },
      deleteHandle() {
        this.$root.$emit('deleteConcept');
        this.saveHandle(this.propConcept.id);
      },
      cardClicked(idClicked, subjectClicked, subjectIndex) {
        if (subjectIndex === 0 || subjectIndex === 2) {
          return;
        }
        const obj = { conceptId: idClicked, subjectId: subjectClicked };
        if (!this.conceptIsClicked) {
          if (this.conceptsSelected.length < 1) {
            this.conceptIsClicked = true;
            this.conceptsSelect(obj);
            this.descriptionLocal = this.propConcept.description || '';
            this.questionLocal = this.propConcept.question || '';
            this.$root.$emit('conceptPopupShow', true);
          }
        }
      },
      saveHandle(idClicked) {
        this.conceptIsClicked = false;
        this.questionTextShow = false;
        // this.descriptionLocal = '';
        // this.questionLocal = '';
        const index = this.conceptsSelected.map(element => element.conceptId).indexOf(idClicked);
        this.conceptsDeselect(index);
      },
    },
    computed: {
      ...mapGetters({
        subjects: 'subjects',
        conceptsSelected: 'conceptsSelected',
      }),
      arrowBottomShow() {
        // botton arrow is visible when: 1) concept id not last concept in a subject
        if (!this.conceptLast) {
          return true;
        }
        return false;
      },
      arrowTopShow() {
        // top arrow is visible when: 1) concept id is not the first concept in a subject;
        // ...2) does not have index of 0;
        if ((this.conceptLast || this.conceptMid) && !this.conceptFirst) {
          return true;
        }
        return false;
      },
      arrowRightShow() {
        // right arrow is visible when: 1) concept id is a parent; 2) id is of a mid subject
        if (this.conceptParent ||
          (this.conceptFirst && (this.conceptIncludeKid && !this.conceptLastKid))) {
          return true;
        }
        return false;
      },
      arrowLeftShow() {
        // left arrow is visible when: 1) concept id of a last kid; 2) id is of a mid subject
        if (this.conceptFirst && (this.conceptIncludeKid && !this.conceptParent)) {
          return true;
        }
        return false;
      },
      conceptLast() {
        // largest concept ID in any subject: last concept
        if (this.subjects[this.propSubject] && this.propConcept.id >= this.subjects[this.propSubject]
          .concepts[this.subjects[this.propSubject].concepts.length - 1].id) {
          return true;
        }
        return false;
      },
      conceptFirst() {
        // smallest concept ID in any subject: first concept
        // console.log(this.propSubject, 'conceptFirst', this.subjects[this.propSubject]);
        // console.log(this.subjects[this.propSubject].concepts[0].id);
        if (this.subjects[this.propSubject] &&
          this.propConcept.id <= this.subjects[this.propSubject].concepts[0].id) {
          return true;
        }
        return false;
      },
      conceptMid() {
        // in-between concept ID in any subject: mid concept
        if (this.subjects[this.propSubject] && (this.propConcept.id <= this.subjects[this.propSubject]
          .concepts[this.subjects[this.propSubject].concepts.length - 1].id) &&
          (this.propConcept.id >= this.subjects[this.propSubject].concepts[0].id)) {
          return true;
        }
        return false;
      },
      conceptParent() {
        // a parent concept: concept w kids
        const parentRecord = this.propSubjectRelations
          .find(element => element.parentId.subject.id === this.propSubject &&
          element.parentId.concept.id === this.propConcept.id);
        // console.log(this.propSubject, ': ', this.propConcept.id, ': ', this.propSubjectRelations);
        if (parentRecord) {
          return true;
        }
        return false;
      },
      conceptLastKid() {
        // concepts[0] of kid with biggest subject ID = concepts.len: last kid
        // concepts[0] of kid with biggest subject ID < concepts.len: last-kid w concept
        for (let i = 0; i <= this.propSubjectRelations.length - 1; i += 1) {
          if (this.propSubject === this.propSubjectRelations[i].kids[0].id) {
            return true;
          }
        }
        return false;
      },
      conceptIncludeKid() {
        // concepts[0] of kid with non-biggest subject ID < concepts.len: mid-kid w concept
        // concepts[0] of kid with non-biggest subject ID = concepts.len: mid kid
        const kidCheck = this.propSubjectRelations
          .find(kinship => kinship.kids.find(kid => kid.id === this.propSubject));
        if (kidCheck) {
          return true;
        }
        return false;
      },
      topAddDisable() {
        if (this.conceptIsClicked &&
          this.subjects[this.propSubject].concepts) {
          const conceptFirst = this.subjects[this.propSubject].concepts
            .findIndex(element => element.id === this.propConcept.id);
          if (conceptFirst === 0) {
            return true;
          }
        }
        return false;
      },
      resultBottomDisable() {
        if (this.conceptIsClicked &&
          this.subjects[this.propSubject].concepts) {
          const resultIndex = this.subjects[this.propSubject].concepts.length - 1;
          if (this.propSubject === 1 &&
            this.propConcept.id === resultIndex) {
            return true;
          }
        }
        return false;
      },
      triggerTopDisable() {
        if (this.conceptIsClicked &&
          this.subjects[this.propSubject].concepts) {
          if (this.propSubject === 1 && this.propConcept.id === 0) {
            return true;
          }
        }
        return false;
      },
    },
    watch: {
      propConceptClickReset() {
        this.conceptIsClicked = false;
      },
      questionLocal() {
        if (this.conceptIsClicked) {
          const blanksCount = this.subjects[this.propSubject].concepts[0].id;
          this.subjectsUpdate({
            subjectIndex: this.propSubject,
            conceptIndex: this.propConcept.id - blanksCount,
            type: 'question',
            content: this.questionLocal,
          });
        }
      },
      descriptionLocal() {
        if (this.conceptIsClicked) {
          const blanksCount = this.subjects[this.propSubject].concepts[0].id;
          this.subjectsUpdate({
            subjectIndex: this.propSubject,
            conceptIndex: this.propConcept.id - blanksCount,
            type: 'description',
            content: this.descriptionLocal,
          });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .containerCSSCC {
    position: relative;
    width: 290px;
    height: 150px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 12px;
    .card_copy_CSSCC{
      color: grey;
      background: #fafafc;
      border: 2px solid #eff1f7;
    }
    .card_noncopy_CSSCC{
      background: #eff1f7;
    }
    .cardCSSCC {
      width: 100%;
      height: 100%;
      font-size: 85%;
      background-clip: content-box;
      border-radius: 6px;
      .title_CSSCC{
        font-weight: bold;
      }
      .questionCSSCC{
        width: auto;
        max-height: 22px;
        overflow: hidden;
        text-align: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        border-radius: 6px;
        background: rgba(38,68,54,0.2);
        padding: 5px 13px 3px 13px;
      }
      .descriptionCSSCC{
        width: auto;
        max-height: 115px;
        overflow:hidden;
        text-align: justify;
        text-justify: inter-word;
        position: relative;
        padding: 24rpx 20rpx 0px 20rpx;
        white-space: pre-wrap;
      }
      .descriptionCSSCC:before{
        content:'';
        width: 100%;
        height: 100%;
        position:absolute;
        left:0;
        top:0;
        background:linear-gradient(transparent 95px, #eff1f7);
      }
      .description_full_CSSCC{
        width: auto;
        max-height: 140px;
        overflow:hidden;
        text-align: justify;
        text-justify: inter-word;
        position: relative;
        padding: 7px 13px 0px 13px;
        white-space: pre-wrap;
      }
      .description_full_CSSCC:before{
        content:'';
        width: 100%;
        height: 100%;
        position:absolute;
        left:0;
        top:0;
        background:linear-gradient(transparent 120px, #eff1f7);
      }
    }
    .arrowrightCSSCC {
      position: absolute;
      top: 50%;
      width: 100%;
    }
    .arrowrightCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 26px 0 26px 15px;
      border-color: transparent #264436;
      display: block;
      width: 0;
      z-index: 99;
      margin-top: -26px;
      right: -11px;
      top: 50%;
    }
    .arrowrightCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 24px 0 24px 14px;
      border-color: transparent #eff1f7;
      display: block;
      width: 0;
      z-index: 99;
      margin-top: -24px;
      right: -8px;
      top: 50%;
    }

    .arrowrightliteCSSCC {
      position: absolute;
      top: 50%;
      width: 100%;
    }
    .arrowrightliteCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 26px 0 26px 15px;
      border-color: transparent #264436;
      display: block;
      width: 0;
      z-index: 99;
      margin-top: -26px;
      right: -11px;
      top: 50%;
    }
    .arrowrightliteCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 24px 0 24px 14px;
      border-color: transparent #eff1f7;
      display: block;
      width: 0;
      z-index: 99;
      margin-top: -24px;
      right: -8px;
      top: 50%;
    }

    .arrowleftCSSCC {
      position: absolute;
      top: 50%;
      width: 100%;
    }
    .arrowleftCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 26px 0 26px 15px;
      border-color: transparent #264436;
      display: block;
      width: 0;
      z-index: 0;
      margin-top: -26px;
      left: -5px;
      top: 50%;
    }
    .arrowleftCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 24px 0 24px 14px;
      border-color: transparent #fafafc;
      display: block;
      width: 0;
      z-index: 1;
      margin-top: -24px;
      left: -8px;
      top: 50%;
    }

    .arrowbottomCSSCC {
      position: absolute;
      left: 50%;
      height: 100%;
    }
    .arrowbottomCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 26px 0;
      border-color: #264436 transparent;
      display: block;
      width: 0;
      z-index: 99;
      margin-left: -26px;
      bottom: -11px;
      left: 50%;
    }
    .arrowbottomCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 14px 24px 0;
      border-color: #eff1f7 transparent;
      display: block;
      width: 0;
      z-index: 99;
      margin-left: -24px;
      bottom: -8px;
      left: 50%;
    }

    .arrowbottomliteCSSCC {
      position: absolute;
      left: 50%;
      height: 100%;
    }
    .arrowbottomliteCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 26px 0;
      border-color: #264436 transparent;
      display: block;
      width: 0;
      z-index: 99;
      margin-left: -26px;
      bottom: -11px;
      left: 50%;
    }
    .arrowbottomliteCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 14px 24px 0;
      border-color: #eff1f7 transparent;
      display: block;
      width: 0;
      z-index: 99;
      margin-left: -24px;
      bottom: -8px;
      left: 50%;
    }

    .arrowtopCSSCC {
      position: absolute;
      left: 50%;
      height: 100%;
    }
    .arrowtopCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 26px 0;
      border-color: #264436 transparent;
      display: block;
      width: 0;
      z-index: 0;
      margin-left: -26px;
      top: -5px;
      left: 50%;
    }
    .arrowtopCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 14px 24px 0;
      border-color: #fafafc transparent;
      display: block;
      width: 0;
      z-index: 9;
      margin-left: -24px;
      top: -8px;
      left: 50%;
    }
  }
.button_subject_CSSCC{
  background-color: #f4cf6c;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
  top:-240rpx;
}
.button_top_CSSCC{
  background-color: #f4cf6c;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
  top:-230rpx;
}
.button_question_CSSCC{
  background-color: #f4cf6c;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
  top:-220rpx;
}
.button_save_CSSCC{
  background-color: #f4eb6c;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
  top:100rpx;
}
.button_bottom_CSSCC{
  background-color: #f4cf6c;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
  top:110rpx;
}.button_delete_CSSCC{
  background-color: white;
  z-index: 9999;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  // display: inline-block;
  font-size: 28rpx;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
  top:120rpx;
}
.card_clicked_CSSCC{
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
}
.card_unclicked_CSSCC{
  box-shadow: 0 2px 0 rgba(9,45,66,.25);
}
.popup_description_CSSCC{
  width: auto;
  min-height: 100px;
  max-height: 100px;
  text-align: justify;
  text-justify: inter-word;
  padding: 16rpx 20rpx 0px 20rpx;
  // border: 1px solid purple;
}
</style>
