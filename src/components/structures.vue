<template>
  <div class="containerCSSS">
    <app-structure-card
      v-if='structures'
      :key='structureIndex'
      v-for='(structure, structureIndex) in structures'
      :propStructure='structure'
      :propStructureIndex='structureIndex'
    >
    </app-structure-card>
    <wux-white-space />
    <div class='info_icon_CSSS'>
      <icon
        type="info"
        size="50"
        color='rgba(9,45,66,.08)'
      />
    </div>
    <wux-wing-blank body-style="margin-left:40px;margin-right:40px">
      <div class='info_content_CSSS'>Organize project behaviors into subcategories.</div>
      <div class='info_content_CSSS'>Strategize implementations for each subcategory.</div>
      <div class='info_content_CSSS'>Finalize a roadmap to reach the resulting behavior.</div>
    </wux-wing-blank>
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />
    <wux-white-space />

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
        structure.title = `Subcategory ${i}: ${this.structures[i].title}`;
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
      qualificationUpdate: 'qualificationUpdate',
      todosAdd: 'todosAdd',
      todosUpdate: 'todosUpdate',
      annotatesAdd: 'annotatesAdd',
      annotatesUpdate: 'annotatesUpdate',
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
          title: 'Add subcat. under a selected...',
          cancelText: 'cancel',
          confirmText: 'confirm',
        },
        onConfirm: (index) => {
          if (index) {
            structuresId = Number(index) + 1;
            this.structuresAdd({ structuresId, structureDetail });
            this.structuresCountAdd(1);
            wx.navigateTo({
              url: `/pages/structuredetail/main?id=${structuresId}`,
            });
          }
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
                  taskPics: [],
                  qualificationList: [],
                  bundleList: [],
                  todos: [],
                  todosCount: 0,
                  concerns: [],
                  concernsCount: 0,
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
                  key: `STRUCTURES_${i}_TASKS_${j}_PICS`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'picURLs',
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
                    const taskCurrent = that.structures[i].tasks[j];
                    for (let k = 0; k <= that.structures[i].tasks[j]
                      .qualificationList.length - 1; k += 1) {
                      that.qualificationUpdate({
                        index: k,
                        type: 'taskListAdd',
                        content: taskCurrent,
                      });
                    }
                  },
                });
                wx.getStorage({
                  key: `STRUCTURES_${i}_TASKS_${j}_BUNDLES`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'bundleList',
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
                wx.getStorage({
                  key: `STRUCTURES_${i}_TASKS_${j}_TODOSCOUNT`,
                  success(resTask) {
                    that.tasksUpdate({
                      boardIndex: i,
                      taskIndex: j,
                      type: 'todosCount',
                      content: resTask.data,
                    });
                    for (let k = 0; k <= that.structures[i].tasks[j].todosCount - 1; k += 1) {
                      const todoDetail = {
                        text: '',
                        done: false,
                        result: '',
                        showResult: false,
                        colorPicked: 0,
                      };
                      that.todosAdd({
                        boardIndex: i,
                        taskIndex: j,
                        type: 'refresh',
                        todoDetail,
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_TEXT`,
                        success(resTodo) {
                          that.todosUpdate({
                            boardIndex: i,
                            taskIndex: j,
                            todoIndex: k,
                            type: 'text',
                            content: resTodo.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_RESULT`,
                        success(resTodo) {
                          that.todosUpdate({
                            boardIndex: i,
                            taskIndex: j,
                            todoIndex: k,
                            type: 'result',
                            content: resTodo.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_DONE`,
                        success(resTodo) {
                          that.todosUpdate({
                            boardIndex: i,
                            taskIndex: j,
                            todoIndex: k,
                            type: 'done',
                            content: resTodo.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_SHOW`,
                        success(resTodo) {
                          that.todosUpdate({
                            boardIndex: i,
                            taskIndex: j,
                            todoIndex: k,
                            type: 'showResult',
                            content: resTodo.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_COLOR`,
                        success(resTodo) {
                          that.todosUpdate({
                            boardIndex: i,
                            taskIndex: j,
                            todoIndex: k,
                            type: 'colorPicked',
                            content: resTodo.data,
                          });
                        },
                      });
                    }
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
                  annotates: [],
                  annotatesCount: 0,
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
                wx.getStorage({
                  key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATESCOUNT`,
                  success(resBundle) {
                    that.bundlesUpdate({
                      boardIndex: i,
                      bundleIndex: j,
                      type: 'annotatesCount',
                      content: resBundle.data,
                    });
                    for (let k = 0; k <= that.structures[i].bundles[j].annotatesCount - 1; k += 1) {
                      const annotateDetail = {
                        text: '',
                        done: false,
                        result: '',
                        showResult: false,
                        colorPicked: 0,
                      };
                      that.annotatesAdd({
                        boardIndex: i,
                        bundleIndex: j,
                        type: 'refresh',
                        annotateDetail,
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_TEXT`,
                        success(resAnnotate) {
                          that.annotatesUpdate({
                            boardIndex: i,
                            bundleIndex: j,
                            annotateIndex: k,
                            type: 'text',
                            content: resAnnotate.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_RESULT`,
                        success(resAnnotate) {
                          that.annotatesUpdate({
                            boardIndex: i,
                            bundleIndex: j,
                            annotateIndex: k,
                            type: 'result',
                            content: resAnnotate.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_DONE`,
                        success(resAnnotate) {
                          that.annotatesUpdate({
                            boardIndex: i,
                            bundleIndex: j,
                            annotateIndex: k,
                            type: 'done',
                            content: resAnnotate.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_SHOW`,
                        success(resAnnotate) {
                          that.annotatesUpdate({
                            boardIndex: i,
                            bundleIndex: j,
                            annotateIndex: k,
                            type: 'showResult',
                            content: resAnnotate.data,
                          });
                        },
                      });
                      wx.getStorage({
                        key: `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_COLOR`,
                        success(resAnnotate) {
                          that.annotatesUpdate({
                            boardIndex: i,
                            bundleIndex: j,
                            annotateIndex: k,
                            type: 'colorPicked',
                            content: resAnnotate.data,
                          });
                        },
                      });
                    }
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
.info_icon_CSSS{
  width: 50px;
  margin: 0 auto;
}
.info_content_CSSS{
  width: 100%;
  padding: 2px 0 6px 0;
  text-align: center;
  font-size: 83%;
}
</style>
