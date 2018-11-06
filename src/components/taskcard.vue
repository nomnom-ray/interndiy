<template>
  <a :href="detailURL">
    <div
      :class="propTask.taskDone ? 'card_done_CSSTC' : 'card_undone_CSSTC'"
    >
      <div
      v-if='propTask.taskPics'
      :key='index'
      v-for="(url, index) in propTask.taskPics"
      >
        <img
          class='pic_position_CSSTC'
          :src="url" mode="aspectFill"
          :id="index"
        />
      </div>

      <div
        v-if="propTask.title ===''"
        class='task_title_empty_CSSTC'
      >
        Empty task. Open to edit.
      </div>
      <div
        v-else
        class='task_title_CSSTC'
      >
        {{propTask.title}}
      </div>

      <div style='border-top: 1px solid #e3e5ee'>
      <wux-row>
        <wux-col span='2'>
          <div style='text-align:center;padding:5px'>
            Index: {{indexCurrent}}
          </div>
        </wux-col>
        <wux-col span='5'>
          <div style='text-align:center;padding:5px'>
            Strategies involved: {{propTask.bundleList.length}}
          </div>
        </wux-col>
        <wux-col span='5'>
          <div style='text-align:center;padding:5px'>
            Todos completed: {{todoCompleted.length}} / {{propTask.todos.length}}
          </div>          
        </wux-col>
      </wux-row>
      </div>
    </div>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['propTask', 'propTaskIndex', 'propStructureIndex'],
  computed: {
    ...mapGetters({
      structures: 'structures',
    }),
    detailURL() {
      return `/pages/taskdetail/main?board=
      ${this.propStructureIndex}&task=${this.propTaskIndex}`;
    },
    indexCurrent() {
      let current = 0;
      for (let i = 0; i <= this.propStructureIndex - 1; i += 1) {
        current += this.structures[i].tasks.length;
      }
      current += this.propTaskIndex;
      return current;
    },
    todoCompleted() {
      return this.propTask.todos.filter(element => element.done === true);
    },
  },
};
</script>

<style lang="scss" scoped>
.card_undone_CSSTC{
  font-size: 95%;
  width: 100%;
  margin-bottom: 10px;
  background: #fafafc;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19);  
}
.card_done_CSSTC{
  font-size: 95%;
  width: 100%;
  margin-bottom: 10px;
  background: #fafafc;
  box-shadow: 0 2px 4px 0 #f4d06c, 0 3px 10px 0 #f4d06c;
}
.pic_position_CSSTC{
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #264436;
}
.task_title_empty_CSSTC{
  padding: 10px;
  // font-size: 85%;
  text-align: center;  
  color: grey;
}
.task_title_CSSTC{
  padding: 10px;
  // font-size: 85%;
  text-align: justify;
  text-justify: inter-word;
}
</style>
