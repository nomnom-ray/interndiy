<template>
  <div>
    <wux-accordion-group
      :auto='false'
      :current='boardOpen'
      @change="boardChange"
    >
      <wux-accordion
        :key="structureIndex"
        v-for='(structure, structureIndex) in structures'
        :title="'In subcategory ' + (structureIndex) + ' (' + structure.title + ')'"
        :name="structureIndex"
      >
        <div
          v-if='structure.tasks.length === 0'
          style='color:grey;text-align:center'
        >
          Use the red button to add a new task.
        </div>        
        <app-task-card
          v-if='!task.taskDone || (task.taskDone && hideDone)'
          :key='taskIndex'
          v-for='(task, taskIndex) in structure.tasks'
          :propTask='task'
          :propTaskIndex='taskIndex'
          :propStructureIndex='structureIndex'
        >
        </app-task-card>
      </wux-accordion>
    </wux-accordion-group>

    <wux-white-space />
    <div class='info_icon_CSST'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:40px;margin-right:40px">
      <div class='info_content_CSST'>Create tasks to compare strategies in each subcategory.</div>
      <div class='info_content_CSST'>Create tasks to implement the roadmap.</div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />

    <wux-select id="wux-select-tasks" />
    <!-- change the source code to: this.triggerEvent('iclick', params) -->
    <wux-floating-button 
      @iclick='floatClicked'
      position="bottomRight"
      theme="assertive"
      :buttons="floatButtons"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { $wuxSelect } from '../util/wux';
import TaskCard from './taskcard';

export default {
  components: {
    appTaskCard: TaskCard,
  },
  data() {
    return {
      structuresLocal: [],
      boardOpen: ['0'],
      boardIndex: 0,
      testhide: 'hidesdasd',
      hideDone: false,
      floatButtons: [{
        label: 'Add task',
        icon: '../../img/todo.png',
      },
      {
        label: 'Hide/Unhide completed tasks',
        icon: '../../img/hide.png',
      }],
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
    }),
    structuresLocalNew() {
      this.structuresLocal = [];
      for (let i = 0; i <= this.structures.length - 1; i += 1) {
        const structure = {
          title: '',
          value: '',
        };
        structure.title = `Subcategory ${i}: ${this.structures[i].title}`;
        structure.value = i;
        this.structuresLocal.push(structure);
      }
    },
    hideDoneLabel() {
      if (this.hideDone === true) {
        return 'Hide completed';
      }
      return 'Unhide completed';
    },
  },
  methods: {
    ...mapActions({
      tasksAdd: 'tasksAdd',
      structuresUpdate: 'structuresUpdate',
    }),
    boardChange(e) {
      this.boardOpen = e.mp.detail.key;
    },
    floatClicked(e) {
      const { index } = e.mp.detail;
      if (index === 0) {
        // initiate using taskDetail for tasksAdd is in structures.vue; make sure these match
        const taskDetail = {
          title: '',
          taskDone: false,
          taskPics: [],
          qualificationList: [],
          bundleList: [],
          todos: [],
          todosCount: 0,
          concerns: [],
          concernsCount: 0,
        };
        $wuxSelect('#wux-select-tasks').open({
          options: this.structuresLocal,
          toolbar: {
            title: 'Add a task in...',
            cancelText: 'cancel',
            confirmText: 'confirm',
          },
          onConfirm: (boardIndex) => {
            if (boardIndex) {
              this.tasksAdd({ boardIndex, type: 'add', taskDetail });
              const taskId = this.structures[boardIndex].tasks.length - 1;
              this.boardIndex = boardIndex;
              this.structuresUpdate({
                index: this.boardIndex,
                type: 'tasksCount',
                content: this.structures[boardIndex].tasks.length,
              });
              this.boardOpen = [boardIndex];
              wx.navigateTo({
                url: `/pages/taskdetail/main?board=${boardIndex}&task=${taskId}`,
              });
            }
          },
        });
      }
      if (index === 1) {
        this.hideDone = !this.hideDone;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.info_icon_CSST{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSST{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: left;
  font-size: 80%;
}
</style>