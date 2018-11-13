<template>
  <div>
    <wux-white-space />
    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'1. Identify your supervisor (' + evaluatorLocal.length + '/100)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="evaluatorTips = !evaluatorTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-wing-blank size="large">
      <div v-if='evaluatorTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Instruction: </span> your supervisor is whomever that will give you the Outstanding.
        <wux-white-space />
      </div>
    </wux-wing-blank>
    <wux-white-space />

    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="evaluatorLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="evaluatorSaved"
        @click='evaluatorSaved = false'
      >
        {{evaluatorLocal === '' ? 'Tap here to type.' : evaluatorLocal}}
      </div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='evaluatorLocal'
          :maxlength="100"
          auto-height
          cursor-spacing='20'
          auto-focus
        >
        </textarea>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
          <button
            class='button_new_CSSPS'
            @click="evaluatorSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>


    <wux-white-space />
    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'2) Project story (' + projectStoryLocal.length + '/200)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="storyTips = !storyTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-wing-blank size="large">
      <div v-if='storyTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Instruction: </span>Ask your supervisor to describe the project
        and write it in this format (more examples below): we are a marketing team;
        we are 'running a social media campaign' (i.e. your work)
        for the 'advertising department of our dating app' (i.e. user of your work)
        to 'capture 5000 users' (i.e. your goal).
        <wux-white-space />
      </div>
    </wux-wing-blank>
    <wux-white-space />

    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="projectStoryLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="storySaved"
        @click='storySaved = false'
      >
        {{projectStoryLocal === '' ? 'Tap here to type.' : projectStoryLocal}}
      </div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='projectStoryLocal'
          :maxlength="100"
          auto-height
          cursor-spacing='20'
          auto-focus
        >
        </textarea>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
          <button
            class='button_new_CSSPS'
            @click="storySavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>
    <wux-white-space />



    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'3. Objective result (' + objectiveResultLocal.length + '/200)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="resultTips = !resultTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-wing-blank size="large">
      <div v-if='resultTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Instruction: </span>Isolate the evaluation metric.
        <wux-white-space />
      </div>
    </wux-wing-blank>
    <wux-white-space />

    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="objectiveResultLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="resultSaved"
        @click='resultSaved = false'
      >
        {{objectiveResultLocal === '' ? 'Tap here to type.' : objectiveResultLocal}}
      </div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='objectiveResultLocal'
          :maxlength="100"
          auto-height
          cursor-spacing='20'
          auto-focus
        >
        </textarea>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
          <button
            class='button_new_CSSPS'
            @click="resultSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>
    <wux-white-space />

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
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
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
      evaluatorSaved: true,
      evaluatorTips: false,
      storySaved: true,
      storyTips: false,
      resultSaved: true,
      resultTips: false,
    };
  },
  computed: {
    ...mapGetters({
      evaluator: 'evaluator',
      projectStory: 'projectStory',
      objectiveResult: 'objectiveResult',
      pageActive: 'pageActive',
      subjects: 'subjects',
    }),
  },
  methods: {
    ...mapActions({
      projectStoryUpdate: 'projectStoryUpdate',
      evaluatorUpdate: 'evaluatorUpdate',
      objectiveResultUpdate: 'objectiveResultUpdate',
      subjectsUpdate: 'subjectsUpdate',
      pageActiveUpdate: 'pageActiveUpdate',
    }),
    async evaluatorSavedHandle() {
      this.evaluatorSaved = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
    async storySavedHandle() {
      this.storySaved = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
    async resultSavedHandle() {
      this.resultSaved = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
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
.display_CSSPS{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
  white-space: pre-wrap;
}
.text_CSSPS{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
  background: rgba(239, 241, 247, 0.4);
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
  padding: 0 10rpx 0 0;
  margin: 0 auto;
}
.divider_icon_border_CSSPS{
  height: 34px;
  width: 34px;
  border-radius: 34px;
  // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.button_new_CSSPS{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
}
.emptytext_CSSPS{
  color: grey;
}
.instruction_CSSPS{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>
