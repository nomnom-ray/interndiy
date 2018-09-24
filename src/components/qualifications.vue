<template>
  <div>
    <app-qualification-card
      :key='qualificationIndex'
      v-for='(qualification, qualificationIndex) in qualifications'
      :propQualification='qualification'
    >
    </app-qualification-card>
    <van-button
      type='default'
      @click='qualificationAdd'
    >add qualification
    </van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QualificationCard from './qualificationcard';

export default {
  components: {
    appQualificationCard: QualificationCard,
  },
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
    qualificationAdd() {
      const qualificationId = this.qualifications.length;
      wx.navigateTo({
        url: `/pages/qualificationdetail/main?id=${qualificationId}`,
      });
    },
  },
  mounted() {
    // const that = this;
    // wx.getStorage({
    //   key: 'QUALIFICATIONS',
    //   success(res) {
    //     // TODO: can't push all the time cuz array will contain arrays
    //     that.qualificationsAdd(JSON.parse(res.data));
    //   },
    // });
  },
};
</script>

<style lang="scss" scoped>
</style>
