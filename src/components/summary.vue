<template>
  <!-- prevent the gutter in row from messing with scroll horizontally -->
  <div style="max-width:100%;overflow-x:hidden">
    <!-- <wux-white-space /> -->
    <!-- <wux-white-space /> -->
    <!-- <div class="name_container_CSSSU">
      Syllabus
    </div>
    <wux-white-space /> -->
    <!-- <wux-wing-blank size="large">
      <div class='instruction_CSSSU'>
        Follow the tabs to correctly
        <span style='text-decoration: underline'>align expectations</span>
        between you and your supervisor. It is what we do!
      </div>
    </wux-wing-blank> -->
    <wux-white-space />
    <wux-white-space />
    <wux-steps :current="stepActive">
      <wux-step title="Tab 1" content="Story"></wux-step>
      <wux-step title="Tab 2" content="Topics"></wux-step>
      <wux-step title="Tab 3" content="Goals"></wux-step>
      <!-- <wux-step title="Tab 3" content="Strategy"></wux-step> -->
      <!-- <wux-step title="Tab 4" content="Task"></wux-step> -->
      <wux-step title="Tab 4" content="Evaluation"></wux-step>
    </wux-steps>
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank size="large">
    <div v-if="stepActive === 0" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Story"</span>
      summarizes your work before breaking it down into definitive tasks.</div>
    <div v-if="stepActive === 1" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Topics"</span>
      contains a step-by-step visualization of the direction, scope, and endgame of your work.</div>
    <div v-if="stepActive === 2" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Goals"</span>
      is the collection of expectations in your responsibilities.</div>
    <div v-if="stepActive === 3" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Evaluation"</span>
      is your superviors' rubric to assess your co-op term.</div>

    <!-- <div v-if="stepActive === 2" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Strategy"</span>
      is a collection of justifiable decisions to carry out your responsibilities.</div>
    <div v-if="stepActive === 3" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Task"</span>
      is your responsibilities broken down into easy-to-understand tasks.</div>
    <div v-if="stepActive === 4" class='instruction_CSSSU'>
      <span style='font-weight:bold'>"Report"</span>
      is a summary on how your efforts at work impact your career identity.</div> -->
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />

    <wux-row gutter='10'>
      <wux-col span='5' push='1'>
        <button
          class='button_new_CSSSU'
          @click='stepActive -= 1'
          :disabled='stepActive <= 0'
        >Edit pervious tab
        </button>
      </wux-col>
      <wux-col span="5" push='1'>
        <button
          class='button_new_CSSSU'
          @click='stepActive += 1'
          :disabled='stepActive >= 3'
        >Check out next tab
        </button>
      </wux-col>
    </wux-row>

    <wux-white-space />
    <wux-white-space />
    <div class="title_container_CSSSU">
      Things to do in Tab {{stepActive + 1}}
    </div>
    <wux-white-space />

    <app-summary-story v-if="stepActive === 0"></app-summary-story>
    <app-summary-behavior v-if="stepActive === 1"></app-summary-behavior>
    <app-summary-structures v-if="stepActive === 2"></app-summary-structures>
    <app-summary-outstanding v-if="stepActive === 3"></app-summary-outstanding>
    <!-- <app-summary-tasks v-if="stepActive === 3"></app-summary-tasks> -->
    <!-- <app-summary-outstanding v-if="stepActive === 4"></app-summary-outstanding> -->
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:180rpx;margin-right:180rpx">
      <button
        class='button_delete_CSSSU'
        @click='clearAll'
      >Clear All Content
      </button>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
  </div>
</template>

<script>
import SummaryStory from './summarystory';
import SummaryBehavior from './summarybehavior';
import SummaryStructures from './summarystructures';
import SummaryTasks from './summarytasks';
import SummaryOutstanding from './summaryoutstanding';

export default {
  components: {
    appSummaryStory: SummaryStory,
    appSummaryBehavior: SummaryBehavior,
    appSummaryStructures: SummaryStructures,
    appSummaryTasks: SummaryTasks,
    appSummaryOutstanding: SummaryOutstanding,
  },
  data() {
    return {
      stepActive: 0,
    };
  },
  methods: {
    clearAll() {
      wx.showModal({
        title: 'Confirm Delete',
        confirmText: 'Confirm',
        cancelText: 'cancel',
        success: (res) => {
          if (res.confirm) {
            wx.getSavedFileList({
              success(resDel) {
                for (let i = 0; i <= resDel.fileList.length - 1; i += 1) {
                  wx.removeSavedFile({
                    filePath: resDel.fileList[i].filePath,
                  });
                }
              },
            });
            wx.clearStorage();
            wx.showModal({
              title: 'Close app & Wechat to finish.',
              confirmText: 'OK',
              cancelText: 'cancel',
              showCancel: false,
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info_content_CSSSU {
  width: 100%;
  padding: 50rpx 30rpx 0 0;
  float: right;
  text-align: justify;
  text-justify: inter-word;
  font-size: 90%;
}
.button_new_CSSSU {
  background-color: #f4cf6c;
  padding: 10rpx;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  // box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
}
.button_delete_CSSSU {
  background-color: white;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.4);
}
.name_container_CSSSU {
  width: 100%;
  text-align: center;
  font-size: 130%;
}
.title_container_CSSSU {
  width: 100%;
  text-align: center;
  font-size: 110%;
}
.ray_CSSSU {
  max-width: 160rpx;
  max-height: 160rpx;
}
.instruction_CSSSU{
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 85%;
}
</style>