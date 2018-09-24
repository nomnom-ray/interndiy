<template>
  <!-- provide link to details -->
  <div>
    propQualification: {{propQualification}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['propQualification'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      qualifications: 'qualifications',
    }),
  },
  methods: {
    ...mapActions({
      qualificationsAdd: 'qualificationsAdd',
      qualificationsDel: 'qualificationsDel',
    }),
  },
};
</script>


<style lang="scss" scoped>
</style>
