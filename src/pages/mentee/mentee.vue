<template>
  <div>
    <app-conceptmap></app-conceptmap>
  </div>
</template>

<script>
import Conceptmap from '../../components/conceptmap';

export default {
  components: {
    appConceptmap: Conceptmap,
  },
  created() {
    this.$store.dispatch('subjectsInit');
  },
};
</script>

<style>

</style>
