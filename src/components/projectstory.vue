<template>
  <div>
    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'1. Identify your supervisor (' + evaluatorLocal.length + '/100)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <div class='divider_icon_border_CSSPS'>
          <wux-popover placement="leftTop" title="Instruction: identify your supervisor" body-style="width:600rpx;" content="your supervisor is whomever that will give you the Outstanding.">
            <icon
              @click='evaluatorHide = !evaluatorHide'
              type="info"
              size="34"
              color='rgba(244,207,108,0.8)'
            />
          </wux-popover>
        </div>
      </div>
    </div>

    <wux-wing-blank size="large">
      <textarea
        v-if='pageActive === 1 && !evaluatorHide && !projectStoryHide && !objectiveResultHide'
        class='evaluator_CSSPS'
        v-model='evaluatorLocal'
        :maxlength="100"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'Project story (' + projectStoryLocal.length + '/200)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <div class='divider_icon_border_CSSPS'>
          <wux-popover placement="leftTop" title="Instruction: project story" body-style="width:600rpx;" content="Ask your supervisor to describe the project and write it in this format (more examples below): we are a marketing team; we are 'running a social media campaign' (i.e. your work) for the 'advertising department of our dating app' (i.e. user of your work) to 'capture 5000 users' (i.e. your goal).">
            <icon
              @click='projectStoryHide = !projectStoryHide'
              type="info"
              size="34"
              color='rgba(244,207,108,0.8)'
            />
          </wux-popover>
        </div>
      </div>
    </div>

    <wux-wing-blank size="large">
      <textarea
        v-if='pageActive === 1 && !evaluatorHide && !projectStoryHide && !objectiveResultHide'
        class="story_CSSPS"
        v-model='projectStoryLocal'
        :maxlength="200"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'3. Objective result (' + objectiveResultLocal.length + '/200)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <div class='divider_icon_border_CSSPS'>
          <wux-popover placement="leftTop" title="Instruction: objective result" body-style="width:600rpx;" content="Isolate the evaluation metric.">
            <icon
              @click='objectiveResultHide = !objectiveResultHide'
              type="info"
              size="34"
              color='rgba(244,207,108,0.8)'
            />
          </wux-popover>
        </div>
      </div>
    </div>

    <wux-wing-blank size="large">
      <textarea
        v-if='pageActive === 1 && !evaluatorHide && !projectStoryHide && !objectiveResultHide'
        class="objective_CSSPS"
        v-model='objectiveResultLocal'
        :maxlength="200"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" text="Examples of a project story" />
    <wux-wing-blank body-style="margin-left:25px;margin-right:25px">
      <!-- <div class='info_content_CSSPS'>
        1) We are a marketing team;
        we are "running a social media campaign" (i.e. your work)
        for the "advertising department of our dating app" (i.e. user of your work)
        to "capture 5000 users" (i.e. your goal).
      </div> -->
      
      <div class='info_content_CSSPS'>
        Example 1. We are a sales team;
        we are "building a profolio" (i.e. your work)
        of "100 potential clients" (i.e. your goal)
        to "validate our business strategy for the CEO" (i.e. user of your work).
      </div>

      <div class='info_content_CSSPS'>
        Example 2. We are an engineering team;
        we are "upgrading the electronics" (i.e. your work)
        to "a new generation of components" (i.e. your goal)
        to let "customers charge faster on our solar-charger product" (i.e. user of your work).
      </div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      evaluatorLocal: '',
      projectStoryLocal: '',
      objectiveResultLocal: '',
      evaluatorHide: false,
      projectStoryHide: false,
      objectiveResultHide: false,
    };
  },
  computed: {
    ...mapGetters({
      projectStory: 'projectStory',
      pageActive: 'pageActive',
      evaluator: 'evaluator',
      objectiveResult: 'objectiveResult',
      subjects: 'subjects',
    }),
  },
  methods: {
    ...mapActions({
      projectStoryUpdate: 'projectStoryUpdate',
      evaluatorUpdate: 'evaluatorUpdate',
      objectiveResultUpdate: 'objectiveResultUpdate',
      subjectsUpdate: 'subjectsUpdate',
    }),
  },
  watch: {
    projectStoryLocal() {
      this.projectStoryUpdate(this.projectStoryLocal);
    },
    evaluatorLocal() {
      this.evaluatorUpdate(this.evaluatorLocal);
    },
    objectiveResultLocal() {
      this.objectiveResultUpdate(this.objectiveResultLocal);
      if (this.subjects[1]) {
        this.subjectsUpdate({
          subjectIndex: 1,
          conceptIndex: this.subjects[1].concepts.length - 1,
          type: 'description',
          content: this.objectiveResultLocal,
        });
        if (this.subjects[1].concepts[this.subjects[1].concepts.length - 1].question === '') {
          this.subjectsUpdate({
            subjectIndex: 1,
            conceptIndex: this.subjects[1].concepts.length - 1,
            type: 'question',
            content: 'What is the behavior when the objective is met?',
          });
        }
      }
    },
  },
  created() {
    const that = this;
    wx.getStorage({
      key: 'PROJECTSTORY',
      success(res) {
        that.projectStoryUpdate(res.data);
        that.projectStoryLocal = that.projectStory || '';
      },
    });
    wx.getStorage({
      key: 'EVALUATOR',
      success(res) {
        that.evaluatorUpdate(res.data);
        that.evaluatorLocal = that.evaluator || '';
      },
    });
    wx.getStorage({
      key: 'OBJECTIVERESULT',
      success(res) {
        that.objectiveResultUpdate(res.data);
        that.objectiveResultLocal = that.objectiveResult || '';
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.placeholder_CSSPS{
  width: 100%;
  text-align: left;
  font-size: 85%;
  margin-bottom: 16rpx;
}
.evaluator_CSSPS{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
}
.story_CSSPS{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
}
.objective_CSSPS{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
}
.info_content_CSSPS{
  padding: 2px 0 16rpx 0;
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
.divider_container_CSSPS{
  width: 100%;
  display: table;
}
.divider_content_CSSPS{
  display: table-cell;
  width: 85%;
}
.divider_icon_CSSPS{
  display: table-cell;
  vertical-align: middle;
  width: 15%;
  margin: 0 auto;
}
.divider_icon_border_CSSPS{
  height: 34px;
  width: 34px;
  border-radius: 34px;
  // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
</style>
