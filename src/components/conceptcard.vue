<template>
  <div 
    class='card'
    :class='{red: conceptIsClicked}'
    @click='handlerCardClicked(propConcept.id)'
  >
    CARD: {{ propConcept.id }}
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['propConcept'],
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
      handlerCardClicked(idClicked) {
        if (!this.conceptIsClicked) {
          if (this.conceptsSelected.length < 2) {
            this.conceptIsClicked = true;
            this.conceptsSelect(idClicked);
          }
        } else {
          this.conceptIsClicked = false;
          // delete it from array if the same card is clicked again
          const index = this.conceptsSelected.indexOf(idClicked);
          this.conceptsDeselect(index);
        }
      },
    },
    computed: {
      ...mapGetters({
        conceptsSelected: 'conceptsSelected',
      }),
    },
  };

</script>

<style lang="scss" scoped>
  .card {
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
