<template>
  <div 
    class='bubbleB bubbleT'
    :class='{red: conceptIsClicked}'
    @click='cardClicked(propConcept.id, propConcept.type, propSubject)'
  >
    {{ propConcept.id }}: {{propConcept.type}}
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['propConcept', 'propSubject', 'propConceptClickReset', 'propSubjectRelations'],
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
      conceptStyleSelect() {
        // smallest concept ID in any subject: first concept
        // largest concept ID in any subject: last concept
        // in-between concept ID in any subject: mid concept
        // a parent concept with an in-between concept ID: mid-concept w kids
        //
        // concepts[0] of kid with biggest subject ID = concepts.len: last kid
        // concepts[0] of kid with non-biggest subject ID = concepts.len: mid kid
        // concepts[0] of kid with non-biggest subject ID < concepts.len: mid-kid w concept
        // concepts[0] of kid with biggest subject ID < concepts.len: last-kid w concept
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
  .cardCSSCC {
    width: 100px;
    height: auto;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
    position: relative;
    background-clip: content-box;
    background-color: rgb(255, 187, 180);
  }
  .red{
    border: 2px solid rgb(190, 0, 165);
  }
  .bubble {
    width: 100px;
    height: 75px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 15px;
    padding: 2px;
    position: relative;
    // background-clip: content-box;
    background-color: rgb(255, 187, 180);
    -webkit-border-radius: 12px;
    -moz-border-radius: 12px;
    border-radius: 12px;
    // border: #343F53 solid 2px;
  }
  .bubble:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 24px 0 24px 14px;
    border-color: transparent rgb(255, 187, 180);
    display: block;
    width: 0;
    z-index: 1;
    margin-top: -24px;
    right: -8px;
    top: 50%;
  }
  .bubble:before {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 26px 0 26px 15px;
    border-color: transparent #343F53;
    display: block;
    width: 0;
    z-index: 0;
    margin-top: -26px;
    right: -11px;
    top: 50%;
  }

  .bubbleB
  {
    width: 100px;
    height: 50px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 15px;
    padding: 2px;
    position: relative;
    background: #FFFFFF;
  }

  .bubbleB:after 
  {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: rgb(212, 12, 12) transparent;
    display: block;
    width: 0;
    z-index: 1;
    margin-left: -15px;
    bottom: -7px;
    left: 50%;
  }

  .bubbleT
  {
    width: 100px;
    height: 50px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 15px;
    padding: 2px;
    position: relative;
    background: #FFFFFF;
  }

  .bubbleT:after 
  {
    content: '';
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 0;
    border-color: rgb(212, 12, 12) transparent;
    display: block;
    width: 0;
    z-index: 1;
    margin-left: -15px;
    top: -7px;
    left: 50%;
  }
</style>
