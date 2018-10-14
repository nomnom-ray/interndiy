<template>
  <a :href="detailURL">
    <div class="cardCSSPTC">
      <div>
        Index: {{indexCurrent}}
      </div>
      <div>
        title: {{propTask.title}}
      </div>
      <div>
        status: {{propTask.taskDone ? 'done' : 'not done'}}
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
  },
};
</script>

<style lang="scss" scoped>
.cardCSSTC {
  padding:5px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
}
</style>