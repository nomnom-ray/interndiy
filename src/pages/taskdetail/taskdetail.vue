<template>
  <div>
    boardId: {{boardId}}; taskId: {{taskId}}
    <!-- <wux-toptips id="wux-toptips-task" /> -->
    <input
      class="titleCSSTD"
      v-model='title'
      :maxlength="100"
      placeholder="Task Title"
    >
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='taskDelete'
    >Delete
    </wux-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      boardId: 0,
      taskId: 0,
      clicked: false,
      title: '',
      picsTotal: 0,
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
    }),
    picSizeUsed() {
      return (this.picsTotal / 1000000).toPrecision(2);
    },
    picSizeRemain() {
      return ((10000000 - this.picsTotal) / 1000000).toPrecision(2);
    },
  },
  methods: {
    ...mapActions({
      tasksAdd: 'tasksAdd',
      tasksDel: 'tasksDel',
      tasksCountAdd: 'tasksCountAdd',
      tasksCountDel: 'tasksCountDel',
      tasksUpdate: 'tasksUpdate',
    }),
    storageRemainGet() {
      const that = this;
      wx.getSavedFileList({
        success(res) {
          let picsSizeTotal = 0;
          that.picsTotal = res.fileList.length;
          for (let i = 0; i <= res.fileList.length - 1; i += 1) {
            picsSizeTotal += res.fileList[i].size;
          }
          that.picsTotal = picsSizeTotal;
        },
      });
    },
    taskDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      // TODO: delete needs work
      // this.structuresDel(this.id);
      // this.structuresCountDel();
      wx.navigateBack();
    },
  },
  watch: {
    title() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'title',
        content: this.title,
      });
    },
  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.taskId = Number(this.$root.$mp.query.task);
    this.clicked = false;
    this.storageRemainGet();
    // this.title = this.structures[this.boardId].tasks[this.taskId].title || '';
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSD {
    position: relative;
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
</style>