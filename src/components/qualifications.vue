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
      qualificationsCount: 'qualificationsCount',
    }),
  },
  methods: {
    ...mapActions({
      qualificationsAdd: 'qualificationsAdd',
      qualificationsDel: 'qualificationsDel',
      qualificationsCountAdd: 'qualificationsCountAdd',
      qualificationsCountDel: 'qualificationsCountDel',
    }),
    qualificationAdd() {
      const qualificationId = this.qualifications.length;
      wx.navigateTo({
        url: `/pages/qualificationdetail/main?id=${qualificationId}`,
      });
    },
  },
  mounted() {
    const that = this;
    wx.getStorage({
      key: 'QUALIFICATIONSCOUNT',
      success(resCount) {
        that.qualificationsCountAdd(resCount.data);
        for (let i = 0; i <= that.qualificationsCount - 1; i += 1) {
          wx.getStorage({
            key: `QUALIFICATIONS_${i}`,
            success(resQual) {
              that.qualificationsAdd(JSON.parse(resQual.data));
            },
          });
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
