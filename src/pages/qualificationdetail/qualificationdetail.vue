<template>
  <div>
    <input 
      class="qualfieldsCSSQD"
      v-model='title'
      :maxlength="200"
      placeholder="Qualification Title"
    >
    <textarea
      class="qualfieldsCSSQD"
      v-model='description'
      :maxlength="200"
      placeholder="Qualification Description"
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
      clicked: false,
    };
  },
  computed: {
    ...mapGetters({
      qualifications: 'qualifications',
      qualificationsCount: 'qualificationsCount',
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
    title() {
      this.qualificationUpdate({ index: this.id, type: 'title', content: this.title });
    },
    description() {
      this.qualificationUpdate({ index: this.id, type: 'description', content: this.description });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = this.$root.$mp.query.id;
    this.clicked = false;
    // id is 1 smaller than length; if equal, id must be new: create new object
    // very important that id= this.id, because the update must find the object using id
    if (this.id >= this.qualifications.length) {
      const qualificationDetail = {
        id: this.id,
        title: '',
        description: '',
      };
      this.qualificationsAdd(qualificationDetail);
      this.qualificationsCountAdd(1);
    }
    // existing entries gets the data from localstorage
    this.title = this.qualifications[this.id].title || '';
    this.description = this.qualifications[this.id].description || '';
  },
};
</script>


<style lang="scss" scoped>
  .qualfieldsCSSQD {
    position: relative;
    // width: 730rpx;
    // height: 50rpx;
    // background: rgb(253, 111, 111);
    padding: 50rpx;
  }
</style>
