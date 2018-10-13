/* eslint "no-param-reassign": 0 */
const state = {
  structures: [],
  structuresCount: 0,
};

const mutations = {
  // eslint-disable-next-line
  STRUCTURE_ADD(state, payload) {
    state.structures.splice(payload.structuresId, 0, payload.structureDetail);
  },
  // eslint-disable-next-line
  STRUCTURE_UPDATE(state, payload) {
    if (payload.type === 'title') {
      state.structures[payload.index].title = payload.content;
    }
    if (payload.type === 'conceptListSet') {
      state.structures[payload.index].conceptList = payload.content;
    }
    if (payload.type === 'tasksCount') {
      state.structures[payload.index].tasksCount = payload.content;
    }
    if (payload.type === 'bundlesCount') {
      state.structures[payload.index].bundlesCount = payload.content;
    }
    if (payload.type === 'bundleOpen') {
      state.structures[payload.index].bundleOpen = payload.content;
    }
  },
  // eslint-disable-next-line
  STRUCTURE_DEL(state, payload) {
    state.structures.splice(payload, 1);
  },
  // eslint-disable-next-line
  STRUCTURESCOUNT_ADD(state, payload) {
    state.structuresCount += payload;
  },
  // eslint-disable-next-line
  STRUCTURESCOUNT_DEL(state) {
    state.structuresCount -= 1;
  },
  // eslint-disable-next-line
  TASKS_ADD(state, payload) {
    state.structures[payload.boardIndex].tasks.push(payload.taskDetail);
  },
  // eslint-disable-next-line
  TASKS_DEL(state, payload) {
    state.structures[payload.boardIndex].tasks.splice(payload.taskIndex, 1);
  },
  // eslint-disable-next-line
  TASKS_REFRESH(state, payload) {
    const TaskLast = state.structures[payload.boardIndex].tasks.length;
    // console.log('before 1', TaskLast - 1, state
    //   .structures[payload.boardIndex].tasks[TaskLast - 1].taskDone);
    const TaskCutOut = state.structures[payload.boardIndex].tasks.splice(payload.taskIndex, 1)[0];
    // console.log('before 0', payload.taskIndex, TaskCutOut.taskDone);
    if (payload.type === 'taskToLast') {
      state.structures[payload.boardIndex].tasks.splice(TaskLast, 0, TaskCutOut);
    }
    if (payload.type === 'taskToFirst') {
      state.structures[payload.boardIndex].tasks.splice(0, 0, TaskCutOut);
    }
    // console.log('after 1', TaskLast - 1, state
    //   .structures[payload.boardIndex].tasks[TaskLast - 1].taskDone);
    // console.log('after 0', payload.taskIndex, state
    //   .structures[payload.boardIndex].tasks[payload.taskIndex].taskDone);
  },
  // eslint-disable-next-line
  TASKS_UPDATE(state, payload) {
    if (payload.type === 'title') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .title = payload.content;
    }
    if (payload.type === 'qualificationList') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .qualificationList = payload.content;
    }
    if (payload.type === 'taskDone') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .taskDone = payload.content;
    }
  },
  // eslint-disable-next-line
  BUNDLES_ADD(state, payload) {
    state.structures[payload.boardIndex].bundles.push(payload.bundleDetail);
  },
  // eslint-disable-next-line
  BUNDLES_UPDATE(state, payload) {
    if (payload.type === 'title') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .title = payload.content;
    }
    if (payload.type === 'picURLs') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .structurePics = payload.content;
    }
  },
  // eslint-disable-next-line
  BUNDLES_DEL(state, payload) {
    state.structures[payload.boardIndex].bundles.splice(payload.bundleIndex, 1);
  },
};

const actions = {
  structuresAdd: ({ commit }, payload) => {
    commit('STRUCTURE_ADD', payload);
  },
  structuresUpdate: ({ commit }, payload) => {
    commit('STRUCTURE_UPDATE', payload);
  },
  structuresDel: ({ commit }, payload) => {
    commit('STRUCTURE_DEL', payload);
  },
  structuresCountAdd: ({ commit }, payload) => {
    commit('STRUCTURESCOUNT_ADD', payload);
  },
  structuresCountDel: ({ commit }) => {
    commit('STRUCTURESCOUNT_DEL');
  },
  tasksAdd: ({ commit }, payload) => {
    commit('TASKS_ADD', payload);
  },
  tasksDel: ({ commit }, payload) => {
    commit('TASKS_DEL', payload);
  },
  tasksRefresh: ({ commit }, payload) => {
    commit('TASKS_REFRESH', payload);
  },
  tasksUpdate: ({ commit }, payload) => {
    commit('TASKS_UPDATE', payload);
  },
  bundlesAdd: ({ commit }, payload) => {
    commit('BUNDLES_ADD', payload);
  },
  bundlesUpdate: ({ commit }, payload) => {
    commit('BUNDLES_UPDATE', payload);
  },
  bundlesDel: ({ commit }, payload) => {
    commit('BUNDLES_DEL', payload);
  },
};

const getters = {
  structures: () => state.structures,
  structuresCount: () => state.structuresCount,
};

const localStorageAPI = {
  save(payload, type) {
    wx.setStorage({
      key: type,
      data: payload,
      // success(res) {
      //   console.log('set', type, ': ', res);
      // },
    });
  },
  remove(type) {
    wx.removeStorage({
      key: type,
      // success(res) {
      // },
    });
  },
};

const autosavePlugin = (store) => {
  // eslint-disable-next-line
  store.subscribe((mutation) => {
    if (mutation.type === 'STRUCTURE_ADD') {
      for (let i = mutation.payload.structuresId + 1;
        i <= state.structures.length - 1; i += 1) {
        const strucObject = state.structures[i];
        const strucTitle = strucObject.title;
        localStorageAPI.save(strucTitle, `STRUCTURES_${i}_TITLE`);
        const strucConcepts = strucObject.conceptList;
        localStorageAPI.save(strucConcepts, `STRUCTURES_${i}_CONCEPTS`);
        const strucTasksCount = strucObject.tasksCount;
        localStorageAPI.save(strucTasksCount, `STRUCTURES_${i}_TASKSCOUNT`);
        const strucbundlesCount = strucObject.bundlesCount;
        localStorageAPI.save(strucbundlesCount, `STRUCTURES_${i}_BUNDLESCOUNT`);
        const strucbundleOpen = strucObject.bundleOpen;
        localStorageAPI.save(strucbundleOpen, `STRUCTURES_${i}_BUNDLEOPEN`);
      }
    }
    if (mutation.type === 'STRUCTURE_UPDATE') {
      const strucObject = state.structures[mutation.payload.index];
      const strucId = mutation.payload.index;
      if (mutation.payload.type === 'title') {
        const strucTitle = strucObject.title;
        localStorageAPI.save(strucTitle, `STRUCTURES_${strucId}_TITLE`);
      }
      if (mutation.payload.type === 'conceptListSet') {
        const strucConcepts = strucObject.conceptList;
        localStorageAPI.save(strucConcepts, `STRUCTURES_${strucId}_CONCEPTS`);
      }
      if (mutation.payload.type === 'tasksCount') {
        const strucTasksCount = strucObject.tasksCount;
        localStorageAPI.save(strucTasksCount, `STRUCTURES_${strucId}_TASKSCOUNT`);
      }
      if (mutation.payload.type === 'bundlesCount') {
        const strucbundlesCount = strucObject.bundlesCount;
        localStorageAPI.save(strucbundlesCount, `STRUCTURES_${strucId}_BUNDLESCOUNT`);
      }
      if (mutation.payload.type === 'bundleOpen') {
        const strucbundleOpen = strucObject.bundleOpen;
        localStorageAPI.save(strucbundleOpen, `STRUCTURES_${strucId}_BUNDLEOPEN`);
      }
    }
    if (mutation.type === 'STRUCTURESCOUNT_ADD') {
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    if (mutation.type === 'STRUCTURESCOUNT_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        localStorageAPI.save(state.structures[i].title, `STRUCTURES_${i}_TITLE`);
        localStorageAPI.save(state.structures[i].conceptList, `STRUCTURES_${i}_CONCEPTS`);
        localStorageAPI.save(state.structures[i].tasks, `STRUCTURES_${i}_TASKS`);
        localStorageAPI.save(state.structures[i].tasksCount, `STRUCTURES_${i}_TASKSCOUNT`);
        localStorageAPI.save(state.structures[i].bundles, `STRUCTURES_${i}_BUNDLES`);
        localStorageAPI.save(state.structures[i].bundlesCount, `STRUCTURES_${i}_BUNDLESCOUNT`);
        localStorageAPI.save(state.structures[i].bundleOpen, `STRUCTURES_${i}_BUNDLEOPEN`);
      }
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TITLE`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_CONCEPTS`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TASKS`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TASKSCOUNT`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_BUNDLES`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_BUNDLESCOUNT`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_BUNDLEOPEN`);
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    // TODO: check if including the type condition is enough to delete the low level properties
    if (mutation.type === 'TASKS_ADD') {
      if (mutation.payload.type === 'add') {
        const boardId = mutation.payload.boardIndex;
        const strucObject = state.structures[boardId];
        const taskId = strucObject.tasks.length - 1;
        const taskTitle = strucObject.tasks[taskId].title;
        const done = strucObject.tasks[taskId].taskDone;
        localStorageAPI.save(taskTitle, `STRUCTURES_${boardId}_TASKS_${taskId}_TITLE`);
        localStorageAPI.save(done, `STRUCTURES_${boardId}_TASKS_${taskId}_DONE`);
      }
    }
    if (mutation.type === 'TASKS_UPDATE') {
      const boardId = mutation.payload.boardIndex;
      const taskId = mutation.payload.taskIndex;
      const taskObject = state.structures[boardId].tasks[taskId];
      if (mutation.payload.type === 'title') {
        const taskTitle = taskObject.title;
        localStorageAPI.save(taskTitle, `STRUCTURES_${boardId}_TASKS_${taskId}_TITLE`);
      }
      if (mutation.payload.type === 'qualificationList') {
        const taskQualifications = taskObject.qualificationList;
        localStorageAPI.save(taskQualifications, `STRUCTURES_${boardId}_TASKS_${taskId}_QUALIFICATIONS`);
      }
      if (mutation.payload.type === 'taskDone') {
        const done = taskObject.taskDone;
        localStorageAPI.save(done, `STRUCTURES_${boardId}_TASKS_${taskId}_DONE`);
      }
    }
    if (mutation.type === 'TASKS_REFRESH') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].tasks.length - 1; j += 1) {
          localStorageAPI.save(state.structures[i].tasks[j].title, `STRUCTURES_${i}_TASKS_${j}_TITLE`);
          localStorageAPI.save(state.structures[i].tasks[j].qualificationList, `STRUCTURES_${i}_TASKS_${j}_QUALIFICATIONS`);
          localStorageAPI.save(state.structures[i].tasks[j].taskDone, `STRUCTURES_${i}_TASKS_${j}_DONE`);
        }
      }
    }
    if (mutation.type === 'TASKS_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].tasks.length - 1; j += 1) {
          localStorageAPI.save(state.structures[i].tasks[j].title, `STRUCTURES_${i}_TASKS_${j}_TITLE`);
          localStorageAPI.save(state.structures[i].tasks[j].qualificationList, `STRUCTURES_${i}_TASKS_${j}_QUALIFICATIONS`);
          localStorageAPI.save(state.structures[i].tasks[j].taskDone, `STRUCTURES_${i}_TASKS_${j}_DONE`);
        }
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_TITLE`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_QUALIFICATIONS`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_DONE`);
      }
    }
    if (mutation.type === 'BUNDLES_ADD') {
      if (mutation.payload.type === 'add') {
        const boardId = mutation.payload.boardIndex;
        const strucObject = state.structures[boardId];
        const bundleId = strucObject.bundles.length - 1;
        const bundleTitle = strucObject.bundles[bundleId].title;
        localStorageAPI.save(bundleTitle, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_TITLE`);
        const bundlePics = strucObject.bundles[bundleId].structurePics;
        localStorageAPI.save(bundlePics, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_PICS`);
      }
    }
    if (mutation.type === 'BUNDLES_UPDATE') {
      const boardId = mutation.payload.boardIndex;
      const bundleId = mutation.payload.bundleIndex;
      const bundleObject = state.structures[boardId].bundles[bundleId];
      if (mutation.payload.type === 'title') {
        const bundleTitle = bundleObject.title;
        localStorageAPI.save(bundleTitle, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_TITLE`);
      }
      if (mutation.payload.type === 'picURLs') {
        const bundlePics = bundleObject.structurePics;
        localStorageAPI.save(bundlePics, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_PICS`);
      }
    }
    if (mutation.type === 'BUNDLES_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].bundles.length - 1; j += 1) {
          localStorageAPI.save(state.structures[i].bundles[j].title, `STRUCTURES_${i}_BUNDLES_${j}_TITLE`);
          localStorageAPI.save(state.structures[i].bundles[j].structurePics, `STRUCTURES_${i}_BUNDLES_${j}_PICS`);
        }
        localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${state.structures[i].bundles.length}_TITLE`);
        localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${state.structures[i].bundles.length}_PICS`);
      }
    }
    // eslint-disable-next-line
    return;
  });
};

export default {
  state,
  mutations,
  actions,
  getters,
  autosavePlugin,
};
