<template>
  <div>
    <input 
      class="qualfieldsCSSQD"
      v-model='title'
      :maxlength="200"
      placeholder="Qualification Title"
    >
    <div>
      <textarea
        class="qualfieldsCSSQD"
        :class="{greyout: descriptionValid}"
        v-model='description'
        :maxlength="200"
        :disabled='descriptionValid'
        placeholder="Qualification Description"
      >
      </textarea>
      <wux-button
        block
        clear
        type="assertive"
        @click='descriptionChecked'
      >{{descriptionValid ? 'Modify' : 'Validate'}}
      </wux-button>
    </div>
    <wux-cell-group title="Tasks">
        <wux-cell
          :key='taskIndex'
          v-for='(task, taskIndex) in taskList'
          :title="structures[task.boardId].tasks[task.taskId].title"
          @click='taskClicked(task)'
        >
        </wux-cell>
    </wux-cell-group>
    <textarea
      class="qualfieldsCSSQD"
      :class="{greyout: descriptionValid}"
      v-model='justification'
      placeholder="Qualification justification"
    >
    </textarea>
    <van-button
      type='default'
      @click='qualificationDelete'
      :disabled="clicked"
    >delete
    </van-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: '',
      title: '',
      description: '',
      justification: '',
      descriptionValid: false,
      taskList: [],
      clicked: false,
    };
  },
  computed: {
    ...mapGetters({
      qualifications: 'qualifications',
      qualificationsCount: 'qualificationsCount',
      structures: 'structures',
    }),
  },
  methods: {
    ...mapActions({
      qualificationsAdd: 'qualificationsAdd',
      qualificationsDel: 'qualificationsDel',
      qualificationsCountAdd: 'qualificationsCountAdd',
      qualificationsCountDel: 'qualificationsCountDel',
      qualificationUpdate: 'qualificationUpdate',
    }),
    taskClicked(task) {
      wx.navigateTo({
        url: `/pages/taskdetail/main?board=${task.boardId}&task=${task.taskId}`,
      });
    },
    descriptionChecked() {
      this.descriptionValid = !this.descriptionValid;
    },
    qualificationDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.qualificationsDel(this.id);
      this.qualificationsCountDel();
      wx.navigateBack();
    },
  },
  watch: {
    // watch local data to to avoid have both a shared object...
    // ...and shared array with the same objects
    // this structure is used for storage for consistency and future implementation off local
    title() {
      this.qualificationUpdate({ index: this.id, type: 'title', content: this.title });
    },
    description() {
      this.qualificationUpdate({ index: this.id, type: 'description', content: this.description });
    },
    descriptionValid() {
      this.qualificationUpdate({ index: this.id, type: 'descriptionValid', content: this.descriptionValid });
    },
    justification() {
      this.qualificationUpdate({ index: this.id, type: 'justification', content: this.justification });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = this.$root.$mp.query.id;
    this.clicked = false;
    // id is 1 smaller than length; if equal, id must be new: create new object
    if (this.id >= this.qualifications.length) {
      const qualificationDetail = {
        title: '',
        description: '',
        descriptionValid: false,
        taskList: [],
      };
      this.qualificationsAdd(qualificationDetail);
      this.qualificationsCountAdd(1);
    }
    // existing entries gets the data from localstorage
    this.title = this.qualifications[this.id].title || '';
    this.description = this.qualifications[this.id].description || '';
    this.descriptionValid = this.qualifications[this.id].descriptionValid || false;
    this.taskList = this.qualifications[this.id].taskList || [];
    this.justification = this.qualifications[this.id].justification || '';
  },
};
</script>


<style lang="scss" scoped>
  .qualfieldsCSSQD {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);taskList
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
  .greyout{
    color: lightgray;
  }
</style>
