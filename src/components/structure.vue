<template>
  <div class="containerCSSS">
    <div
      v-if='!structuresLocal.length'
    >
    when there are no boards, show instruction.
    </div>
    <icon
      v-if='!structuresLocal.length'
      type="info"
      size="40"
      color='rbg(0, 255, 255)'/>
    <app-structure-card
      :key='structureIndex'
      v-for='(structure, structureIndex) in structures'
      :propStructure='structure'
      :propStructureIndex='structureIndex'
    >
    </app-structure-card>
    <wux-select id="wux-select1" />
    <wux-floating-button 
      position="bottomRight"
      theme="assertive"
      :actionRotate="false"
      @change="structureAdd" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { $wuxSelect } from '../util/wux';
import StructureCard from './structurecard';

export default {
  components: {
    appStructureCard: StructureCard,
  },
  data() {
    return {
      boardPicked: 0,
      structuresLocal: [],
    };
  },
  computed: {
    ...mapGetters({
      structures: 'structures',
      structuresCount: 'structuresCount',
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
      structuresAdd: 'structuresAdd',
      structuresDel: 'structuresDel',
      structuresCountAdd: 'structuresCountAdd',
      structuresCountDel: 'structuresCountDel',
      structuresUpdate: 'structuresUpdate',
      structurePicsAdd: 'structurePicsAdd',
    }),
    structureAdd() {
      let structuresId = 0;
      const structureDetail = {
        title: '',
      };
      if (this.structures.length === 0) {
        this.structuresAdd({ structuresId, structureDetail });
        this.structuresCountAdd(1);
        wx.navigateTo({
          url: `/pages/structuredetail/main?id=${structuresId}`,
        });
        return;
      }
      $wuxSelect('#wux-select1').open({
        options: this.structuresLocal,
        toolbar: {
          title: 'Add a new board under...',
          cancelText: 'cancel',
          confirmText: 'confirm',
        },
        onConfirm: (index) => {
          this.boardPicked = index;
          structuresId = Number(this.boardPicked) + 1;
          this.structuresAdd({ structuresId, structureDetail });
          this.structuresCountAdd(1);
          wx.navigateTo({
            url: `/pages/structuredetail/main?id=${structuresId}`,
          });
        },
      });
    },
  },
  // watch: {
  //   boardPicked() {
  //     console.log(this.boardPicked);
  //   },
  // },
  created() {
    const that = this;
    wx.getStorage({
      key: 'STRUCTURESCOUNT',
      success(resCount) {
        // add can't have its sync to storage, because it'll overwrite before update
        that.structuresCountAdd(resCount.data);
        for (let i = 0; i <= that.structuresCount - 1; i += 1) {
          const structureDetail = {
            title: '',
          };
          that.structuresAdd({ structuresId: i, structureDetail });
          wx.getStorage({
            key: `STRUCTURES_${i}_TITLE`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'title', content: resStruc.data });
            },
          });
        }
      },
    });
    wx.getStorage({
      key: 'STRUCTUREPICS',
      success(res) {
        for (let i = 0; i <= res.data.length - 1; i += 1) {
          that.structurePicsAdd({ boardId: i, urls: res.data[i] });
        }
      },
    });
  },
};
</script>


<style lang="scss" scoped>
</style>