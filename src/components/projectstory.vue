<template>
  <div>
    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'1. Identify your evaluator (' + evaluatorLocal.length + '/100)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <div class='divider_icon_border_CSSPS'>
          <wux-popover placement="bottomRight" title="Instruction" body-style="width:600rpx;" content="Zero21 guides you to build rapport with the evaluator of your Outstanding.">
            <icon
              type="info"
              size="32"
              color='rgba(244,207,108,0.8)'
            />
          </wux-popover>
        </div>
      </div>
    </div>

    <wux-wing-blank size="large">
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
        1) We are a marketing team;
        we<span style='background:rgba(227,229,238,0.8)'> are running a social media campaign (i.e. your work)</span>
        <span style='background:rgba(244,207,108,0.4)'> for an online dating app (i.e. your recipient of work)</span>
        <span style='background:rgba(54,147,104,0.2)'> to capture 5000 users (i.e. your goal)</span>.
      </div>
      
      <div class='info_content_CSSPS'>
        2) We are a sales team;
        we are *building a profolio (i.e. your work)*
        of *100 potential clients (i.e. your goal)*
        to *validate our business strategy (i.e. your recipient of work)*.
      </div>

      <div class='info_content_CSSPS'>
        3) We are an engineering team;
        we are "upgrading the electronics" (i.e. your work)
        on "our solar-charger product" (i.e. your recipient of work)
        to "a new generation of components" (i.e. your goal).
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
  padding: 2px 0 10rpx 0;
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
}
.divider_icon_CSSPS{
  display: table-cell;
  vertical-align: middle;
  margin: 0 auto;
}
.divider_icon_border_CSSPS{
  height: 38px;
  width: 38px;
  border-radius: 38px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
</style>
