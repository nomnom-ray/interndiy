<template>
  <div>
    {{qualificationId}}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      qualificationId: '',
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
    detailsGet() {
      // TODO: find qualification in qualifications using qualificationId
    },
    detailsCreate() {
      this.qualificationsAdd(this.qualificationId);
    },
  },
  mounted() {
    // console.log(this.$root.$mp.query.id);
    this.qualificationId = this.$root.$mp.query.id;
    // TODO: compare id to length to see whether it's a new quality
    this.detailsGet();
    this.detailsCreate();
  },
};
</script>


<style lang="scss" scoped>
</style>
