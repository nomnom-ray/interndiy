/* eslint "no-param-reassign": 0 */

const state = {
  pageActive: 8,
};

const mutations = {
  // eslint-disable-next-line
  PAGEACTIVE_UPDATE(state, payload) {
    state.pageActive = payload;
  },
};

const actions = {
  pageActiveUpdate: ({ commit }, payload) => {
    commit('PAGEACTIVE_UPDATE', payload);
  },
};

const getters = {
  pageActive: () => state.pageActive,
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
    if (mutation.type === 'PAGEACTIVE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'PAGEACTIVE');
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
