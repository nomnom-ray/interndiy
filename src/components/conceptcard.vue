<template>
  <div 
    class='cardCSSCC'
    :class='{red: conceptIsClicked}'
    @click='cardClicked(propConcept.id, propConcept.type, propSubject)'
  >
    {{ propConcept.id }}: {{propConcept.type}}
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['propConcept', 'propSubject', 'propConceptClickReset'],
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
        conceptsSelected: 'conceptsSelected',
      }),
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
    border: 1px solid rgb(190, 0, 165);
  }
</style>
