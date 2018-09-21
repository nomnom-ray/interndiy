/* eslint "no-param-reassign": 0 */

const state = {
  jobTitle: '1',
  organizationName: '2',
  jobLocation: '3',
};

const mutations = {
  // eslint-disable-next-line
  JOBTITLE_UPDATE(state, payload) {
    state.jobTitle = payload;
  },
  // eslint-disable-next-line
  ORGANIZATIONNAME_UPDATE(state, payload) {
    state.organizationName = payload;
  },
  // eslint-disable-next-line
  JOBLOCATION_UPDATE(state, payload) {
    state.jobLocation = payload;
  },
};

const actions = {
  jobTitleUpdate: ({ commit }, payload) => {
    commit('JOBTITLE_UPDATE', payload);
  },
  organizationNameUpdate: ({ commit }, payload) => {
    commit('ORGANIZATIONNAME_UPDATE', payload);
  },
  jobLocationUpdate: ({ commit }, payload) => {
    commit('JOBLOCATION_UPDATE', payload);
  },
};

const getters = {
  jobTitle: () => state.jobTitle,
  organizationName: () => state.organizationName,
  jobLocation: () => state.jobLocation,
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
};

const autosavePlugin = (store) => {
  // eslint-disable-next-line
  store.subscribe((mutation, state) => {
    if (mutation.type === 'JOBTITLE_UPDATE') {
      localStorageAPI.save(mutation.payload, mutation.type);
    }
    if (mutation.type === 'ORGANIZATIONNAME_UPDATE') {
      localStorageAPI.save(mutation.payload, mutation.type);
    }
    if (mutation.type === 'JOBLOCATION_UPDATE') {
      localStorageAPI.save(mutation.payload, mutation.type);
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
