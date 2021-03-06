/* eslint "no-param-reassign": 0 */

const state = {
  jobTitle: '',
  concerns: '',
  evaluator: '',
  trigger: '',
  jobPics: [],
  qualifications: [],
  // to store qualifications as individual objects, but track array manually
  qualificationsCount: 0,
  narrativeMore: '',
  storyRole: '',
  storyWork: '',
  storyGoal: '',
  storyUser: '',
  storySystem: '',
  storyValue: '',
  objectiveResult: '',
};

const mutations = {
  // eslint-disable-next-line
  JOBTITLE_UPDATE(state, payload) {
    state.jobTitle = payload;
  },
  // eslint-disable-next-line
  CONCERNS_UPDATE(state, payload) {
    state.concerns = payload;
  },
  // eslint-disable-next-line
  EVALUATOR_UPDATE(state, payload) {
    state.evaluator = payload;
  },
  // eslint-disable-next-line
  TRIGGER_UPDATE(state, payload) {
    state.trigger = payload;
  },
  // eslint-disable-next-line
  JOBPICS_ADD(state, payload) {
    state.jobPics = state.jobPics.concat(payload);
  },
  // eslint-disable-next-line
  JOBPICS_DEL(state, payload) {
    state.jobPics.splice(payload, 1);
  },
  // eslint-disable-next-line
  QUALIFICATIONS_ADD(state, payload) {
    state.qualifications.push(payload);
  },
  // eslint-disable-next-line
  QUALIFICATION_UPDATE(state, payload) {
    if (payload.type === 'title') {
      state.qualifications[payload.index].title = payload.content;
    }
    if (payload.type === 'description') {
      state.qualifications[payload.index].description = payload.content;
    }
    if (payload.type === 'descriptionValid') {
      state.qualifications[payload.index].descriptionValid = payload.content;
    }
    if (payload.type === 'taskListAdd') {
      state.qualifications[payload.index].taskList.push(payload.content);
    }
    if (payload.type === 'taskListDel') {
      const taskIndex = state.qualifications[payload.index]
        .taskList.indexOf(payload.content);
      if (taskIndex !== -1) {
        state.qualifications[payload.index].taskList.splice(taskIndex, 1);
      }
    }
    // if (payload.type === 'taskListSet') {
    //   state.qualifications[payload.index].taskList = payload.content;
    // }
    if (payload.type === 'justification') {
      state.qualifications[payload.index].justification = payload.content;
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
  STORYROLE_UPDATE(state, payload) {
    state.storyRole = payload;
  },
  // eslint-disable-next-line
  STORYWORK_UPDATE(state, payload) {
    state.storyWork = payload;
  },
  // eslint-disable-next-line
  STORYGOAL_UPDATE(state, payload) {
    state.storyGoal = payload;
  },
  // eslint-disable-next-line
  STORYUSER_UPDATE(state, payload) {
    state.storyUser = payload;
  },
  // eslint-disable-next-line
  STORYSYSTEM_UPDATE(state, payload) {
    state.storySystem = payload;
  },
  // eslint-disable-next-line
  STORYVALUE_UPDATE(state, payload) {
    state.storyValue = payload;
  },
  // eslint-disable-next-line
  OBJECTIVERESULT_UPDATE(state, payload) {
    state.objectiveResult = payload;
  },
};

const actions = {
  jobTitleUpdate: ({ commit }, payload) => {
    commit('JOBTITLE_UPDATE', payload);
  },
  concernsUpdate: ({ commit }, payload) => {
    commit('CONCERNS_UPDATE', payload);
  },
  evaluatorUpdate: ({ commit }, payload) => {
    commit('EVALUATOR_UPDATE', payload);
  },
  triggerUpdate: ({ commit }, payload) => {
    commit('TRIGGER_UPDATE', payload);
  },
  jobPicsAdd: ({ commit }, payload) => {
    commit('JOBPICS_ADD', payload);
  },
  jobPicsDel: ({ commit }, payload) => {
    commit('JOBPICS_DEL', payload);
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
  storyRoleUpdate: ({ commit }, payload) => {
    commit('STORYROLE_UPDATE', payload);
  },
  storyWorkUpdate: ({ commit }, payload) => {
    commit('STORYWORK_UPDATE', payload);
  },
  storyGoalUpdate: ({ commit }, payload) => {
    commit('STORYGOAL_UPDATE', payload);
  },
  storyUserUpdate: ({ commit }, payload) => {
    commit('STORYUSER_UPDATE', payload);
  },
  storySystemUpdate: ({ commit }, payload) => {
    commit('STORYSYSTEM_UPDATE', payload);
  },
  storyValueUpdate: ({ commit }, payload) => {
    commit('STORYVALUE_UPDATE', payload);
  },
  objectiveResultUpdate: ({ commit }, payload) => {
    commit('OBJECTIVERESULT_UPDATE', payload);
  },
};

const getters = {
  jobTitle: () => state.jobTitle,
  concerns: () => state.concerns,
  evaluator: () => state.evaluator,
  trigger: () => state.trigger,
  jobPics: () => state.jobPics,
  qualifications: () => state.qualifications,
  qualificationsCount: () => state.qualificationsCount,
  narrativeMore: () => state.narrativeMore,
  storyRole: () => state.storyRole,
  storyWork: () => state.storyWork,
  storyGoal: () => state.storyGoal,
  storyUser: () => state.storyUser,
  storySystem: () => state.storySystem,
  storyValue: () => state.storyValue,
  objectiveResult: () => state.objectiveResult,
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
    if (mutation.type === 'CONCERNS_UPDATE') {
      localStorageAPI.save(mutation.payload, 'CONCERNS');
    }
    if (mutation.type === 'EVALUATOR_UPDATE') {
      localStorageAPI.save(mutation.payload, 'EVALUATOR');
    }
    if (mutation.type === 'TRIGGER_UPDATE') {
      localStorageAPI.save(mutation.payload, 'TRIGGER');
    }
    if (mutation.type === 'STORYROLE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYROLE');
    }
    if (mutation.type === 'STORYWORK_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYWORK');
    }
    if (mutation.type === 'STORYGOAL_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYGOAL');
    }
    if (mutation.type === 'STORYUSER_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYUSER');
    }
    if (mutation.type === 'STORYSYSTEM_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYSYSTEM');
    }
    if (mutation.type === 'STORYVALUE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'STORYVALUE');
    }
    if (mutation.type === 'OBJECTIVERESULT_UPDATE') {
      localStorageAPI.save(mutation.payload, 'OBJECTIVERESULT');
    }
    if (mutation.type === 'JOBPICS_ADD' || mutation.type === 'JOBPICS_DEL') {
      localStorageAPI.save(state.jobPics, 'JOBPICS');
    }
    if (mutation.type === 'QUALIFICATION_UPDATE') {
      const qualObject = state.qualifications[mutation.payload.index];
      const qualId = mutation.payload.index;
      if (mutation.payload.type === 'title') {
        const qualTitle = qualObject.title;
        localStorageAPI.save(qualTitle, `QUALIFICATIONS_${qualId}_TITLE`);
      }
      if (mutation.payload.type === 'description') {
        const qualDescription = qualObject.description;
        localStorageAPI.save(qualDescription, `QUALIFICATIONS_${qualId}_DESCRIPTION`);
      }
      if (mutation.payload.type === 'descriptionValid') {
        const qualDescriptionValid = qualObject.descriptionValid;
        localStorageAPI.save(qualDescriptionValid, `QUALIFICATIONS_${qualId}_DESCRIPTIONVALID`);
      }
      if (mutation.payload.type === 'justification') {
        const qualJustification = qualObject.justification;
        localStorageAPI.save(qualJustification, `QUALIFICATIONS_${qualId}_JUSTIFICATION`);
      }
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_DEL') {
      // replace all qualification properties in localstorage after splice, and remove the spliced
      for (let i = 0; i <= state.qualifications.length - 1; i += 1) {
        localStorageAPI.save(state.qualifications[i].title, `QUALIFICATIONS_${i}_TITLE`);
        localStorageAPI.save(state.qualifications[i].description, `QUALIFICATIONS_${i}_DESCRIPTION`);
        localStorageAPI.save(state.qualifications[i].descriptionValid, `QUALIFICATIONS_${i}_DESCRIPTIONVALID`);
        localStorageAPI.save(state.qualifications[i].taskList, `QUALIFICATIONS_${i}_TASKLIST`);
        localStorageAPI.save(state.qualifications[i].justification, `QUALIFICATIONS_${i}_JUSTIFICATION`);
      }
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_TITLE`);
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_DESCRIPTION`);
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_DESCRIPTIONVALID`);
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_TASKLIST`);
      localStorageAPI.remove(`QUALIFICATIONS_${state.qualifications.length}_JUSTIFICATION`);
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'QUALIFICATIONSCOUNT_ADD') {
      localStorageAPI.save(state.qualificationsCount, 'QUALIFICATIONSCOUNT');
    }
    if (mutation.type === 'NARRATIVEMORE_UPDATE') {
      localStorageAPI.save(mutation.payload, 'NARRATIVEMORE');
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
