<template>
  <div>
    <input 
      class="qualfieldsCSSSD"
      v-model='title'
      :maxlength="100"
      placeholder="Board Title"
    >
    <wux-icon type='ios-help-circlr-outline' size='32' />
    <van-button
      type='default'
      @click='presentationDelete'
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
      id: 0,
      clicked: false,
      title: '',
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      structuresCount: 'structuresCount',
    }),
  },
  methods: {
    ...mapActions({
      structuresAdd: 'structuresAdd',
      structuresDel: 'structuresDel',
      structuresCountAdd: 'structuresCountAdd',
      structuresCountDel: 'structuresCountDel',
      structuresUpdate: 'structuresUpdate',
    }),
    presentationDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.structuresDel(this.id);
      this.structuresCountDel();
      wx.navigateBack();
    },
  },
  watch: {
    title() {
      // console.log(this.structures);
      this.structuresUpdate({ index: this.id, type: 'title', content: this.title });
    },
  },
  mounted() {
    // the id passed to this page by wx.navigateTo()
    this.id = Number(this.$root.$mp.query.id);
    // console.log(this.$root.$mp.page.data.$root[0]);
    this.clicked = false;
    // existing entries gets the data from localstorage
    this.title = this.structures[this.id].title || '';
    // this.description = this.qualifications[this.id].description || '';
  },
};
</script>


<style lang="scss" scoped>
</style>