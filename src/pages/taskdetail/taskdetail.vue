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
    <icon type="info" size="23" color='rbg(0, 255, 255)'/>
    <wux-button
      block
      outline
      type="assertive"
      @click='drawerToggle'
    >Add qualifications
    </wux-button>
    <i-drawer mode="right" :visible="showDrawer" @close="drawerToggle">
      <view class='drawerCSSTD'>
        <wux-checkbox-group
          :value='checkBoxValues'
          @change='checkBoxChange'>
          <wux-checkbox
            :key='qualificationIndex'
            v-for='(qualification, qualificationIndex) in qualifications'
            color="assertive"
            :title="'qualification' + qualificationIndex + ': ' + qualification.title"
            :value="qualificationIndex" />
        </wux-checkbox-group>
      </view>
    </i-drawer>
    <div>
      <wux-cell-group title="qualifications">
          <wux-cell
            v-if='qualifications[checkBoxValue]'
            :key='checkBoxValueIndex'
            v-for='(checkBoxValue, checkBoxValueIndex) in checkBoxValues'
            :title="qualifications[checkBoxValue].title"
            @click='qualificationClicked(checkBoxValueIndex)'
          >
          </wux-cell>
      </wux-cell-group>
    </div>
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='taskDoneHandle'
    >Completed
    </wux-button>
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='taskDelete'
    >Delete
    </wux-button>
    {{taskDone}}
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
      showDrawer: false,
      taskDone: false,
      checkBoxValues: [],
      title: '',
      picsTotal: 0,
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
      qualifications: 'qualifications',
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
      tasksUpdate: 'tasksUpdate',
      structuresUpdate: 'structuresUpdate',
      qualificationUpdate: 'qualificationUpdate',
      tasksRefresh: 'tasksRefresh',
    }),
    qualificationClicked(qualificationIndex) {
      wx.navigateTo({
        url: `/pages/qualificationdetail/main?id=${qualificationIndex}`,
      });
    },
    drawerToggle() {
      this.showDrawer = !this.showDrawer;
    },
    checkBoxChange(event) {
      const checkedBox = event.mp.detail;
      const checkBoxValue = [...this.checkBoxValues];
      if (checkedBox.checked) {
        checkBoxValue.push(checkedBox.value);
        this.checkBoxValues = checkBoxValue;
        this.qualificationUpdate({ index: checkedBox.value, type: 'taskListAdd', content: { boardId: this.boardId, taskId: this.taskId } });
      } else {
        const checkedBoxIndex = checkBoxValue.indexOf(checkedBox.value);
        checkBoxValue.splice(checkedBoxIndex, 1);
        this.checkBoxValues = checkBoxValue;
        this.qualificationUpdate({ index: checkedBox.value, type: 'taskListDel', content: { boardId: this.boardId, taskId: this.taskId } });
      }
    },
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
      this.tasksDel({ boardIndex: this.boardId, taskIndex: this.taskId });
      this.structuresUpdate({
        index: this.boardId,
        type: 'tasksCount',
        content: this.structures[this.boardId].tasks.length,
      });
      wx.navigateBack();
    },
    taskDoneHandle() {
      this.taskDone = !this.taskDone;
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'taskDone',
        content: this.taskDone,
      });
      if (this.taskDone === true) {
        this.tasksRefresh({
          boardIndex: this.boardId,
          taskIndex: this.taskId,
          type: 'taskToLast',
        });
      } else {
        this.tasksRefresh({
          boardIndex: this.boardId,
          taskIndex: this.taskId,
          type: 'taskToFirst',
        });
      }
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
    checkBoxValues() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'qualificationList',
        content: this.checkBoxValues,
      });
    },
    // taskDone() {
    //   this.tasksUpdate({
    //     boardIndex: this.boardId,
    //     taskIndex: this.taskId,
    //     type: 'taskDone',
    //     content: this.taskDone,
    //   });
    // },
  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.taskId = Number(this.$root.$mp.query.task);
    this.clicked = false;
    this.storageRemainGet();
    this.title = this.structures[this.boardId].tasks[this.taskId].title || '';
    this.checkBoxValues = this.structures[this.boardId].tasks[this.taskId].qualificationList || [];
    this.taskDone = this.structures[this.boardId].tasks[this.taskId].taskDone || false;
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSD {
    position: relative;
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
  .drawerCSSTD{
    overflow: scroll;
    width: 80vw;
    height: 100vh;
    background:#fff;
  }
</style>