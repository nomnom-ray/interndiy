<template>
  <div class='containerCSSCC'>
    <div class='arrowrightCSSCC' v-if='conceptArrowRight'></div>
    <div class='arrowleftCSSCC' v-if='conceptArrowLeft'></div>
    <div class='arrowbottomCSSCC' v-if='arrowBottomShow'></div>
    <div class='arrowtopCSSCC' v-if='conceptArrowTop'></div>
    <div 
      class='cardCSSCC'
      :class='{red: conceptIsClicked}'
      @click='cardClicked(propConcept.id, propConcept.type, propSubject)'
    >
      {{ propConcept.id }}: {{propConcept.type}}
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['propConcept', 'propSubject', 'propConceptClickReset', 'propSubjectRelations'],
    data() {
      return {
        conceptArrowLeft: false,
        conceptArrowRight: false,
        conceptArrowTop: false,
        // conceptArrowBottom: false,
      };
    },
    methods: {
      ...mapActions({
        conceptsSelect: 'conceptsSelect',
        conceptsDeselect: 'conceptsDeselect',
      }),
      cardClicked(idClicked, typeClicked, subjectClicked) {
        const obj = { conceptId: idClicked, subjectId: subjectClicked, conceptType: typeClicked };
        if (!this.conceptIsClicked) {
          if (this.conceptsSelected.length < 2) {
            this.conceptIsClicked = true;
            this.conceptsSelect(obj);
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
        // for conceptArrowBottom
        // console.log(this.propConcept.id, this.subjects[this.propSubject]
        //   .concepts[this.subjects[this.propSubject].concepts.length - 1].id);
        if (this.propConcept.id !== this.subjects[this.propSubject]
          .concepts[this.subjects[this.propSubject].concepts.length - 1].id) {
          return true;
        }
        return false;
        // smallest concept ID in any subject: first concept
        // ...BOT arrow
        // in-between concept ID in any subject: mid concept
        // ...TOP, BOT arrow
        // concepts[0] of kid with non-biggest subject ID < concepts.len: mid-kid w concept
        // ...LEFT, BOT, RIGHT arrow
        // concepts[0] of kid with biggest subject ID < concepts.len: last-kid w concept
        // ...LEFT, BOT arrow
        // a parent concept with an in-between concept ID: mid-concept w kids
        // ...TOP, BOT, RIGHT arrow
        // largest concept ID in any subject: last concept
        // ...TOP arrow
        // concepts[0] of kid with biggest subject ID = concepts.len: last kid
        // ...RIGHT arrow
        // concepts[0] of kid with non-biggest subject ID = concepts.len: mid kid
        // ...LEFT, RIGHT arrow
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
  .red{
    border: 2px solid rgb(190, 0, 165);
  }
  .containerCSSCC {
    position: relative;
    z-index: 0;
    width: 150px;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 14px;

    .cardCSSCC {
      width: 100%;
      height: 100%;
      z-index: 1;
      background-clip: content-box;
      background-color: rgb(255, 187, 180);
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      border-radius: 12px;
    }

    .arrowrightCSSCC {
    position: absolute;
    top: 50%;
    z-index: 2;
    width: 100%;
    }
    .arrowrightCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 24px 0 24px 14px;
      border-color: transparent rgb(255, 187, 180);
      display: block;
      width: 0;
      z-index: 3;
      margin-top: -24px;
      right: -8px;
      top: 50%;
    }
    .arrowrightCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 26px 0 26px 15px;
      border-color: transparent #343F53;
      display: block;
      width: 0;
      z-index: 2;
      margin-top: -26px;
      right: -11px;
      top: 50%;
    }

    .arrowleftCSSCC {
    position: absolute;
    top: 50%;
    z-index: 2;
    width: 100%;
    }
    .arrowleftCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 24px 0 24px 14px;
      border-color: transparent rgb(102, 250, 134);
      display: block;
      width: 0;
      z-index: 3;
      margin-top: -24px;
      left: -8px;
      top: 50%;
    }
    .arrowleftCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 26px 0 26px 15px;
      border-color: transparent #343F53;
      display: block;
      width: 0;
      z-index: 2;
      margin-top: -26px;
      left: -5px;
      top: 50%;
    }

    .arrowtopCSSCC {
    position: absolute;
    left: 50%;
    z-index: 2;
    height: 100%;
    }
    .arrowtopCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 14px 24px 0;
      border-color: rgb(102, 250, 134) transparent;
      display: block;
      width: 0;
      z-index: 3;
      margin-left: -24px;
      top: -8px;
      left: 50%;
    }
    .arrowtopCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 26px 0;
      border-color: #343F53 transparent;
      display: block;
      width: 0;
      z-index: 2;
      margin-left: -26px;
      top: -5px;
      left: 50%;
    }

    .arrowbottomCSSCC {
    position: absolute;
    left: 50%;
    z-index: 1;
    height: 100%;
    }
    .arrowbottomCSSCC:after {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 14px 24px 0;
      border-color: rgb(255, 187, 180) transparent;
      display: block;
      width: 0;
      z-index: 4;
      margin-left: -24px;
      bottom: -8px;
      left: 50%;
    }
    .arrowbottomCSSCC:before {
      content: '';
      position: absolute;
      border-style: solid;
      border-width: 15px 26px 0;
      border-color: #343F53 transparent;
      display: block;
      width: 0;
      z-index: 3;
      margin-left: -26px;
      bottom: -11px;
      left: 50%;
    }
  }
</style>
