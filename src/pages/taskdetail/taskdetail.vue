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
      @click='showQualDrawer = !showQualDrawer'
    >Add qualifications
    </wux-button>
    <wux-button
      block
      outline
      type="assertive"
      @click='showBundleDrawer = !showBundleDrawer'
    >Add bundle
    </wux-button>
    <i-drawer mode="right" :visible="showBundleDrawer" @close="showBundleDrawer = !showBundleDrawer">
      <view class='drawerCSSTD'>
        <wux-checkbox-group
          :value='bundleCheckBoxValues'
          @change='bundleCheckBoxChange'>
          <wux-checkbox
            :key='bundleIndex'
            v-for='(bundle, bundleIndex) in structures[boardId].bundles'
            color="assertive"
            :title="'qualification' + bundleIndex + ': ' + bundle.title"
            :value="bundleIndex" />
        </wux-checkbox-group>
      </view>
    </i-drawer>
    <i-drawer mode="right" :visible="showQualDrawer" @close="showQualDrawer = !showQualDrawer">
      <view class='drawerCSSTD'>
        <wux-checkbox-group
          :value='qualCheckBoxValues'
          @change='qualCheckBoxChange'>
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
            v-if='qualifications[qualCheckBoxValue]'
            :key='qualCheckBoxValueIndex'
            v-for='(qualCheckBoxValue, qualCheckBoxValueIndex) in qualCheckBoxValues'
            :title="qualifications[qualCheckBoxValue].title"
            @click='qualificationClicked(qualCheckBoxValueIndex)'
          >
          </wux-cell>
      </wux-cell-group>
      <wux-cell-group title="Bundles">
          <wux-cell
            v-if='structures[boardId].bundles[bundleCheckBoxValue]'
            :key='bundleCheckBoxValueIndex'
            v-for='(bundleCheckBoxValue, bundleCheckBoxValueIndex) in bundleCheckBoxValues'
            :title="structures[boardId].bundles[bundleCheckBoxValue].title"
          >
          </wux-cell>
      </wux-cell-group>
    </div>
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='taskDone=!taskDone'
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
      showQualDrawer: false,
      showBundleDrawer: false,
      taskDone: false,
      qualCheckBoxValues: [],
      bundleCheckBoxValues: [],
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
    }),
    qualificationClicked(qualificationIndex) {
      wx.navigateTo({
        url: `/pages/qualificationdetail/main?id=${qualificationIndex}`,
      });
    },
    qualCheckBoxChange(event) {
      const checkedBox = event.mp.detail;
      const qualCheckBoxValue = [...this.qualCheckBoxValues];
      const taskCurrent = this.structures[this.boardId].tasks[this.taskId];
      if (checkedBox.checked) {
        qualCheckBoxValue.push(checkedBox.value);
        this.qualCheckBoxValues = qualCheckBoxValue;
        this.qualificationUpdate({
          index: checkedBox.value,
          type: 'taskListAdd',
          content: taskCurrent,
        });
      } else {
        const checkedBoxIndex = qualCheckBoxValue.indexOf(checkedBox.value);
        qualCheckBoxValue.splice(checkedBoxIndex, 1);
        this.qualCheckBoxValues = qualCheckBoxValue;
        this.qualificationUpdate({
          index: checkedBox.value,
          type: 'taskListDel',
          content: taskCurrent,
        });
      }
    },
    bundleCheckBoxChange(event) {
      const checkedBox = event.mp.detail;
      const bundleCheckBoxValue = [...this.bundleCheckBoxValues];
      if (checkedBox.checked) {
        bundleCheckBoxValue.push(checkedBox.value);
        this.bundleCheckBoxValues = bundleCheckBoxValue;
      } else {
        const checkedBoxIndex = bundleCheckBoxValue.indexOf(checkedBox.value);
        bundleCheckBoxValue.splice(checkedBoxIndex, 1);
        this.bundleCheckBoxValues = bundleCheckBoxValue;
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
    qualCheckBoxValues() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'qualificationList',
        content: this.qualCheckBoxValues,
      });
    },
    bundleCheckBoxValues() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'bundleList',
        content: this.bundleCheckBoxValues,
      });
    },
    taskDone() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'taskDone',
        content: this.taskDone,
      });
    },
  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.taskId = Number(this.$root.$mp.query.task);
    this.clicked = false;
    this.storageRemainGet();
    this.title = this.structures[this.boardId].tasks[this.taskId].title || '';
    this.qualCheckBoxValues = this.structures[this.boardId]
      .tasks[this.taskId].qualificationList || [];
    this.bundleCheckBoxValues = this.structures[this.boardId]
      .tasks[this.taskId].bundleList || [];
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