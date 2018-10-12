<template>
  <div>
    bundle: {{boardId}} + {{bundleId}}
    <input
      class="titleCSSSB"
      v-model='title'
      :maxlength="100"
      placeholder="bundle Title"
    >
    <wux-button
      block
      outline
      type="assertive"
      :disabled="clicked"
      @click='bundleDelete'
    >Delete
    </wux-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      boardId: 0,
      bundleId: 0,
      clicked: false,
      title: '',
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      pageActive: 'pageActive',
    }),
  },
  methods: {
    ...mapActions({
      tasksAdd: 'tasksAdd',
      tasksDel: 'tasksDel',
      tasksUpdate: 'tasksUpdate',
      structuresUpdate: 'structuresUpdate',
      qualificationUpdate: 'qualificationUpdate',
      bundlesUpdate: 'bundlesUpdate',
      bundlesDel: 'bundlesDel',
    }),
    bundleDelete() {
      if (this.clicked) {
        return;
      }
      this.clicked = true;
      this.bundlesDel({ boardIndex: this.boardId, bundleIndex: this.bundleId });
      this.structuresUpdate({
        index: this.boardId,
        type: 'bundlesCount',
        content: this.structures[this.boardId].bundles.length,
      });
      wx.navigateBack();
    },
  },
  watch: {
    title() {
      this.bundlesUpdate({
        boardIndex: this.boardId,
        bundleIndex: this.bundleId,
        type: 'title',
        content: this.title,
      });
    },
  },
  mounted() {
    this.boardId = Number(this.$root.$mp.query.board);
    this.bundleId = Number(this.$root.$mp.query.bundle);
    this.clicked = false;
    this.title = this.structures[this.boardId].bundles[this.bundleId].title || '';
  },
};
</script>

<style lang="scss" scoped>
  .titleCSSSB {
    position: relative;
    border: 2px solid rgb(190, 0, 165);
    padding: 50rpx;
  }
</style>