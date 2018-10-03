/* eslint "no-param-reassign": 0 */

const state = {
  jobTitle: '',
  organizationName: '',
  jobLocation: '',
  picsPostings: [],
  qualifications: [],
  // to store qualifications as individual objects, but track array manually
  qualificationsCount: 0,
  narrativeMore: '',
  projectStory: '',
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
  QUALIFICATION_UPDATE(state, payload) {
    if (payload.type === 'id') {
      state.qualifications[payload.index].id = payload.content;
    }
    if (payload.type === 'title') {
      state.qualifications[payload.index].title = payload.content;
    }
    if (payload.type === 'description') {
      state.qualifications[payload.index].description = payload.content;
    }
  },
  // eslint-disable-next-line
  QUALIFICATIONS_DEL(state, payload) {
    state.qualifications.splice(payload, 1);
    // after deleting element, the array is reorganized to keep continuous id
    for (let i = Number(payload); i <= state.qualifications.length - 1; i += 1) {
      state.qualifications[i].id = i;
    }
  },
  // eslint-disable-next-line
  QUALIFICATIONSCOUNT_ADD(state, payload) {
    // += payload because of the initial startup count from localstorage
    state.qualificationsCount += payload;
  },
  // eslint-disable-next-line
  QUALIFICATIONSCOUNT_DEL(state) {
    state.qualificationsCount -= 1;
  },
  // eslint-disable-next-line
  NARRATIVEMORE_UPDATE(state, payload) {
    state.narrativeMore = payload;
  },
  // eslint-disable-next-line
  PROJECTSTORY_UPDATE(state, payload) {
    state.projectStory = payload;
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
  qualificationUpdate: ({ commit }, payload) => {
    commit('QUALIFICATION_UPDATE', payload);
  },
  qualificationsCountAdd: ({ commit }, payload) => {
    commit('QUALIFICATIONSCOUNT_ADD', payload);
  },
  qualificationsCountDel: ({ commit }) => {
    commit('QUALIFICATIONSCOUNT_DEL');
  },
  narrativeMoreUpdate: ({ commit }, payload) => {
    commit('NARRATIVEMORE_UPDATE', payload);
  },
  projectStoryUpdate: ({ commit }, payload) => {
    commit('PROJECTSTORY_UPDATE', payload);
  },
};

const getters = {
  jobTitle: () => state.jobTitle,
  organizationName: () => state.organizationName,
  jobLocation: () => state.jobLocation,
  picsPostings: () => state.picsPostings,
  qualifications: () => state.qualifications,
  qualificationsCount: () => state.qualificationsCount,
  narrativeMore: () => state.narrativeMore,
  projectStory: () => state.projectStory,
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
      localStorageAPI.save(state.picsPostings, 'PICSPOSTINGS');
    }
    if (mutation.type === 'QUALIFICATION_UPDATE') {
      const qualObject = state.qualifications[mutation.payload.index];
      const qualId = qualObject.id;
      if (mutation.payload.type === 'title') {
        const qualTitle = qualObject.title;
        localStorageAPI.save(qualTitle, `QUALIFICATIONS_${qualId}_TITLE`);
      }
      if (mutation.payload.type === 'description') {
        const qualDescription = qualObject.description;
        localStorageAPI.save(qualDescription, `QUALIFICATIONS_${qualId}_DESCRIPTION`);
      }
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_DEL') {
      // replace all qualification properties in localstorage after splice, and remove the spliced
      for (let i = 0; i <= state.qualifications.length - 1; i += 1) {
        localStorageAPI.save(state.qualifications[i].title, `QUALIFICATIONS_${i}_TITLE`);
        localStorageAPI.save(state.qualifications[i].description, `QUALIFICATIONS_${i}_DESCRIPTION`);
      }
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_TITLE`);
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_DESCRIPTION`);
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_ADD') {
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'NARRATIVEMORE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'NARRATIVEMORE');
    }
    if (mutation.type === 'PROJECTSTORY_UPDATE') {
      localStorageAPI.save(mutation.payload, 'PROJECTSTORY');
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
