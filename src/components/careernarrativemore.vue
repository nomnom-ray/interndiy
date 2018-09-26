<template>
  <div class="containerCSSCNM">
    <textarea
      class="textareaCSSCNM"
      v-model='narrativeMoreGETSET'
      :maxlength="200"
      placeholder="Career Narrative"
    >
    </textarea>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      narrativeMore: 'narrativeMore',
    }),
    narrativeMoreGETSET: {
      get() {
        return this.narrativeMore;
      },
      set(narrativeMore) {
        return this.narrativeMoreUpdate(narrativeMore);
      },
    },
  },
  methods: {
    ...mapActions({
      narrativeMoreUpdate: 'narrativeMoreUpdate',
    }),
  },
  mounted() {
    const that = this;
    wx.getStorage({
      key: 'NARRATIVEMORE',
      success(res) {
        that.narrativeMoreUpdate(res.data);
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.containerCSSCNM{
  .textareaCSSCNM{
    border: 2px solid rgb(190, 0, 165);
  }
}

</style>
