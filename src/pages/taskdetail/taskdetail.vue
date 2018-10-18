<template>
  <div>
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
    <van-popup
    :show="todoPopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <div class='popupCSS'>
        <input
          v-if='todoAddText'
          class="popupinputCSS"
          v-model='todoText'
          :maxlength="200"
          placeholder="depending"
        >
        <input
          v-else
          class="popupinputCSS"
          v-model='resultText'
          :maxlength="200"
          placeholder="depending"
        >
      </div>
    </van-popup>
    <div>
      <div>Todo Checklist</div>
      <app-todocard
        v-if='structures[boardId].tasks[taskId]'
        :key='todoIndex'
        v-for='(todo, todoIndex) in structures[boardId].tasks[taskId].todos'
        :propTodo = todo
        :propTodoIndex = todoIndex
        :propBoardIndex = boardId
        :propTaskIndex = taskId
      ></app-todocard>
    </div>
    <wux-button
      block
      outline
      type="assertive"
      @click='todoNew'
    >Add todo item
    </wux-button>
    <div>
      <div>Concern Checklist</div>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Todocard from '../../components/todocard';

export default {
  components: {
    appTodocard: Todocard,
  },
  data() {
    return {
      boardId: 0,
      taskId: 0,
      todoPopupShow: false,
      todoText: '',
      resultText: '',
      todoToChange: 0,
      todoAddText: false,
      resultAddText: false,
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
      todosAdd: 'todosAdd',
      todosUpdate: 'todosUpdate',
      todosDel: 'todosDel',
    }),
    popupCloseHandler() {
      this.todoPopupShow = false;
      this.todoText = '';
      this.resultText = '';
      this.todoToChange = '';
      this.todoAddText = false;
      this.resultAddText = false;
    },
    todoNew() {
      const todoDetail = {
        text: '',
        done: false,
        result: '',
        showResult: false,
        colorPicked: 0,
      };
      this.todosAdd({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'add',
        todoDetail,
      });
      this.todoAddText = true;
      this.todoToChange = this.structures[this.boardId].tasks[this.taskId].todos.length - 1;
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'todosCount',
        content: this.structures[this.boardId].tasks[this.taskId].todos.length,
      });
      this.todoPopupShow = !this.todoPopupShow;
    },
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
    todoText() {
      if (this.todoToChange !== '') {
        this.todosUpdate({
          boardIndex: this.boardId,
          taskIndex: this.taskId,
          todoIndex: this.todoToChange,
          type: 'text',
          content: this.todoText,
        });
      }
    },
    resultText() {
      if (this.todoToChange !== '') {
        this.todosUpdate({
          boardIndex: this.boardId,
          taskIndex: this.taskId,
          todoIndex: this.todoToChange,
          type: 'result',
          content: this.resultText,
        });
      }
    },
    todoPopupShow() {
      if (this.todoPopupShow === true && this.todoToChange !== '') {
        this.todoText = this.structures[this.boardId].tasks[this.taskId]
          .todos[this.todoToChange].text;
        this.resultText = this.structures[this.boardId].tasks[this.taskId]
          .todos[this.todoToChange].result;
      }
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
    // console.log(this.structures[this.boardId].tasks[this.taskId].todos[0].done);
  },
  created() {
    this.$root.$on('todoText', (state) => {
      this.todoAddText = true;
      this.todoPopupShow = true;
      this.todoToChange = state;
    });
    this.$root.$on('resultText', (state) => {
      this.resultAddText = true;
      this.todoPopupShow = true;
      this.todoToChange = state;
    });
    this.$root.$on('todoDelete', (state) => {
      this.todoToChange = state;
      this.todosDel({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        todoIndex: this.todoToChange,
      });
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'todosCount',
        content: this.structures[this.boardId].tasks[this.taskId].todos.length,
      });
    });
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
  .popupCSS {
  font-size: 13px;
  line-height: 30px;
  margin-bottom: 10px;
  text-align: center;
  z-index: 999;
  .popupinputCSS{
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
  .popupfieldsCSS{
    overflow:scroll;
    margin-top: 5px;
    border: 2px solid rgb(190, 0, 165);
  }
}
</style>