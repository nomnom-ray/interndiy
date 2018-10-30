<template>
  <div>
    <wux-divider position="left" :text="'1. Your career narrative (' + narrativeMore.length + '/400)'" />
      <wux-wing-blank size="large">
        <textarea
          v-model='narrativeMoreGETSET'
          :maxlength="400"
          placeholder="Career Narrative"
        >
        </textarea>
      </wux-wing-blank>

    <wux-divider position="left" :text="'1. Your career narrative (' + narrativeMore.length + '/200)'" />
      <wux-wing-blank size="large">
        <textarea
          v-model='jobLocationGETSET'
          :maxlength="200"
          placeholder="your evaluator"
        >
        </textarea>
      </wux-wing-blank>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      narrativeMore: 'narrativeMore',
      jobLocation: 'jobLocation',
    }),
    narrativeMoreGETSET: {
      get() {
        return this.narrativeMore;
      },
      set(narrativeMore) {
        return this.narrativeMoreUpdate(narrativeMore);
      },
    },
    jobLocationGETSET: {
      get() {
        return this.jobLocation;
      },
      set(jobLocation) {
        return this.jobLocationUpdate(jobLocation);
      },
    },
  },
  methods: {
    ...mapActions({
      narrativeMoreUpdate: 'narrativeMoreUpdate',
      jobLocationUpdate: 'jobLocationUpdate',
    }),
  },
  created() {
    const that = this;
    wx.getStorage({
      key: 'NARRATIVEMORE',
      success(res) {
        that.narrativeMoreUpdate(res.data);
      },
    });
    wx.getStorage({
      key: 'JOBLOCATION',
      success(res) {
        that.jobLocationUpdate(res.data);
      },
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
