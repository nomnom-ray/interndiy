/* eslint "no-param-reassign": 0 */

const state = {
  jobTitle: '',
  organizationName: '',
  jobLocation: '',
  picsPostings: [],
  qualifications: [],
  qualificationsCount: 0,
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
  // eslint-disable-next-line
  PICSPOSTINGS_ADD(state, payload) {
    state.picsPostings = state.picsPostings.concat(payload);
  },
  // eslint-disable-next-line
  PICSPOSTINGS_DEL(state, payload) {
    state.picsPostings.splice(payload, 1);
  },
  // eslint-disable-next-line
  QUALIFICATIONS_ADD(state, payload) {
    state.qualifications.push(payload);
  },
  // eslint-disable-next-line
  QUALIFICATIONS_DEL(state, payload) {
    state.qualifications.splice(payload, 1);
    for (let i = Number(payload); i <= state.qualifications.length - 1; i += 1) {
      state.qualifications[i].id = i;
    }
  },
  // eslint-disable-next-line
  QUALIFICATIONSCOUNT_ADD(state, payload) {
    state.qualificationsCount += payload;
  },
  // eslint-disable-next-line
  QUALIFICATIONSCOUNT_DEL(state) {
    state.qualificationsCount -= 1;
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
  picsPostingsAdd: ({ commit }, payload) => {
    commit('PICSPOSTINGS_ADD', payload);
  },
  picsPostingsDel: ({ commit }, payload) => {
    commit('PICSPOSTINGS_DEL', payload);
  },
  qualificationsAdd: ({ commit }, payload) => {
    commit('QUALIFICATIONS_ADD', payload);
  },
  qualificationsDel: ({ commit }, payload) => {
    commit('QUALIFICATIONS_DEL', payload);
  },
  qualificationsCountAdd: ({ commit }, payload) => {
    commit('QUALIFICATIONSCOUNT_ADD', payload);
  },
  qualificationsCountDel: ({ commit }) => {
    commit('QUALIFICATIONSCOUNT_DEL');
  },
};

const getters = {
  jobTitle: () => state.jobTitle,
  organizationName: () => state.organizationName,
  jobLocation: () => state.jobLocation,
  picsPostings: () => state.picsPostings,
  qualifications: () => state.qualifications,
  qualificationsCount: () => state.qualificationsCount,
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
    if (mutation.type === 'JOBTITLE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'JOBTITLE');
    }
    if (mutation.type === 'ORGANIZATIONNAME_UPDATE') {
      localStorageAPI.save(mutation.payload, 'ORGANIZATIONNAME');
    }
    if (mutation.type === 'JOBLOCATION_UPDATE') {
      localStorageAPI.save(mutation.payload, 'JOBLOCATION');
    }
    if (mutation.type === 'PICSPOSTINGS_ADD' || mutation.type === 'PICSPOSTINGS_DEL') {
      localStorageAPI.save(JSON.stringify(state.picsPostings), 'PICSPOSTINGS');
    }
    if (mutation.type === 'QUALIFICATIONS_ADD') {
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
      localStorageAPI.save(JSON.stringify(state
        .qualifications[mutation.payload.id]), `QUALIFICATIONS_${mutation.payload.id}`);
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_ADD') {
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_DEL') {
      for (let i = 0; i <= state.qualifications.length - 1; i += 1) {
        localStorageAPI.save(JSON.stringify(state
          .qualifications[i]), `QUALIFICATIONS_${i}`);
      }
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}`);
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
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
