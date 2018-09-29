<template>
  <div 
    class='containerCSSCC'
  >
    <div :class="arrowLeftShow ? 'arrowrightliteCSSCC' : 'arrowrightCSSCC'" v-if='arrowRightShow'></div>
    <div class='arrowleftCSSCC' v-if='arrowLeftShow'></div>
    <div :class="arrowLeftShow ? 'arrowbottomliteCSSCC' : 'arrowbottomCSSCC'" v-if='arrowBottomShow'></div>
    <div class='arrowtopCSSCC' v-if='arrowTopShow'></div>

    <div 
      class='cardCSSCC'
      :class='{red: conceptIsClicked, conceptChild: arrowLeftShow}'
      @click='cardClicked(propConcept.id, propSubject, propSubjectIndex)'
    >
      {{ propConcept.id }}
    </div>
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
      'propSubjectIndex',
    ],
    data() {
      return {
        conceptIsClicked: false,
      };
    },
    methods: {
      ...mapActions({
        conceptsSelect: 'conceptsSelect',
        conceptsDeselect: 'conceptsDeselect',
      }),
      cardClicked(idClicked, subjectClicked, subjectIndex) {
        if (subjectIndex === 0 || subjectIndex === 2) {
          return;
        }
        const obj = { conceptId: idClicked, subjectId: subjectClicked };
        if (!this.conceptIsClicked) {
          if (this.conceptsSelected.length < 1) {
            this.conceptIsClicked = true;
            this.conceptsSelect(obj);
            this.$root.$emit('conceptPopupShow', true);
          }
        } else {
          this.conceptIsClicked = false;
          // delete it from array if the same card is clicked again
          const index = this.conceptsSelected.map(element => element.conceptId).indexOf(idClicked);
          this.conceptsDeselect(index);
        }
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
    },
    watch: {
      propConceptClickReset() {
        this.conceptIsClicked = false;
      },
    },
  };

</script>

<style lang="scss" scoped>
  .red {
    border: 2px solid rgb(190, 0, 165);
  }
  .conceptChild {
    background-color: grey !important;
    border-color: grey !important;
  }
  .containerCSSCC {
    position: relative;
    width: 150px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 14px;

    .cardCSSCC {
      width: 100%;
      height: 100%;
      background-clip: content-box;
      background-color: rgb(255, 187, 180);
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      border-radius: 12px;
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
      border-color: transparent #343F53;
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
      border-color: transparent rgb(255, 187, 180);
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
      border-color: transparent #343F53;
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
      border-color: transparent grey;
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
      border-color: transparent #343F53;
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
      border-color: transparent rgb(102, 250, 134);
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
      border-color: #343F53 transparent;
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
      border-color: rgb(255, 187, 180) transparent;
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
      border-color: #343F53 transparent;
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
      border-color: grey transparent;
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
      border-color: #343F53 transparent;
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
      border-color: rgb(102, 250, 134) transparent;
      display: block;
      width: 0;
      z-index: 1;
      margin-left: -24px;
      top: -8px;
      left: 50%;
    }
  }
</style>
