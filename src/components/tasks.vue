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
      @iclick='taskAdd'
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
      floatButtons: [{
        label: 'Add task',
        icon: '../../img/book.png',
      }],
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      tasksCount: 'tasksCount',
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
  },
  methods: {
    ...mapActions({
      tasksAdd: 'tasksAdd',
      // tasksDel: 'tasksDel',
      tasksCountAdd: 'tasksCountAdd',
      tasksCountDel: 'tasksCountDel',
      // tasksUpdate: 'tasksUpdate',
    }),
    boardChange(e) {
      this.boardOpen = e.mp.detail.key;
    },
    taskAdd() {
      const taskDetail = {
        title: '',
        taskPics: [],
        qualificationList: [],
      };
      $wuxSelect('#wux-select-tasks').open({
        options: this.structuresLocal,
        toolbar: {
          title: 'Add a new task in...',
          cancelText: 'cancel',
          confirmText: 'confirm',
        },
        onConfirm: (boardIndex) => {
          this.tasksAdd({ boardIndex, taskDetail });
          const taskId = this.structures[boardIndex].tasks.length - 1;
          // FIXME: task count needs 2D array
          this.tasksCountAdd(1);
          this.boardOpen = [boardIndex];
          wx.navigateTo({
            url: `/pages/taskdetail/main?board=${boardIndex}&task=${taskId}`,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>