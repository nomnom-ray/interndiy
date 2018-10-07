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
    if (payload.type === 'picURLs') {
      state.structures[payload.index].structurePics = payload.content;
    }
    if (payload.type === 'conceptListAdd') {
      state.structures[payload.index].conceptList.push(payload.content);
    }
    if (payload.type === 'conceptListDel') {
      state.structures[payload.index].conceptList.splice(payload.content, 1);
    }
    if (payload.type === 'conceptListSet') {
      state.structures[payload.index].conceptList = payload.content;
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
        const strucPics = strucObject.structurePics;
        localStorageAPI.save(strucPics, `STRUCTURES_${i}_PICS`);
        const strucConcepts = strucObject.conceptList;
        localStorageAPI.save(strucConcepts, `STRUCTURES_${i}_CONCEPTS`);
      }
    }
    if (mutation.type === 'STRUCTURE_UPDATE') {
      const strucObject = state.structures[mutation.payload.index];
      const strucId = mutation.payload.index;
      if (mutation.payload.type === 'title') {
        const strucTitle = strucObject.title;
        localStorageAPI.save(strucTitle, `STRUCTURES_${strucId}_TITLE`);
      }
      if (mutation.payload.type === 'picURLs') {
        const strucPics = strucObject.structurePics;
        localStorageAPI.save(strucPics, `STRUCTURES_${strucId}_PICS`);
      }
      if (mutation.payload.type === 'conceptListAdd' || mutation.payload.type === 'conceptListDel') {
        const strucConcepts = strucObject.conceptList;
        localStorageAPI.save(strucConcepts, `STRUCTURES_${strucId}_CONCEPTS`);
      }
    }
    if (mutation.type === 'STRUCTURESCOUNT_ADD') {
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    if (mutation.type === 'STRUCTURESCOUNT_DEL') {
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        localStorageAPI.save(state.structures[i].title, `STRUCTURES_${i}_TITLE`);
        localStorageAPI.save(state.structures[i].structurePics, `STRUCTURES_${i}_PICS`);
        localStorageAPI.save(state.structures[i].conceptList, `STRUCTURES_${i}_CONCEPTS`);
      }
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TITLE`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_PICS`);
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_CONCEPTS`);
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
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
