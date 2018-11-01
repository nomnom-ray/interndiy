<template>
  <div>
    <i-drawer mode="right" :visible="showBundleDrawer" @close="showBundleDrawer = !showBundleDrawer">
      <view class='drawerCSSTD'>
        <wux-checkbox-group
          :value='bundleCheckBoxValues'
          @change='bundleCheckBoxChange'>
          <wux-checkbox
            :key='bundleIndex'
            v-for='(bundle, bundleIndex) in structures[boardId].bundles'
            color="assertive"
            :title="'Strategy ' + bundleIndex + ': ' + bundle.title"
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
            :title="'Qualification ' + qualificationIndex + ': ' + qualification.title"
            :value="qualificationIndex" />
        </wux-checkbox-group>
      </view>
    </i-drawer>
    <wux-wing-blank size="large">
      <wux-button
        block
        outline
        type="assertive"
        :disabled="clicked"
        @click='taskDone=!taskDone'
      >Mark task {{taskDone ? 'incomplete again' : 'completed'}}
      </wux-button>
    </wux-wing-blank>

    <div class='info_file_CSSTD' v-if='picsTotal != 0'>
      <span style='color:red'>*</span>
      Completed tasks are hidden.
    </div>
    <wux-white-space />
    <wux-divider position="left" :text="'1. Task description for subcategory ' + boardId + ' (' + title.length + '/400)'" />
    <wux-wing-blank size="large">
      <textarea
        class="titleCSSTD"
        v-model='title'
        :maxlength="400"
        auto-height
        cursor-spacing='20'
        :placeholder="'Describe a task for the implementation of a strategy(s) in subcategory ' + boardId + '.'"
      >
      </textarea>
    </wux-wing-blank>
    <wux-divider position="left" text="2. Qualifications involved" />
    <div v-if='qualCheckBoxValues.length === 0' style='color:grey;text-align:center;font-size:80%'>
      No qualifications assigned.
    </div>
    <wux-wing-blank size="default">
      <div
        class='qualifications_CSSTD'
        v-if='qualifications[qualCheckBoxValue]'
        :key='qualCheckBoxValueIndex'
        v-for='(qualCheckBoxValue, qualCheckBoxValueIndex) in qualCheckBoxValues'
        @click='qualificationClicked(qualCheckBoxValueIndex)'
      >
        {{qualifications[qualCheckBoxValue].title}}
      </div>
    </wux-wing-blank>

    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSTD'
        @click='showQualDrawer = !showQualDrawer'
      >Select qualifications
      </button>
    </wux-wing-blank>

    <wux-divider position="left" text="3. Strategies involved" />
    <wux-wing-blank size="default">
      <wux-cell-group>
          <wux-cell
            v-if='bundleCheckBoxValues.length === 0'
          >
            <div style='color:grey;text-align:center;font-size:80%'>
              No strategies assigned.
            </div>
          </wux-cell>
          <wux-cell
            v-if='bundleCheckBoxValues.length !== 0 && structures[boardId].bundles[bundleCheckBoxValue]'
            :key='bundleCheckBoxValueIndex'
            v-for='(bundleCheckBoxValue, bundleCheckBoxValueIndex) in bundleCheckBoxValues'
          >
            <div class='strategy_CSSTD'>
              {{structures[boardId].bundles[bundleCheckBoxValue].title}}
            </div>
          </wux-cell>
      </wux-cell-group>
    </wux-wing-blank>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSTD'
        @click='showBundleDrawer = !showBundleDrawer'
      >Select strategies
      </button>
    </wux-wing-blank>

    <wux-divider position="left" :text="'4. Task visualization [Optional] (' + picURLs.length + '/1 picture)'" />
    <wux-gallery v-if='pageActive === 5' id="wux-gallery"></wux-gallery>
    <div
      :key='index'
      v-for="(url, index) in picURLs"
    >
    <wux-wing-blank size="small">
        <img
          class="pic_position_CSSTD"
          :src="url" mode="aspectFit"
          @click="showGallery(url, index)"
          :id="index"
        />
    </wux-wing-blank>
    </div>
    <div class='uploader_position_CSSTD'>
      <div
        v-if='picURLs.length < 1'
        class="weui-uploader__input-box"
      >
        <div class="weui-uploader__input" @click="chooseImage"></div>
      </div>
    </div>

    <div class='info_file_CSSTD' v-if='picsTotal != 0'>
      <span style='color:red'>*</span>
      Storage: {{picSizeUsed}}MB used; ~{{picSizeRemain}}MB remaining.
    </div>

    <van-popup
    :show="todoPopupShow"
    @close="popupCloseHandler()"
    position='top'
    >
      <wux-divider v-if='todoAddText' position="left" :text="'Todo item: description (' + todoText.length + '/200)'" />
      <wux-divider v-else position="left" :text="'Todo item: resolution (' + resultText.length + '/400)'" />
        <wux-wing-blank size="large">
          <textarea
            v-if='todoAddText'
            class="popupinputCSSTD"
            v-model='todoText'
            :maxlength="200"
            auto-height
            cursor-spacing='20'
            placeholder="Describe an actionable item for this task."
          >
          </textarea>
          <textarea
            v-else
            class="popupinputCSSTD"
            v-model='resultText'
            :maxlength="400"
            auto-height
            cursor-spacing='20'
            placeholder="Describe the actual action taken and its influences."
          >
          </textarea>
        </wux-wing-blank>
      <wux-white-space />
    </van-popup>

    <wux-divider position="left" text="5. Todo-list and resolution" />
    <div
      v-if='structures[boardId].tasks[taskId] && structures[boardId].tasks[taskId].todos.length === 0'
      style='color:grey;text-align:center;font-size:80%;padding:10px'
    >
      Replicate the task description and note the resolution if a todo-list is unnecessary.
    </div>
    <div
      v-if='structures[boardId].tasks[taskId] && structures[boardId].tasks[taskId].todos.length !== 0'
    >
      <app-todocard
        :key='todoIndex'
        v-for='(todo, todoIndex) in structures[boardId].tasks[taskId].todos'
        :propTodo = todo
        :propTodoIndex = todoIndex
        :propBoardIndex = boardId
        :propTaskIndex = taskId
      ></app-todocard>
    </div>
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_new_CSSTD'
        @click='todoNew'
      >Add todo item
      </button>
    </wux-wing-blank>

    <wux-white-space />
    <div class='info_icon_CSSTD'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:25px;margin-right:25px">
      <div class='info_content_CSSTD'>Track how the tasks contribute to the experience gained by assigning qualifications.</div>
      <div class='info_content_CSSTD'>Track the impact of your action by noting the resolution after completing each todo.</div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-wing-blank body-style="margin-left:100px;margin-right:100px">
      <button
        class='button_delete_CSSTD'
        @click='taskDelete'
      >Delete
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
import { $wuxGallery } from '../../util/wux';
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
      picToAdd: true,
      picURLs: [],
      picsTotal: '0',
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
    async todoNew() {
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
      await new Promise(resolve => setTimeout(resolve, 800));
      this.todoPopupShow = true;
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
    chooseImage() {
      const that = this;
      wx.chooseImage({
        // count limits how many pictures can be chosen at once
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(resTemp) {
          wx.saveFile({
            tempFilePath: resTemp.tempFilePaths[0],
            success(resSaved) {
              that.tasksUpdate({
                boardIndex: that.boardId,
                taskIndex: that.taskId,
                type: 'picURLs',
                content: [resSaved.savedFilePath],
              });
              that.picURLs = that.structures[that.boardId].tasks[that.taskId]
                .taskPics;
              that.storageRemainGet();
            },
          });
        },
        fail() {
        },
      });
    },
    showGallery(url, current) {
      const urls = [...this.picURLs];
      this.$wuxGallery = $wuxGallery();
      this.$wuxGallery.show({
        current,
        urls,
        delete: (currentDel) => {
          const that = this;
          wx.removeSavedFile({
            filePath: urls[currentDel],
            success() {
              that.storageRemainGet();
            },
          });
          this.tasksUpdate({
            boardIndex: this.boardId,
            taskIndex: this.taskId,
            type: 'picURLs',
            content: [],
          });
          that.picURLs = that.structures[that.boardId].tasks[that.taskId]
            .taskPics;
          return true;
        },
        onTap() {
          return true;
        },
      });
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
        this.clicked = true;
        return;
      }
      if (this.picURLs.length !== 0) {
        wx.showModal({
          title: 'Delete picture first.',
          confirmText: 'OK',
          cancelText: 'cancel',
          showCancel: false,
        });
      } else {
        const that = this;
        wx.showModal({
          title: 'Confirm Delete',
          confirmText: 'Confirm',
          cancelText: 'cancel',
          success: (resModal) => {
            if (resModal.confirm) {
              that.tasksDel({ boardIndex: that.boardId, taskIndex: that.taskId });
              that.structuresUpdate({
                index: that.boardId,
                type: 'tasksCount',
                content: that.structures[that.boardId].tasks.length,
              });
              wx.navigateBack();
            }
          },
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
    picURLs() {
      this.tasksUpdate({
        boardIndex: this.boardId,
        taskIndex: this.taskId,
        type: 'picURLs',
        content: this.picURLs,
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
    this.picURLs = this.structures[this.boardId].tasks[this.taskId].taskPics || [];
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
.titleCSSTD {
  width: 100%;
  min-height:50px;
  max-height: 200px;
  font-size: 80%;
}
.drawerCSSTD{
  overflow: scroll;
  width: 80vw;
  height: 100vh;
  background:#fff;
}
.qualifications_CSSTD{
  font-size: 80%;
  margin-bottom: 10px;
  margin-top: 5px;
  max-height: 55px;
  overflow: scroll;
  padding: 5px 10px 5px 10px;
  text-align: justify;
  text-justify: inter-word;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.strategy_CSSTD{
  font-size: 80%;
  text-align: justify;
  text-justify: inter-word;
}
.popupinputCSSTD{
  width: 100%;
  min-height:100px;
  max-height: 200px;
  font-size: 80%;
}
.weui-uploader__img {
  display: block;
  width: 79px;
  height: 79px;
}
.weui-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}
.weui-uploader__input-box:after,
.weui-uploader__input-box:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
}

.weui-uploader__input-box:before {
  width: 2px;
  height: 39.5px;
}

.weui-uploader__input-box:after {
  width: 39.5px;
  height: 2px;
}

.weui-uploader__input-box:active {
  border-color: #999;
}

.weui-uploader__input-box:active:after,
.weui-uploader__input-box:active:before {
  background-color: #999;
}

.weui-uploader__input {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.button_delete_CSSTD{
  background-color: white;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #f44336;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 80%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.button_new_CSSTD{
  background-color: #f4cf6c;
  width: 100%;
  border-radius: 8px;
  font-weight: bold;
  color: #264436;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 80%;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);
}
.info_file_CSSTD{
  float: right;
  padding: 0 10px;
  font-size: 80%;
}
.uploader_position_CSSTD{
  width: 77px;
  margin: 0 auto;
}
.pic_position_CSSTD{
  width: 100%;
}
.info_icon_CSSTD{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSTD{
  padding: 5px 0 0 0;
  width: 100%;
  text-align: center;
  font-size: 80%;
}
</style>