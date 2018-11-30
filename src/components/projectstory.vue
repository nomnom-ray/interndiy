<template>
  <div>
    <wux-white-space />
    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'1. Identify the supervisor (' + evaluatorLocal.length + '/100)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="evaluatorTips = !evaluatorTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-white-space />
      <div v-if='evaluatorTips' @click="evaluatorTips = false" class='instruction_CSSPS'>
        <wux-wing-blank size="large">
          <span style='font-weight:bold'>Info: </span> your supervisor is whomever that will give you the term evaluation.
        </wux-wing-blank>
      </div>
    <wux-white-space v-if='evaluatorTips' />
    <wux-white-space v-if='evaluatorTips' />
    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="evaluatorLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="evaluatorSaved"
        @click='evaluatorSaved = false'
      >{{evaluatorLocal === '' ? 'Tap here to type.' : evaluatorLocal}}
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />          
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
        <wux-divider position="left" text="2. Ask for a project story" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="storyTips = !storyTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-white-space />
    <div v-if="storyTips" @click="storyTips = false" class='instruction_CSSPS'>
      <wux-wing-blank size="large">
        <span style='font-weight:bold'>Info: </span>
        Make sure you are not confined to only co-op responsibilities.
        Ask your supervisor to describe your job like a full-time member of the team:
        <wux-white-space />
        <div style='color:grey;'>
          <div style='padding: 0 0 8rpx 0'>
            We are <span style='border-bottom: 1px solid grey'>a design team</span> (i.e. your role).
          </div>
          <div style='padding: 0 0 8rpx 0'>
            we are <span style='border-bottom: 1px solid grey'>creating a co-op assistance app</span> (i.e. your work)
            to <span style='border-bottom: 1px solid grey'>reduce the amount of online tutorials</span> (i.e. your goal).
          </div>
          <div style='padding: 0 0 8rpx 0'>
            When the goal is reached, <span style='border-bottom: 1px solid grey'>the student support team</span> (i.e. your stakeholder)
            of <span style='border-bottom: 1px solid grey'>The Zero21 Inc.</span> (i.e. existing offering)
            will <span style='border-bottom: 1px solid grey'>assist more students</span> (i.e. value of your work).
          </div>
        </div>
      </wux-wing-blank>
    </div>
    <wux-white-space v-if="storyTips" />
    <wux-white-space v-if="storyTips" />
    <div class="title_container_CSSPS">
      Your story
    </div>
    <wux-white-space />
    <wux-wing-blank size="large">
      <div
        class='yourstory_CSSPS'
        @click='storySaved = false'
      >
        <div v-if="(storySaved & storyRoleLocal === '' & storyWorkLocal === '' & storyGoalLocal === '' & storyUserLocal === '' & storySystemLocal === '' & storyValueLocal === '')" class='emptytext_CSSPS' style='width:100%;border-top: 1px solid #eff1f7;padding: 10rpx 0 60rpx 0;'>
          Tap here to type.
        </div>
        <div v-else>
          <div style='padding: 0 0 8rpx 0'>
            <span v-if="storyRoleLocal !== ''">We are {{storyRoleLocal}}.</span>
          </div>
          <div style='padding: 0 0 8rpx 0'>
            <span v-if="storyWorkLocal !== ''">we are {{storyWorkLocal}} </span>
            <span v-if="storyGoalLocal !== ''">to {{storyGoalLocal}}.</span>
          </div>
          <div style='padding: 0 0 8rpx 0'>
            <span v-if="storyUserLocal !== ''">When the goal is reached, {{storyUserLocal}} </span>
            <span v-if="storySystemLocal !== ''">of {{storySystemLocal}} </span>
            <span v-if="storyValueLocal !== ''">will {{storyValueLocal}}.</span>
          </div>
          <wux-white-space />
        </div>
      </div>
    </wux-wing-blank>

    <div v-if="!storySaved">
      <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
        <button
          class='button_new_CSSPS'
          @click="storySavedHandle"
        >Confirm your story
        </button>
      </wux-wing-blank>
      <wux-white-space />
      <wux-white-space />
      <wux-wing-blank size="large">
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Role
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storyRoleLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storyRoleLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Work
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storyWorkLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storyWorkLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Goal
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storyGoalLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storyGoalLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            User
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storyUserLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storyUserLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Existing offering
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storySystemLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storySystemLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Value
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='storyValueLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='storyValueLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
      </wux-wing-blank>
    </div>  
    <wux-white-space />

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <!-- <wux-divider position="left" :text="'3. Understand the targeted behavior (' + objectiveResultLocal.length + '/300)'" /> -->
        <wux-divider position="left" text="3. Empathize with your user" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="resultTips = !resultTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-white-space />
    <div v-if='resultTips' @click="resultTips = false" class='instruction_CSSPS'>
      <wux-wing-blank size="large">
        <span style='font-weight:bold'>Info: </span>like the underlined example, the planned offering is the existing offering including your goal:
        <wux-white-space />
        <div style='color:grey;'>
        Due to <span style='text-decoration: underline;'>The Zero21 Inc. with reduced online tutorials</span> (i.e. the planned offering),
        the student support team can assist more students.
        </div>
      </wux-wing-blank>
    </div>
    <wux-white-space v-if='resultTips' />
    <wux-white-space v-if='resultTips' />
    <div class="title_container_CSSPS">
      User story
    </div>
    <wux-white-space />
      <div
        class='yourstory_CSSPS'
        @click='resultSaved = false'
      >
        <wux-wing-blank size="large">
        <div v-if="resultSaved & (storyValueLocal === '' | storyUserLocal === '' | objectiveResultLocal === '')" class='emptytext_CSSPS' style='width:100%;border-top: 1px solid #eff1f7;padding: 10rpx 0 60rpx 0;'>
          Tap here to type.
        </div>
        <divz v-else>
          <span v-if="objectiveResultLocal !== ''">Due to {{objectiveResultLocal}}, </span>
          <span v-if="storyUserLocal !== '' & objectiveResultLocal !== ''">{{storyUserLocal}} </span>
          <span v-if="storyValueLocal !== '' & objectiveResultLocal !== ''">can {{storyValueLocal}}.</span>
          <wux-white-space />
        </divz>
        <wux-white-space />
        </wux-wing-blank>
      </div>
    <div v-if='!resultSaved'>
      <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
        <button
          class='button_new_CSSPS'
          @click="resultSavedHandle"
        >Confirm user story
        </button>
      </wux-wing-blank>
      <wux-white-space />
      <wux-white-space />
      <wux-wing-blank size="large">
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Planned offering
          </div>
          <div class='input_text_CSSPS'>
            <textarea
              class='input_CSSPS'
              v-model='objectiveResultLocal'
              :maxlength="200"
              auto-height
              cursor-spacing='20'
              placeholder='Tap here to type.'
            >
            </textarea>
            <!-- <input
              class='input_CSSPS'
              v-model='objectiveResultLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            /> -->
          </div>
        </div>
        <wux-white-space />
      </wux-wing-blank>
    </div>  

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'4. Imagine the planned offering (' + triggerLocal.length + '/300)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="triggerTips = !triggerTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-white-space />
    <div v-if='triggerTips' @click="triggerTips = false" class='instruction_CSSPS'>
      <wux-wing-blank size="large">
        <span style='font-weight:bold'>Info: </span> ask your supervisor to describe,
        <span style='border-bottom: 1px solid grey'>in steps,</span>
        how the planned offering delivers value to the user. Write the first step here:
        <wux-white-space />
        <div style='color:grey'>
          A student opens up the Zero21 Co-op Guide app.
        </div>
      </wux-wing-blank>
    </div>
    <wux-white-space v-if='triggerTips' />
    <wux-white-space v-if='triggerTips' />
    <div class="title_container_CSSPS">
      Offering story (first step)
    </div>
    <wux-white-space />
    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="triggerLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="triggerSaved"
        @click='triggerSaved = false'
      >{{triggerLocal === '' ? 'Tap here to type.' : triggerLocal}}
      <wux-white-space />
      <wux-white-space />
      <wux-white-space />
      </div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='triggerLocal'
          :maxlength="300"
          auto-height
          cursor-spacing='20'
          auto-focus
        >
        </textarea>
        <wux-white-space />
        <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
          <button
            class='button_new_CSSPS'
            @click="triggerSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>

    <!-- <wux-divider position="left" text="Examples of a project story" />
    <wux-wing-blank size="large">
      <div class='info_content_CSSPS'>
        Example 1. We are a student support team (i.e. your role);
        we are providing online tutorial and counselling (i.e. your work)
        to reach 100 of our clients (i.e. your goal)
        for the business development team (i.e. user of your work)
        of the Zero21 Co-op Guide (i.e. existing product)
        to generate fundraising interest (i.e. value of your work).
      </div>

      <div class='info_content_CSSPS'>
        Example 2. We are an engineering team (i.e. your role);
        we are upgrading the electronics (i.e. your work)
        to reach a new generation of components (i.e. your goal)
        for the customers (i.e. user of your work)
        of our solar-charger product (i.e. existing product)
        to charge faster (i.e. value of your work).
      </div>
    </wux-wing-blank> -->
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
      // projectStoryLocal: '',
      objectiveResultLocal: '',
      triggerLocal: '',
      evaluatorTips: true,
      resultTips: true,
      storyTips: true,
      triggerTips: true,
      evaluatorSaved: true,
      storySaved: true,
      resultSaved: true,
      triggerSaved: true,
      storyRoleLocal: '',
      storyWorkLocal: '',
      storyGoalLocal: '',
      storyUserLocal: '',
      storySystemLocal: '',
      storyValueLocal: '',
    };
  },
  computed: {
    ...mapGetters({
      evaluator: 'evaluator',
      trigger: 'trigger',
      storyRole: 'storyRole',
      storyWork: 'storyWork',
      storyGoal: 'storyGoal',
      storyUser: 'storyUser',
      storySystem: 'storySystem',
      storyValue: 'storyValue',
      objectiveResult: 'objectiveResult',
      pageActive: 'pageActive',
      subjects: 'subjects',
    }),
  },
  methods: {
    ...mapActions({
      storyRoleUpdate: 'storyRoleUpdate',
      storyWorkUpdate: 'storyWorkUpdate',
      storyGoalUpdate: 'storyGoalUpdate',
      storyUserUpdate: 'storyUserUpdate',
      storySystemUpdate: 'storySystemUpdate',
      storyValueUpdate: 'storyValueUpdate',
      evaluatorUpdate: 'evaluatorUpdate',
      triggerUpdate: 'triggerUpdate',
      objectiveResultUpdate: 'objectiveResultUpdate',
      subjectsUpdate: 'subjectsUpdate',
      pageActiveUpdate: 'pageActiveUpdate',
    }),
    async evaluatorSavedHandle() {
      this.evaluatorSaved = true;
      this.evaluatorTips = false;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
    async storySavedHandle() {
      this.storySaved = true;
      this.storyTips = false;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
    async resultSavedHandle() {
      this.resultSaved = true;
      this.resultTips = false;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
    async triggerSavedHandle() {
      this.triggerSaved = true;
      this.triggerTips = false;
      await new Promise(resolve => setTimeout(resolve, 500));
      this.pageActiveUpdate(1);
    },
  },
  watch: {
    storyRoleLocal() {
      this.storyRoleUpdate(this.storyRoleLocal);
    },
    storyWorkLocal() {
      this.storyWorkUpdate(this.storyWorkLocal);
    },
    storyGoalLocal() {
      this.storyGoalUpdate(this.storyGoalLocal);
    },
    storyUserLocal() {
      this.storyUserUpdate(this.storyUserLocal);
    },
    storySystemLocal() {
      this.storySystemUpdate(this.storySystemLocal);
    },
    storyValueLocal() {
      this.storyValueUpdate(this.storyValueLocal);
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
          content: `Due to ${this.objectiveResultLocal}, ${this.storyUserLocal} can ${this.storyValueLocal}.`,
        });
      }
    },
    triggerLocal() {
      this.triggerUpdate(this.triggerLocal);
      if (this.subjects[1]) {
        this.subjectsUpdate({
          subjectIndex: 1,
          conceptIndex: 0,
          type: 'description',
          content: this.triggerLocal,
        });
      }
    },
  },
  created() {
    const that = this;
    wx.getStorage({
      key: 'STORYROLE',
      success(res) {
        that.storyRoleUpdate(res.data);
        that.storyRoleLocal = that.storyRole || '';
      },
    });
    wx.getStorage({
      key: 'STORYWORK',
      success(res) {
        that.storyWorkUpdate(res.data);
        that.storyWorkLocal = that.storyWork || '';
      },
    });
    wx.getStorage({
      key: 'STORYGOAL',
      success(res) {
        that.storyGoalUpdate(res.data);
        that.storyGoalLocal = that.storyGoal || '';
      },
    });
    wx.getStorage({
      key: 'STORYUSER',
      success(res) {
        that.storyUserUpdate(res.data);
        that.storyUserLocal = that.storyUser || '';
      },
    });
    wx.getStorage({
      key: 'STORYSYSTEM',
      success(res) {
        that.storySystemUpdate(res.data);
        that.storySystemLocal = that.storySystem || '';
      },
    });
    wx.getStorage({
      key: 'STORYVALUE',
      success(res) {
        that.storyValueUpdate(res.data);
        that.storyValueLocal = that.storyValue || '';
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
      key: 'TRIGGER',
      success(res) {
        that.triggerUpdate(res.data);
        that.triggerLocal = that.trigger || '';
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
.input_CSSPS{
  width: 100%;
  min-height:60rpx;
  max-height: 200rpx;
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
  padding: 0 20rpx 0 0;
  margin: 0 auto;
}
.input_container_CSSPS{
  width: 100%;
  display: table;
}
.input_content_CSSPS{
  display: table-cell;
  vertical-align: middle;
  // padding: 0 10rpx 0 0;
  color: #d10202;
  font-size: 85%;
  width: 18%;
}
.input_text_CSSPS{
  display: table-cell;
  width: 82%;
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
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
}
.emptytext_CSSPS{
  color: grey;
}
.instruction_CSSPS{
  width: auto;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
  padding: 10rpx;
  background: rgba(244,207,108,0.1);
  box-shadow: 0 2px 4px 0 rgba(38, 68, 54,0.4), 0 3px 10px 0 rgba(38, 68, 54,0.4);
}
.title_container_CSSPS{
  width: 100%;
  font-weight: bold;
  text-align: center;
  font-size: 85%;
}
.yourstory_CSSPS{
  font-size: 85%;
  width: 100%;
  border-top: 1px solid #eff1f7;
  text-align: justify;
  text-justify: inter-word;
}
</style>
