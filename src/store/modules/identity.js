/* eslint "no-param-reassign": 0 */

const state = {
  jobTitle: '',
  organizationName: '',
  jobLocation: '',
  picsPostings: [],
  qualifications: [],
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
};

const getters = {
  jobTitle: () => state.jobTitle,
  organizationName: () => state.organizationName,
  jobLocation: () => state.jobLocation,
  picsPostings: () => state.picsPostings,
  qualifications: () => state.qualifications,
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
    // if (mutation.type === 'QUALIFICATIONS_ADD' || mutation.type === 'QUALIFICATIONS_DEL') {
    //   // console.log(state.qualifications);
    //   localStorageAPI.save(JSON.stringify(state.qualifications), 'QUALIFICATIONS');
    // }
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
