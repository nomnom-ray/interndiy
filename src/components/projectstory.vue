<template>
  <div>
    <wux-divider position="left" :text="'2. Identify your evaluator (' + evaluatorLocal.length + '/100)'" />
    <wux-wing-blank size="large">
      <div class="placeholder_CSSPS">Tip: Zero21 guides you to build rapport with the evaluator of your Outstanding.</div>
      <textarea
        v-if='pageActive === 1'
        class='evaluator_CSSPS'
        v-model='evaluatorLocal'
        :maxlength="100"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" :text="'Project story (' + projectStoryLocal.length + '/200)'" />
    <wux-wing-blank size="large">
      <div class="placeholder_CSSPS">Tip: ask your evaluator to describe the project (follow examples below).</div>
      <textarea
        v-if='pageActive === 1'
        class="story_CSSPS"
        v-model='projectStoryLocal'
        :maxlength="200"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" :text="'Objective result (' + objectiveResultLocal.length + '/200)'" />
    <wux-wing-blank size="large">
      <div class="objective_CSSPS">Tip: note the evaluation metric. It is when your recipient of work has the property of your goal.</div>
      <textarea
        v-if='pageActive === 1'
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
      <div class='info_content_CSSPS'>
        We are a marketing team;
        we are running a social media campaign <span style='font-weight:bold'>(i.e. your work)</span>
        for an online dating app (i.e. your recipient of work)
        to capture 5000 users (i.e. your goal).
      </div>
      
      <div class='info_content_CSSPS'>
        We are a sales team;
        we are building a profolio (i.e. your work)
        of 100 potential clients (i.e. your goal)
        to validate our business strategy (i.e. your recipient of work).
      </div>

      <div class='info_content_CSSPS'>
        We are an engineering team;
        we are upgrading the electronics (i.e. your work)
        on our solar-charger product (i.e. your recipient of work)
        to a new generation of components (i.e. your goal).
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
      projectStoryLocal: '',
      evaluatorLocal: '',
      objectiveResultLocal: '',
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
  padding: 2px 0 4px 0;
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>
