/* eslint "no-param-reassign": 0 */
const state = {
  structures: [],
  structurePics: [],
  conceptList: [],
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
  STRUCTUREPICS_ADD(state, payload) {
    // console.log('payload.boardId', payload.boardId);
    // console.log('length', state.structurePics.length);

    if (payload.boardId >= state.structurePics.length) {
      state.structurePics.push(payload.urls);
    } else {
      state.structurePics[payload.boardId] = state.structurePics[payload.boardId]
        .concat(payload.urls);
    }
  },
  // eslint-disable-next-line
  STRUCTUREPICS_DEL(state, payload) {
    state.structurePics[payload.boardIndex].splice(payload.currentDel, 1);
  },
  // eslint-disable-next-line
  CONCEPTLIST_ADD(state, payload) {
    state.conceptList.push(payload);
  },
  // eslint-disable-next-line
  CONCEPTLIST_DEL(state, payload) {
    state.conceptList.splice(payload, 1);
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
  structurePicsAdd: ({ commit }, payload) => {
    commit('STRUCTUREPICS_ADD', payload);
  },
  structurePicsDel: ({ commit }, payload) => {
    commit('STRUCTUREPICS_DEL', payload);
  },
  conceptListAdd: ({ commit }, payload) => {
    commit('CONCEPTLIST_ADD', payload);
  },
  conceptListDel: ({ commit }, payload) => {
    commit('CONCEPTLIST_DEL', payload);
  },
};

const getters = {
  structures: () => state.structures,
  structuresCount: () => state.structuresCount,
  structurePics: () => state.structurePics,
  conceptList: () => state.conceptList,
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
      }
    }
    if (mutation.type === 'STRUCTURE_UPDATE') {
      const strucObject = state.structures[mutation.payload.index];
      const strucId = mutation.payload.index;
      if (mutation.payload.type === 'title') {
        const strucTitle = strucObject.title;
        localStorageAPI.save(strucTitle, `STRUCTURES_${strucId}_TITLE`);
      }
    }
    if (mutation.type === 'STRUCTURESCOUNT_ADD') {
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    if (mutation.type === 'STRUCTURESCOUNT_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        localStorageAPI.save(state.structures[i].title, `STRUCTURES_${i}_TITLE`);
      }
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TITLE`);
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    if (mutation.type === 'STRUCTUREPICS_ADD' || mutation.type === 'STRUCTUREPICS_DEL') {
      localStorageAPI.save(state.structurePics, 'STRUCTUREPICS');
    }
    if (mutation.type === 'CONCEPTLIST_ADD' || mutation.type === 'CONCEPTLIST_DEL') {
      localStorageAPI.save(state.conceptList, 'CONCEPTLIST');
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
