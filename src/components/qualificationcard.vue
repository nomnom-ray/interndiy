<template>
  <a :href="detailURL">
    <div>
      propQualification: {{propQualification.title}}
    </div>
  </a>
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
    detailURL() {
      return `/pages/qualificationdetail/main?id=${this.propQualification.id}`;
    },
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
