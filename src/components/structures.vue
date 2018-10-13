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
      v-if='structures'
      :key='structureIndex'
      v-for='(structure, structureIndex) in structures'
      :propStructure='structure'
      :propStructureIndex='structureIndex'
    >
    </app-structure-card>
    <wux-select id="wux-select-structure" />
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
      // boardPicked & structuresLocal both for $wuxselect
      structuresLocal: [],
    };
  },
  computed: {
    ...mapGetters({
      // need structuresCount for tracking in localstorage
      structures: 'structures',
      structuresCount: 'structuresCount',
    }),
    // structuresLocalNew refresh $wuxselect in case this.subjects changes
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
      tasksAdd: 'tasksAdd',
      tasksUpdate: 'tasksUpdate',
      bundlesAdd: 'bundlesAdd',
      bundlesUpdate: 'bundlesUpdate',
    }),
    // add a structure (i.e. board) from the selector if not the first board
    structureAdd() {
      let structuresId = 0;
      const structureDetail = {
        title: '',
        bundlesCount: 0,
        bundles: [],
        conceptList: [],
        tasks: [],
        tasksCount: 0,
        bundleOpen: '0',
      };
      if (this.structures.length === 0) {
        this.structuresAdd({ structuresId, structureDetail });
        this.structuresCountAdd(1);
        wx.navigateTo({
          url: `/pages/structuredetail/main?id=${structuresId}`,
        });
        return;
      }
      $wuxSelect('#wux-select-structure').open({
        options: this.structuresLocal,
        toolbar: {
          title: 'Add a new board under...',
          cancelText: 'cancel',
          confirmText: 'confirm',
        },
        onConfirm: (index) => {
          structuresId = Number(index) + 1;
          this.structuresAdd({ structuresId, structureDetail });
          this.structuresCountAdd(1);
          wx.navigateTo({
            url: `/pages/structuredetail/main?id=${structuresId}`,
          });
        },
      });
    },
  },
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
            bundlesCount: 0,
            bundles: [],
            conceptList: [],
            tasks: [],
            tasksCount: 0,
            bundleOpen: '0',
          };
          that.structuresAdd({ structuresId: i, structureDetail });
          wx.getStorage({
            key: `STRUCTURES_${i}_TITLE`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'title', content: resStruc.data });
            },
          });
          wx.getStorage({
            key: `STRUCTURES_${i}_CONCEPTS`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'conceptListSet', content: resStruc.data });
            },
          });
          wx.getStorage({
            key: `STRUCTURES_${i}_TASKSCOUNT`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'tasksCount', content: resStruc.data });
              for (let j = 0; j <= that.structures[i].tasksCount - 1; j += 1) {
                const taskDetail = {
                  title: '',
                  taskDone: false,
                  checkList: [],
                  taskPics: [],
                  qualificationList: [],
                };
                that.tasksAdd({ boardIndex: i, type: 'refresh', taskDetail });
                wx.getStorage({
                  key: `STRUCTURES_${i}_TASKS_${j}_TITLE`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'title',
                      content: resTask.data,
                    });
                  },
                });
                wx.getStorage({
                  key: `STRUCTURES_${i}_TASKS_${j}_QUALIFICATIONS`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'qualificationList',
                      content: resTask.data,
                    });
                  },
                });
                wx.getStorage({
                  key: `STRUCTURES_${i}_TASKS_${j}_DONE`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'taskDone',
                      content: resTask.data,
                    });
                  },
                });
              }
            },
          });
          wx.getStorage({
            key: `STRUCTURES_${i}_BUNDLESCOUNT`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'bundlesCount', content: resStruc.data });
              for (let j = 0; j <= that.structures[i].bundlesCount - 1; j += 1) {
                const bundleDetail = {
                  title: '',
                  structurePics: [],
                };
                that.bundlesAdd({ boardIndex: i, type: 'refresh', bundleDetail });
                wx.getStorage({
                  key: `STRUCTURES_${i}_BUNDLES_${j}_TITLE`,
                  success(resBundle) {
                    that.bundlesUpdate({
                      boardIndex: i,
                      bundleIndex: j,
                      type: 'title',
                      content: resBundle.data,
                    });
                  },
                });
                wx.getStorage({
                  key: `STRUCTURES_${i}_BUNDLES_${j}_PICS`,
                  success(resBundle) {
                    that.bundlesUpdate({
                      boardIndex: i,
                      bundleIndex: j,
                      type: 'picURLs',
                      content: resBundle.data,
                    });
                  },
                });
              }
            },
          });
          wx.getStorage({
            key: `STRUCTURES_${i}_BUNDLEOPEN`,
            success(resStruc) {
              that.structuresUpdate({ index: i, type: 'bundleOpen', content: resStruc.data });
            },
          });
        }
      },
    });
  },
};
</script>


<style lang="scss" scoped>
</style>