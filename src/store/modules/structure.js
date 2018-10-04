/* eslint "no-param-reassign": 0 */
const state = {
  structures: [],
  structuresCount: 0,
};

const mutations = {
  // eslint-disable-next-line
  STRUCTURE_ADD(state, payload) {
    // console.log(payload.structuresId, state.structures.length - 1);
    // if (payload.structuresId === state.structures.length - 1) {
    //   console.log('pushed');
    //   state.structures.push(payload.structureDetail);
    //   return;
    // }
    // console.log('spliced');
    state.structures.splice(payload.structuresId, 0, payload.structureDetail);
  },
  // eslint-disable-next-line
  STRUCTURE_UPDATE(state, payload) {
    // if (payload.type === 'id') {
    //   state.qualifications[payload.index].id = payload.content;
    // }
    if (payload.type === 'title') {
      state.structures[payload.index].title = payload.content;
    }
    // if (payload.type === 'description') {
    //   state.qualifications[payload.index].description = payload.content;
    // }
  },
  // eslint-disable-next-line
  STRUCTURE_DEL(state, payload) {
    state.structures.splice(payload, 1);
  },
  // eslint-disable-next-line
  STRUCTURESCOUNT_ADD(state, payload) {
    // += payload because of the initial startup count from localstorage
    state.structuresCount += payload;
    // console.log(state.structures);
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
      }
    }
    if (mutation.type === 'STRUCTURE_UPDATE') {
      const strucObject = state.structures[mutation.payload.index];
      const strucId = mutation.payload.index;
      // console.log('STRUCTURE_UPDATE');
      if (mutation.payload.type === 'title') {
        // console.log('title');
        const strucTitle = strucObject.title;
        localStorageAPI.save(strucTitle, `STRUCTURES_${strucId}_TITLE`);
      }
    }
    if (mutation.type === 'STRUCTURESCOUNT_ADD') {
      localStorageAPI.save(state.structuresCount, 'STRUCTURESCOUNT');
    }
    if (mutation.type === 'STRUCTURESCOUNT_DEL') {
      // replace all structures properties in localstorage after splice, and remove the spliced
      for (let i = 0; i <= state.structures.length - 1; i += 1) {
        localStorageAPI.save(state.structures[i].title, `STRUCTURES_${i}_TITLE`);
      }
      localStorageAPI.remove(`STRUCTURES_${state.structures.length}_TITLE`);
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
