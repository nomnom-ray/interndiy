<template>
  <div>
    <wux-white-space />
    <wux-divider position="left" :text="'1. Your career narrative (' + narrativeMore.length + '/400)'" />
    <wux-wing-blank size="large">
      <textarea
        class="narrative_CSSQ"
        v-model='narrativeMoreGETSET'
        :maxlength="400"
        placeholder="Write your career narrative with respect to your job title. We'll help you to find out whether this career path is for you."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" :text="'2. Name of evaluator (' + evaluator.length + '/200)'" />
    <wux-wing-blank size="large">
      <textarea
        class='evaluator_CSSQ'
        v-model='evaluatorGETSET'
        :maxlength="200"
        placeholder="Find out early the mentor responsible for your evaluation."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" :text="'3. Temporary concerns (' + concerns.length + '/200)'" />
    <wux-wing-blank size="large">
      <textarea
      class='concerns_CSSQ'
      v-model='concernsGETSET'
      :maxlength="200"
      placeholder="Create and resolve as quickly as possible throughout the course of the co-op term. e.g. '1) First item of concern...'"
      >
      </textarea>
    </wux-wing-blank>

    <app-qualification-card
      :key='qualificationIndex'
      v-for='(qualification, qualificationIndex) in qualifications'
      :propQualification='qualification'
      :propQualificationIndex='qualificationIndex'
    >
    </app-qualification-card>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSTD'
        @click='qualificationAdd'
      >Add qualification
      </button>
    </wux-wing-blank>
    <wux-white-space />
    <div class='info_icon_CSSQ'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank size="large">
      <div class='info_content_CSSQ'>Co-op is for refining your career narrative; Zero21-Intern is here to guide you.</div>
      <div class='info_content_CSSQ'>Achieve an Outstanding for the next co-op placement that optimally aligns with your narrative. </div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
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
      narrativeMore: 'narrativeMore',
      evaluator: 'evaluator',
      concerns: 'concerns',
    }),
    narrativeMoreGETSET: {
      get() {
        return this.narrativeMore;
      },
      set(narrativeMore) {
        return this.narrativeMoreUpdate(narrativeMore);
      },
    },
    evaluatorGETSET: {
      get() {
        return this.evaluator;
      },
      set(evaluator) {
        return this.evaluatorUpdate(evaluator);
      },
    },
    concernsGETSET: {
      get() {
        return this.concerns;
      },
      set(concerns) {
        return this.concernsUpdate(concerns);
      },
    },
  },
  methods: {
    ...mapActions({
      qualificationsAdd: 'qualificationsAdd',
      qualificationsDel: 'qualificationsDel',
      qualificationsCountAdd: 'qualificationsCountAdd',
      qualificationsCountDel: 'qualificationsCountDel',
      qualificationUpdate: 'qualificationUpdate',
      narrativeMoreUpdate: 'narrativeMoreUpdate',
      evaluatorUpdate: 'evaluatorUpdate',
      concernsUpdate: 'concernsUpdate',
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
      key: 'NARRATIVEMORE',
      success(res) {
        that.narrativeMoreUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'EVALUATOR',
      success(res) {
        that.evaluatorUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'CONCERNS',
      success(res) {
        that.concernsUpdate(res.data);
      },
    });
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
.info_icon_CSSQ{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSQ{
  padding: 2px 0 3px 0;
  width: 100%;
  text-align: center;
  font-size: 80%;
}
.narrative_CSSQ{
  width: 100%;
  height: 50px;
  overflow:scroll;
  font-size: 80%;
}
.evaluator_CSSQ{
  width: 100%;
  height: 50px;
  overflow:scroll;
  font-size: 80%;
}
.concerns_CSSQ{
  width: 100%;
  height: 50px;
  overflow:scroll;
  font-size: 80%;
}
.button_new_CSSTD{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
</style>
