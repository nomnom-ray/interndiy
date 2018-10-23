<template>
  <div class="containerCSSPS">
    <textarea
      class="textareaCSSPS"
      v-model='projectStoryGETSET'
      :maxlength="200"
      placeholder="Project Story"
    >
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      animeIn: false,
      animeNum: [0, 1, 2, 3],
    };
  },
  computed: {
    ...mapGetters({
      projectStory: 'projectStory',
    }),
    projectStoryGETSET: {
      get() {
        return this.projectStory;
      },
      set(projectStory) {
        return this.projectStoryUpdate(projectStory);
      },
    },
  },
  methods: {
    ...mapActions({
      projectStoryUpdate: 'projectStoryUpdate',
    }),
  },
  mounted() {
    const that = this;
    wx.getStorage({
      key: 'PROJECTSTORY',
      success(res) {
        that.projectStoryUpdate(res.data);
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.containerCSSPS{
  .textareaCSSPS{
    border: 2px solid rgb(190, 0, 165);
  }
}
</style>
