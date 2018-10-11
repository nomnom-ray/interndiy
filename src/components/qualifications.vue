<template>
  <div class="containerCSSQ">
    <div
      v-if='!qualifications.length'
    >
    when there are no qualification, show instruction.
    </div>
    <icon
      v-if='!qualifications.length'
      type="info"
      size="40"
      color='rbg(0, 255, 255)'/>
    <app-qualification-card
      :key='qualificationIndex'
      v-for='(qualification, qualificationIndex) in qualifications'
      :propQualification='qualification'
      :propQualificationIndex='qualificationIndex'
    >
    </app-qualification-card>
    <wux-floating-button 
      position="bottomRight"
      theme="assertive"
      :actionRotate="false"
      @change="qualificationAdd" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import QualificationCard from './qualificationcard';

export default {
  components: {
    appQualificationCard: QualificationCard,
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
      qualificationUpdate: 'qualificationUpdate',
    }),
    qualificationAdd() {
      // new qualification is always the last element
      const qualificationId = this.qualifications.length;
      wx.navigateTo({
        url: `/pages/qualificationdetail/main?id=${qualificationId}`,
      });
    },
  },
  created() {
    // on start up, localstorage data populates vuex states
    const that = this;
    wx.getStorage({
      key: 'QUALIFICATIONSCOUNT',
      success(resCount) {
        // QUALIFICATIONSCOUNT must be gotten first for async to work
        that.qualificationsCountAdd(resCount.data);
        for (let i = 0; i <= that.qualificationsCount - 1; i += 1) {
          // add a new object to qualifications array before updating object values
          // this is faster than adding new properties
          // this const must be consistent with 'qualificationdetail' mounted
          const qualificationDetail = {
            title: '',
            description: '',
            descriptionValid: false,
            taskList: [],
          };
          that.qualificationsAdd(qualificationDetail);
          // update empty objects with value
          // the advantage of indivually stored elements is 1) faster;...
          // ...2) adding new properties to object will not break between object versions
          wx.getStorage({
            key: `QUALIFICATIONS_${i}_TITLE`,
            success(resQual) {
              that.qualificationUpdate({ index: i, type: 'title', content: resQual.data });
            },
          });
          wx.getStorage({
            key: `QUALIFICATIONS_${i}_DESCRIPTION`,
            success(resQual) {
              that.qualificationUpdate({ index: i, type: 'description', content: resQual.data });
            },
          });
          wx.getStorage({
            key: `QUALIFICATIONS_${i}_DESCRIPTIONVALID`,
            success(resQual) {
              that.qualificationUpdate({ index: i, type: 'descriptionValid', content: resQual.data });
            },
          });
          wx.getStorage({
            key: `QUALIFICATIONS_${i}_TASKLIST`,
            success(resQual) {
              that.qualificationUpdate({ index: i, type: 'taskListSet', content: resQual.data });
            },
          });
          wx.getStorage({
            key: `QUALIFICATIONS_${i}_JUSTIFICATION`,
            success(resQual) {
              that.qualificationUpdate({ index: i, type: 'justification', content: resQual.data });
            },
          });
        }
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.containerCSSQ{
  text-align: center;
  .buttonCSSQ{
    padding: 5px;
  }
}
</style>
