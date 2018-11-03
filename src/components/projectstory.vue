<template>
  <div>
    <wux-divider position="left" :text="'Project story (' + projectStoryLocal.length + '/200)'" />
    <wux-wing-blank size="large">
      <textarea
        class="story_CSSPS"
        v-model='projectStoryLocal'
        :maxlength="200"
        auto-height
        cursor-spacing='20'
        placeholder="Ask your mentor to describe the overall project in fewer than two sentences."
      >
      </textarea>
    </wux-wing-blank>

    <wux-divider position="left" text="Examples of a project story" />
    <wux-wing-blank body-style="margin-left:25px;margin-right:25px">
      <div class='info_content_CSSPS'><span style='font-weight:bold'>Marketing Specialist: </span>promote an online dating app via social media and offline campaign to capture users in Ontario.</div>
      <div class='info_content_CSSPS'><span style='font-weight:bold'>Business Developer: </span>discover new clients, manage contacts, and engage potential clients to validate business strategy.</div>
      <div class='info_content_CSSPS'><span style='font-weight:bold'>Electrical Engineer: </span>commission a sun-tracking solar charger for portable phone batteries.</div>    
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
    };
  },
  computed: {
    ...mapGetters({
      projectStory: 'projectStory',
    }),
  },
  methods: {
    ...mapActions({
      projectStoryUpdate: 'projectStoryUpdate',
    }),
  },
  watch: {
    projectStoryLocal() {
      this.projectStoryUpdate(this.projectStoryLocal);
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
  },
};
</script>

<style lang="scss" scoped>
.story_CSSPS{
  width: 100%;
  min-height:75px;
  max-height: 200px;
  font-size: 83%;
}
.info_content_CSSPS{
  padding: 2px 0 4px 0;
  width: 100%;
  text-align: justify;
  text-justify: inter-word;
  font-size: 83%;
}
</style>
