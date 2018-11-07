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
  TASKS_UPDATE(state, payload) {
    if (payload.type === 'title') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .title = payload.content;
    }
    if (payload.type === 'qualificationList') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .qualificationList = payload.content;
    }
    if (payload.type === 'bundleList') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .bundleList = payload.content;
    }
    if (payload.type === 'taskDone') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .taskDone = payload.content;
    }
    if (payload.type === 'todosCount') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todosCount = payload.content;
    }
    if (payload.type === 'concernsCount') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .concernsCount = payload.content;
    }
    if (payload.type === 'picURLs') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .taskPics = payload.content;
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
    if (payload.type === 'annotatesCount') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotatesCount = payload.content;
    }
  },
  // eslint-disable-next-line
  BUNDLES_DEL(state, payload) {
    state.structures[payload.boardIndex].bundles.splice(payload.bundleIndex, 1);
  },
  // eslint-disable-next-line
  TODOS_ADD(state, payload) {
    state.structures[payload.boardIndex].tasks[payload.taskIndex].todos.push(payload.todoDetail);
  },
  // eslint-disable-next-line
  TODOS_UPDATE(state, payload) {
    if (payload.type === 'text') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todos[payload.todoIndex].text = payload.content;
    }
    if (payload.type === 'result') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todos[payload.todoIndex].result = payload.content;
    }
    if (payload.type === 'done') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todos[payload.todoIndex].done = payload.content;
    }
    if (payload.type === 'showResult') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todos[payload.todoIndex].showResult = payload.content;
    }
    if (payload.type === 'colorPicked') {
      state.structures[payload.boardIndex].tasks[payload.taskIndex]
        .todos[payload.todoIndex].colorPicked = payload.content;
    }
  },
  // eslint-disable-next-line
  TODOS_DEL(state, payload) {
    state.structures[payload.boardIndex].tasks[payload.taskIndex].todos
      .splice(payload.todoIndex, 1);
  },
  // eslint-disable-next-line
  ANNOTATES_ADD(state, payload) {
    state.structures[payload.boardIndex].bundles[payload.bundleIndex]
      .annotates.push(payload.annotateDetail);
  },
  // eslint-disable-next-line
  ANNOTATES_UPDATE(state, payload) {
    if (payload.type === 'text') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotates[payload.annotateIndex].text = payload.content;
    }
    if (payload.type === 'result') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotates[payload.annotateIndex].result = payload.content;
    }
    if (payload.type === 'done') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotates[payload.annotateIndex].done = payload.content;
    }
    if (payload.type === 'showResult') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotates[payload.annotateIndex].showResult = payload.content;
    }
    if (payload.type === 'colorPicked') {
      state.structures[payload.boardIndex].bundles[payload.bundleIndex]
        .annotates[payload.annotateIndex].colorPicked = payload.content;
    }
  },
  // eslint-disable-next-line
  ANNOTATES_DEL(state, payload) {
    state.structures[payload.boardIndex].bundles[payload.bundleIndex]
      .annotates.splice(payload.annotateIndex, 1);
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
  todosAdd: ({ commit }, payload) => {
    commit('TODOS_ADD', payload);
  },
  todosUpdate: ({ commit }, payload) => {
    commit('TODOS_UPDATE', payload);
  },
  todosDel: ({ commit }, payload) => {
    commit('TODOS_DEL', payload);
  },
  annotatesAdd: ({ commit }, payload) => {
    commit('ANNOTATES_ADD', payload);
  },
  annotatesUpdate: ({ commit }, payload) => {
    commit('ANNOTATES_UPDATE', payload);
  },
  annotatesDel: ({ commit }, payload) => {
    commit('ANNOTATES_DEL', payload);
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
        // TODO: concept could go
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
        const {
          title,
          taskDone,
          taskPics,
          todosCount,
          concernsCount,
        } = strucObject.tasks[taskId];
        localStorageAPI.save(title, `STRUCTURES_${boardId}_TASKS_${taskId}_TITLE`);
        localStorageAPI.save(taskDone, `STRUCTURES_${boardId}_TASKS_${taskId}_DONE`);
        localStorageAPI.save(taskPics, `STRUCTURES_${boardId}_TASKS_${taskId}_PICS`);
        localStorageAPI.save(todosCount, `STRUCTURES_${boardId}_TASKS_${taskId}_TODOSCOUNT`);
        localStorageAPI.save(concernsCount, `STRUCTURES_${boardId}_TASKS_${taskId}_CONCERNSCOUNT`);
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
      if (mutation.payload.type === 'picURLs') {
        const { taskPics } = taskObject;
        localStorageAPI.save(taskPics, `STRUCTURES_${boardId}_TASKS_${taskId}_PICS`);
      }
      if (mutation.payload.type === 'qualificationList') {
        const taskQualifications = taskObject.qualificationList;
        localStorageAPI.save(taskQualifications, `STRUCTURES_${boardId}_TASKS_${taskId}_QUALIFICATIONS`);
      }
      if (mutation.payload.type === 'bundleList') {
        const taskBundles = taskObject.bundleList;
        localStorageAPI.save(taskBundles, `STRUCTURES_${boardId}_TASKS_${taskId}_BUNDLES`);
      }
      if (mutation.payload.type === 'taskDone') {
        const done = taskObject.taskDone;
        localStorageAPI.save(done, `STRUCTURES_${boardId}_TASKS_${taskId}_DONE`);
      }
      if (mutation.payload.type === 'todosCount') {
        const { todosCount } = taskObject;
        localStorageAPI.save(todosCount, `STRUCTURES_${boardId}_TASKS_${taskId}_TODOSCOUNT`);
      }
      if (mutation.payload.type === 'concernsCount') {
        const { concernsCount } = taskObject;
        localStorageAPI.save(concernsCount, `STRUCTURES_${boardId}_TASKS_${taskId}_CONCERNSCOUNT`);
      }
    }
    if (mutation.type === 'TASKS_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].tasks.length - 1; j += 1) {
          localStorageAPI.save(state.structures[i].tasks[j].title, `STRUCTURES_${i}_TASKS_${j}_TITLE`);
          localStorageAPI.save(state.structures[i].tasks[j].taskPics, `STRUCTURES_${i}_TASKS_${j}_PICS`);
          localStorageAPI.save(state.structures[i].tasks[j].qualificationList, `STRUCTURES_${i}_TASKS_${j}_QUALIFICATIONS`);
          localStorageAPI.save(state.structures[i].tasks[j].bundleList, `STRUCTURES_${i}_TASKS_${j}_BUNDLES`);
          localStorageAPI.save(state.structures[i].tasks[j].taskDone, `STRUCTURES_${i}_TASKS_${j}_DONE`);
          localStorageAPI.save(state.structures[i].tasks[j].todosCount, `STRUCTURES_${i}_TASKS_${j}_TODOSCOUNT`);
          localStorageAPI.save(state.structures[i].tasks[j].concernsCount, `STRUCTURES_${i}_TASKS_${j}_CONCERNSCOUNT`);
        }
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_TITLE`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_PICS`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_QUALIFICATIONS`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_BUNDLES`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_DONE`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_TODOSCOUNT`);
        localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${state.structures[i].tasks.length}_CONCERNSCOUNT`);
      }
    }
    if (mutation.type === 'BUNDLES_ADD') {
      if (mutation.payload.type === 'add') {
        const boardId = mutation.payload.boardIndex;
        const strucObject = state.structures[boardId];
        const bundleId = strucObject.bundles.length - 1;
        const {
          title,
          structurePics,
          annotatesCount,
        } = strucObject.bundles[bundleId];
        localStorageAPI.save(title, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_TITLE`);
        localStorageAPI.save(structurePics, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_PICS`);
        localStorageAPI
          .save(annotatesCount, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_ANNOTATESCOUNT`);
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
      if (mutation.payload.type === 'annotatesCount') {
        const bundlePics = bundleObject.annotatesCount;
        localStorageAPI.save(bundlePics, `STRUCTURES_${boardId}_BUNDLES_${bundleId}_ANNOTATESCOUNT`);
      }
    }
    if (mutation.type === 'BUNDLES_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].bundles.length - 1; j += 1) {
          localStorageAPI.save(state.structures[i].bundles[j].title, `STRUCTURES_${i}_BUNDLES_${j}_TITLE`);
          localStorageAPI.save(state.structures[i].bundles[j].structurePics, `STRUCTURES_${i}_BUNDLES_${j}_PICS`);
          localStorageAPI.save(state.structures[i].bundles[j].annotatesCount, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATESCOUNT`);
        }
        localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${state.structures[i].bundles.length}_TITLE`);
        localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${state.structures[i].bundles.length}_PICS`);
        localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${state.structures[i].bundles.length}_ANNOTATESCOUNT`);
      }
    }
    if (mutation.type === 'TODOS_ADD') {
      if (mutation.payload.type === 'add') {
        const { boardIndex, taskIndex } = mutation.payload;
        const tasksObject = state.structures[boardIndex].tasks[taskIndex];
        const todoIndex = tasksObject.todos.length - 1;
        const {
          text,
          result,
          done,
          showResult,
          colorPicked,
        } = tasksObject.todos[todoIndex];
        localStorageAPI.save(text, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_TEXT`);
        localStorageAPI.save(result, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_RESULT`);
        localStorageAPI.save(done, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_DONE`);
        localStorageAPI.save(showResult, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_SHOW`);
        localStorageAPI.save(colorPicked, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_COLOR`);
      }
    }
    if (mutation.type === 'TODOS_UPDATE') {
      const { boardIndex, taskIndex, todoIndex } = mutation.payload;
      const todosObject = state.structures[boardIndex].tasks[taskIndex].todos[todoIndex];
      if (mutation.payload.type === 'text') {
        const { text } = todosObject;
        localStorageAPI.save(text, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_TEXT`);
      }
      if (mutation.payload.type === 'result') {
        const { result } = todosObject;
        localStorageAPI.save(result, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_RESULT`);
      }
      if (mutation.payload.type === 'done') {
        const { done } = todosObject;
        localStorageAPI
          .save(done, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_DONE`);
      }
      if (mutation.payload.type === 'showResult') {
        const { showResult } = todosObject;
        localStorageAPI.save(showResult, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_SHOW`);
      }
      if (mutation.payload.type === 'colorPicked') {
        const { colorPicked } = todosObject;
        localStorageAPI.save(colorPicked, `STRUCTURES_${boardIndex}_TASKS_${taskIndex}_TODOS_${todoIndex}_COLOR`);
      }
    }
    if (mutation.type === 'TODOS_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].tasks.length - 1; j += 1) {
          for (let k = 0; k <= state.structures[i].tasks[j].todos.length - 1; k += 1) {
            localStorageAPI.save(state.structures[i].tasks[j].todos[k]
              .text, `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_TEXT`);
            localStorageAPI.save(state.structures[i].tasks[j].todos[k]
              .result, `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_RESULT`);
            localStorageAPI.save(state.structures[i].tasks[j].todos[k]
              .done, `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_DONE`);
            localStorageAPI.save(state.structures[i].tasks[j].todos[k]
              .showResult, `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_SHOW`);
            localStorageAPI.save(state.structures[i].tasks[j].todos[k]
              .colorPicked, `STRUCTURES_${i}_TASKS_${j}_TODOS_${k}_COLOR`);
          }
          localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${j}_TODOS_${state.structures[i].tasks[j]
            .todos.length}_TEXT`);
          localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${j}_TODOS_${state.structures[i].tasks[j]
            .todos.length}_RESULT`);
          localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${j}_TODOS_${state.structures[i].tasks[j]
            .todos.length}_DONE`);
          localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${j}_TODOS_${state.structures[i].tasks[j]
            .todos.length}_SHOW`);
          localStorageAPI.remove(`STRUCTURES_${i}_TASKS_${j}_TODOS_${state.structures[i].tasks[j]
            .todos.length}_COLOR`);
        }
      }
    }
    if (mutation.type === 'ANNOTATES_ADD') {
      if (mutation.payload.type === 'add') {
        const { boardIndex, bundleIndex } = mutation.payload;
        const bundlesObject = state.structures[boardIndex].bundles[bundleIndex];
        const annotateIndex = bundlesObject.annotates.length - 1;
        const {
          text,
          result,
          done,
          showResult,
          colorPicked,
        } = bundlesObject.annotates[annotateIndex];
        localStorageAPI.save(text, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_TEXT`);
        localStorageAPI.save(result, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_RESULT`);
        localStorageAPI.save(done, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_DONE`);
        localStorageAPI.save(showResult, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_SHOW`);
        localStorageAPI.save(colorPicked, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_COLOR`);
      }
    }
    if (mutation.type === 'ANNOTATES_UPDATE') {
      const { boardIndex, bundleIndex, annotateIndex } = mutation.payload;
      const annotatesObject = state.structures[boardIndex].bundles[bundleIndex]
        .annotates[annotateIndex];
      if (mutation.payload.type === 'text') {
        const { text } = annotatesObject;
        localStorageAPI.save(text, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_TEXT`);
      }
      if (mutation.payload.type === 'result') {
        const { result } = annotatesObject;
        localStorageAPI.save(result, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_RESULT`);
      }
      if (mutation.payload.type === 'done') {
        const { done } = annotatesObject;
        localStorageAPI
          .save(done, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_DONE`);
      }
      if (mutation.payload.type === 'showResult') {
        const { showResult } = annotatesObject;
        localStorageAPI.save(showResult, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_SHOW`);
      }
      if (mutation.payload.type === 'colorPicked') {
        const { colorPicked } = annotatesObject;
        localStorageAPI.save(colorPicked, `STRUCTURES_${boardIndex}_BUNDLES_${bundleIndex}_ANNOTATES_${annotateIndex}_COLOR`);
      }
    }
    if (mutation.type === 'ANNOTATES_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        for (let j = 0; j <= state.structures[i].bundles.length - 1; j += 1) {
          for (let k = 0; k <= state.structures[i].bundles[j].annotates.length - 1; k += 1) {
            localStorageAPI.save(state.structures[i].bundles[j].annotates[k]
              .text, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_TEXT`);
            localStorageAPI.save(state.structures[i].bundles[j].annotates[k]
              .result, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_RESULT`);
            localStorageAPI.save(state.structures[i].bundles[j].annotates[k]
              .done, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_DONE`);
            localStorageAPI.save(state.structures[i].bundles[j].annotates[k]
              .showResult, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_SHOW`);
            localStorageAPI.save(state.structures[i].bundles[j].annotates[k]
              .colorPicked, `STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${k}_COLOR`);
          }
          localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${state.structures[i].bundles[j]
            .annotates.length}_TEXT`);
          localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${state.structures[i].bundles[j]
            .annotates.length}_RESULT`);
          localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${state.structures[i].bundles[j]
            .annotates.length}_DONE`);
          localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${state.structures[i].bundles[j]
            .annotates.length}_SHOW`);
          localStorageAPI.remove(`STRUCTURES_${i}_BUNDLES_${j}_ANNOTATES_${state.structures[i].bundles[j]
            .annotates.length}_COLOR`);
        }
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
