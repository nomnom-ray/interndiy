<template>
  <div>
    <wux-accordion-group
      title="Default"
      :auto='false'
      :current='boardOpen'
      @change="boardChange"
    >
      <wux-accordion
        :key="structureIndex"
        v-for='(structure, structureIndex) in structures'
        :title="'board' + structure.title"
        :name="structureIndex"
      >
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
        icon: '../../img/book.png',
      },
      {
        label: 'Hide/UnHide Completed',
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
        structure.title = `Board ${i}: ${this.structures[i].title}`;
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
          checkList: [],
          taskPics: [],
          qualificationList: [],
          bundleList: [],
        };
        $wuxSelect('#wux-select-tasks').open({
          options: this.structuresLocal,
          toolbar: {
            title: 'Add a new task in...',
            cancelText: 'cancel',
            confirmText: 'confirm',
          },
          onConfirm: (boardIndex) => {
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
</style>