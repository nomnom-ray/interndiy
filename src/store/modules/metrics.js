/* eslint "no-param-reassign": 0 */

const state = {
  pageActive: 1,
  banner: true,
};

const mutations = {
  // eslint-disable-next-line
  PAGEACTIVE_UPDATE(state, payload) {
    state.pageActive = payload;
  },
  // eslint-disable-next-line
  BANNER_UPDATE(state, payload) {
    state.banner = payload;
  },
};

const actions = {
  pageActiveUpdate: ({ commit }, payload) => {
    commit('PAGEACTIVE_UPDATE', payload);
  },
  bannerUpdate: ({ commit }, payload) => {
    commit('BANNER_UPDATE', payload);
  },
};

const getters = {
  pageActive: () => state.pageActive,
  banner: () => state.banner,
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
  // eslint-disable-next-line
  store.subscribe((mutation) => {
    if (mutation.type === 'BANNER_UPDATE') {
      localStorageAPI.save(mutation.payload, 'BANNER');
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
