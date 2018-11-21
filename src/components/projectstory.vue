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
    <wux-wing-blank size="large">
      <div v-if='evaluatorTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Info: </span> your supervisor is whomever that will give you the Outstanding.
        <wux-white-space />
        <wux-white-space />
      </div>
    </wux-wing-blank>

    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="evaluatorLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="evaluatorSaved"
        @click='evaluatorSaved = false'
      >{{evaluatorLocal === '' ? 'Tap here to type.' : evaluatorLocal}}
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
    <wux-wing-blank size="large">
      <div v-if="storyTips" class='instruction_CSSPS'>
        <span style='font-weight:bold'>Info: </span>
        ask your supervisor to describe your job like in this example (more examples below):
        <wux-white-space />
        <div style='color:grey'>
          We are <span style='border-bottom: 1px solid grey'>a student support team</span> (i.e. your role);
          we are <span style='border-bottom: 1px solid grey'>providing online tutorial and counselling</span> (i.e. your work)
          to reach <span style='border-bottom: 1px solid grey'>100 of our clients</span> (i.e. your goal)
          for <span style='border-bottom: 1px solid grey'>the clients</span> (i.e. user of your work)
          of <span style='border-bottom: 1px solid grey'>the Zero21 Co-op Guide</span> (i.e. existing product)
          to <span style='border-bottom: 1px solid grey'>receive an outstanding evaluation</span> (i.e. value of your work).
        </div>
      </div>
      <wux-white-space />
    </wux-wing-blank>
    <div class="title_container_CSSPS">
      Your story
    </div>
    <wux-white-space />
    <wux-wing-blank size="large">
      <div
        class='yourstory_CSSPS'
        @click='storySaved = false'
      >
        <div v-if="(storyRoleLocal === '' & storyWorkLocal === '' & storyGoalLocal === '' & storyUserLocal === '' & storySystemLocal === '' & storyValueLocal === '')" class='emptytext_CSSPS' style='width:100%;border-top: 1px solid #eff1f7;padding: 10rpx 0 60rpx 0;'>
          Tap here to type.
        </div>
        <div v-else>
          <span v-if="storyRoleLocal !== ''">We are {{storyRoleLocal}}; </span>
          <span v-if="storyWorkLocal !== ''">we are {{storyWorkLocal}} </span>
          <span v-if="storyGoalLocal !== ''">to reach {{storyGoalLocal}} </span>
          <span v-if="storyUserLocal !== ''">for {{storyUserLocal}} </span>
          <span v-if="storySystemLocal !== ''">of {{storySystemLocal}} </span>
          <span v-if="storyValueLocal !== ''">to {{storyValueLocal}}.</span>
        </div>
      </div>
    </wux-wing-blank>

    <div v-if="!storySaved">
      <wux-wing-blank body-style="margin-left:160rpx;margin-right:160rpx">
        <button
          class='button_new_CSSPS'
          @click="storySavedHandle"
        >Save
        </button>
      </wux-wing-blank>
      <wux-white-space />
      <wux-wing-blank size="large">
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Role:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storyRoleLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Work:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storyWorkLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Goal:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storyGoalLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            User:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storyUserLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Product:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storySystemLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
        <div class='input_container_CSSPS'>
          <div class='input_content_CSSPS'>
            Value:
          </div>
          <div class='input_text_CSSPS'>
            <input
              class='input_CSSPS'
              v-model='storyValueLocal'
              :maxlength="200"
              cursor-spacing='20'
              placeholder='Tap here to type.'
            />
          </div>
        </div>
        <wux-white-space />
      </wux-wing-blank>
    </div>  
    <wux-white-space />

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <!-- <wux-divider position="left" :text="'3. Understand the targeted behavior (' + objectiveResultLocal.length + '/300)'" /> -->
        <wux-divider position="left" text="3. Review the planned product" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="resultTips = !resultTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-white-space />
    <wux-wing-blank size="large">
      <div v-if='resultTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Info: </span>this "planned product" statement below is the suggested version.
        Confirm it by typing it out.
        <wux-white-space />
        <div style='color:grey;'>
          <!-- The <span style='text-decoration: underline;'>advertising department</span>
          uses <span style='text-decoration: underline;'>our dating app with 5000 users in total</span> (i.e. planned product)
          to <span style='text-decoration: underline;'>generate revenue</span>. -->
        <span style='text-decoration: underline;'>{{storySystemLocal}} with {{storyGoalLocal}}</span> (i.e. the planned product)
        is able to {{storyValueLocal}} for {{storyUserLocal}}.
        </div>
        <wux-white-space />
        <wux-white-space />
      </div>
    </wux-wing-blank>
    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="objectiveResultLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="resultSaved"
        @click='resultSaved = false'
      >{{objectiveResultLocal === '' ? 'Tap here to type.' : objectiveResultLocal}}</div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='objectiveResultLocal'
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
            @click="resultSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>
    <wux-white-space />

    <div class='divider_container_CSSPS'>
      <div class='divider_content_CSSPS'>
        <wux-divider position="left" :text="'4. Empathize with your user (' + triggerLocal.length + '/300)'" />
      </div>
      <div class='divider_icon_CSSPS'>
        <button @click="triggerTips = !triggerTips" class='button_new_CSSPS'>info</button>
      </div>
    </div>
    <wux-wing-blank size="large">
      <!-- TODO: -->
      <div v-if='triggerTips' class='instruction_CSSPS'>
        <span style='font-weight:bold'>Info: </span> ask your supervisor to describe placeholder...
        <wux-white-space />
        <div style='color:grey'>
          We are <span style='border-bottom: 1px solid grey'>a student support team</span> (i.e. your role);
        </div>
        <wux-white-space />
        <wux-white-space />
      </div>
    </wux-wing-blank>

    <wux-wing-blank size="large">
      <div
        class='display_CSSPS'
        :class="triggerLocal === '' ? 'emptytext_CSSPS' : '' "
        v-if="triggerSaved"
        @click='triggerSaved = false'
      >{{triggerLocal === '' ? 'Tap here to type.' : triggerLocal}}
      </div>
      <div v-else>
        <textarea
          class='text_CSSPS'
          v-model='triggerLocal'
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
            @click="triggerSavedHandle"
          >Save
          </button>
        </wux-wing-blank>
      </div>
    </wux-wing-blank>

    <wux-divider position="left" text="Examples of a project story" />
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
      // projectStoryLocal: '',
      objectiveResultLocal: '',
      triggerLocal: '',
      evaluatorTips: false,
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
          content: this.objectiveResultLocal,
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
  font-size: 85%;
  height: 60rpx;
  // border-top: 1px solid #eff1f7;
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
  font-size: 85%;
  width: 15%;
}
.input_text_CSSPS{
  display: table-cell;
  width: 85%;
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
