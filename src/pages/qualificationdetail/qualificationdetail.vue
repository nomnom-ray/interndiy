<template>
  <div>
    <wux-divider position="left" :text="'1. Posted qualification (' + title.length + '/200)'" />
    <wux-wing-blank size="large">
      <div class="placeholder_CSSQD">Tip: <span style='font-weight:bold'>separately</span> copy and paste each qualification from the job posting.</div>
      <textarea
        class="qual_title_CSSQD"
        v-model='title'
        :maxlength="200"
        auto-height
        cursor-spacing='20'
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>

    <!-- <wux-divider position="left" :text="'2. Understanding of qualification (' + description.length + '/400)'" />
    <wux-wing-blank size="large">
      <textarea
        class="qual_description_CSSQD"
        :class="{'qual_valid_CSSQD': descriptionValid}"
        v-model='description'
        :maxlength="400"
        :disabled='descriptionValid'
        placeholder="Qualification Description"
      >
      </textarea>
    </wux-wing-blank>

    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSQD'
        @click='descriptionChecked'
      >{{descriptionValid ? 'Modify' : 'Validate'}}
      </button>
    </wux-wing-blank> -->

    <wux-divider position="left" text="2. List of performed tasks" />
    <wux-cell-group>
        <wux-cell
          v-if="taskList.length === 0"
        >
          <div style='color:grey;text-align:center;font-size:83%'>
            This list is self generated when tasks are created in "Tab 4".
          </div>
        </wux-cell>
        <wux-cell
          :key='taskIndex'
          v-for='(task, taskIndex) in taskList'
        >
          <div class='strategy_CSSQD'>
            {{task.title}}
          </div>
        </wux-cell>
    </wux-cell-group>

    <wux-white-space />

    <wux-divider position="left" :text="'3. Justification of work (' + justification.length + '/400)'" />
    <wux-wing-blank size="large">
      <div class="placeholder_CSSQD">Tip: Track how the above tasks built your qualification over the term.</div>
      <textarea
        class="qual_justification_CSSQD"
        v-model='justification'
        auto-height
        cursor-spacing='20'
        :maxlength="400"
        placeholder="Tap here to type."
      >
      </textarea>
    </wux-wing-blank>
    <wux-white-space />
    <div class='info_icon_CSSQD'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:40px;margin-right:40px">
      <div class='info_content_CSSQD'>Track effort by looking at the number of tasks.</div>
      <div class='info_content_CSSQD'>Focus on qualifications that benefit your narrative.</div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_delete_CSSQD'
        @click='qualificationDelete'
        :disabled="clicked"
      >delete qualification
      </button>
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
      id: '',
      title: '',
      description: '',
      justification: '',
      descriptionValid: false,
      taskList: [],
      clicked: false,
    };
  },
  computed: {
    ...mapGetters({
      qualifications: 'qualifications',
      qualificationsCount: 'qualificationsCount',
      structures: 'structures',
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
    taskClicked(task) {
      wx.navigateTo({
        url: `/pages/taskdetail/main?board=${task.boardId}&task=${task.taskId}`,
      });
    },
    descriptionChecked() {
      this.descriptionValid = !this.descriptionValid;
    },
    qualificationDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.qualificationsDel(this.id);
      this.qualificationsCountDel();
      wx.navigateBack();
    },
  },
  watch: {
    // watch local data to to avoid have both a shared object...
    // ...and shared array with the same objects
    // this structure is used for storage for consistency and future implementation off local
    title() {
      this.qualificationUpdate({ index: this.id, type: 'title', content: this.title });
    },
    description() {
      this.qualificationUpdate({ index: this.id, type: 'description', content: this.description });
    },
    descriptionValid() {
      this.qualificationUpdate({ index: this.id, type: 'descriptionValid', content: this.descriptionValid });
    },
    justification() {
      this.qualificationUpdate({ index: this.id, type: 'justification', content: this.justification });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = this.$root.$mp.query.id;
    this.clicked = false;
    // id is 1 smaller than length; if equal, id must be new: create new object
    if (this.id >= this.qualifications.length) {
      const qualificationDetail = {
        title: '',
        description: '',
        descriptionValid: false,
        taskList: [],
      };
      this.qualificationsAdd(qualificationDetail);
      this.qualificationsCountAdd(1);
    }
    // existing entries gets the data from localstorage
    this.title = this.qualifications[this.id].title || '';
    this.description = this.qualifications[this.id].description || '';
    this.descriptionValid = this.qualifications[this.id].descriptionValid || false;
    this.taskList = this.qualifications[this.id].taskList || [];
    this.justification = this.qualifications[this.id].justification || '';
  },
};
</script>


<style lang="scss" scoped>
.placeholder_CSSQD{
  width: 100%;
  text-align: left;
  font-size: 85%;
  margin-bottom: 16rpx;
}
.qual_title_CSSQD{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 85%;
  padding: 8rpx 0 0 0;
  border-top: 1px solid #eff1f7;
}
.qual_description_CSSQD{
  width: 100%;
  min-height:50px;
  max-height: 200px;
  padding: 0 0 50rpx 0;
  font-size: 85%;  
}
.qual_valid_CSSQD{
  color: gold;
}
.strategy_CSSQD{
  font-size: 85%;
  text-align: justify;
  text-justify: inter-word;
}
.qual_justification_CSSQD{
  // border-top: 1px solid #eff1f7;
  border-bottom: 1px solid #eff1f7;
  width: 100%;
  min-height:50px;
  max-height: 200px;
  padding: 0 0 50rpx 0;
  font-size: 85%;  
}
.qual_tasklist_CSSQD{
  text-align: center;
  color: grey;
  font-size: 85%;
}
.button_delete_CSSQD{
  background-color: white;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.button_new_CSSQD{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 85%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.info_icon_CSSQD{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSQD{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: center;
  font-size: 85%;
}
</style>
