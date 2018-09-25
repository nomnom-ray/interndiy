<template>
  <div>
    <input 
      class="qualfieldsCSSQD"
      v-model='qualificationDetail.title'
      :maxlength="200"
      placeholder="Qualification Title"
    >
    <input
      class="qualfieldsCSSQD"
      v-model='qualificationDetail.description'
      :maxlength="200"
      placeholder="Qualification Description"
    >
    <van-button
      type='default'
      @click='qualificationSave'
    >Save
    </van-button>
    <van-button
      type='default'
      @click='qualificationDelete'
    >delete
    </van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      qualificationDetail: {
        id: '',
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      qualifications: 'qualifications',
      qualificationsCount: 'qualificationsCount',
    }),
    // jobTitleGETSET: {
    //   get() {
    //     return this.jobTitle;
    //   },
    //   set(jobTitle) {
    //     return this.jobTitleUpdate(jobTitle);
    //   },
    // },
    // qualDescriptionGETSET: {
    //   get() {
    //     return this.organizationName;
    //   },
    //   set(organizationName) {
    //     return this.organizationNameUpdate(organizationName);
    //   },
    // },
  },
  methods: {
    ...mapActions({
      qualificationsAdd: 'qualificationsAdd',
      qualificationsDel: 'qualificationsDel',
      qualificationsCountAdd: 'qualificationsCountAdd',
      qualificationsCountDel: 'qualificationsCountDel',
    }),
    qualificationSave() {
      const qualification = { ...this.qualificationDetail };
      this.qualificationsAdd(qualification);
      this.qualificationsCountAdd(1);
    },
    qualificationDelete() {
      this.qualificationsDel(this.qualificationDetail.id);
      // TODO: for loop to reassign id
      this.qualificationsCountDel();
    },
  },
  mounted() {
    // console.log(this.$root.$mp.query.id);
    this.qualificationDetail.id = this.$root.$mp.query.id;
    // TODO: find qualification in qualifications using qualificationId
    // TODO: compare id to length to see whether it's a new quality
  },
};
</script>


<style lang="scss" scoped>
  .qualfieldsCSSQD {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);
    padding: 50rpx;
  }
</style>
