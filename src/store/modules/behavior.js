/* eslint "no-param-reassign": 0 */
const state = {
  conceptsSelected: [],
  subjects: [],
  conceptsCount: [],
};

const mutations = {
  // eslint-disable-next-line
  CONCEPTS_SEL(state, concept) {
    state.conceptsSelected.push(concept);
  },
  // eslint-disable-next-line
  CONCEPTS_DESEL(state, index) {
    state.conceptsSelected.splice(index, 1);
  },
  // eslint-disable-next-line
  CONCEPTS_ADD(state, payload) {
    if (payload.position === 'top') {
      state.subjects[payload.subjectIndex].concepts
        .splice(payload.concept.id, 0, payload.concept);
    } else if (payload.position === 'bottom') {
      state.subjects[payload.subjectIndex].concepts
        .splice(payload.concept.id - 1, 0, payload.concept);
    }
    state.conceptsCount[payload.subjectIndex] =
      state.subjects[payload.subjectIndex].concepts.length;
  },
  // eslint-disable-next-line
  CONCEPTS_DEL(state, payload) {
    state.subjects[payload.subjectIndex].concepts.splice(payload.conceptIndex, 1);
    state.conceptsCount[payload.subjectIndex] =
    state.subjects[payload.subjectIndex].concepts.length;
    if (state.subjects[payload.subjectIndex].concepts.length <= 0) {
      // will glitch with only first blank placeholding subject
      state.subjects.splice(payload.subjectIndex, 1);
      state.conceptsCount.splice(payload.subjectIndex, 1);
      for (let i = 0; i <= state.subjects.length - 1; i += 1) {
        state.subjects[i].id = i;
      }
    }
  },
  // eslint-disable-next-line
  CONCEPTS_ID(state, payload) {
    state.subjects[payload.subjectIndex]
      .concepts[payload.idNew - payload.blanksCount].id = payload.idNew;
  },
  // eslint-disable-next-line
  CONCEPTS_CLEAR(state) {
    state.conceptsSelected.length = 0;
  },
  // eslint-disable-next-line
  CONCEPTSCOUNT_INIT(state, payload) {
    state.conceptsCount = payload;
  },
  // eslint-disable-next-line
  SUBJECTS_SET(state, payload) {
    if (payload.type === 'new') {
      const subjectInit = [
        {
          id: 0,
          summary: 'blank',
          concepts: [
            {
              id: 0,
              question: '',
              description: '',
            },
          ],
        },
        {
          id: 1,
          summary: 'summary',
          concepts: [
            {
              id: 0,
              question: 'Trigger Event',
              description: '',
            },
            {
              id: 1,
              question: 'Object Result',
              description: '',
            },
          ],
        },
      ];
      state.subjects = subjectInit;
      state.conceptsCount = [1, 2];
    }
    if (payload.type === 'localstored') {
      state.subjects = payload.content;
    }
    // console.log('subjectset', state.conceptsCount);
  },
  // eslint-disable-next-line
  SUBJECTS_ADD(state, payload) {
    state.subjects.splice(payload.indexNew, 0, payload.subject);
    state.conceptsCount.splice(payload.indexNew, 0, 1);
  },
  // eslint-disable-next-line
  SUBJECTS_ID(state, payload) {
    state.subjects[payload.idNew].id = payload.idNew;
  },
  // eslint-disable-next-line
  SUBJECTS_UPDATE(state, payload) {
    if (payload.type === 'question') {
      state.subjects[payload.subjectIndex]
        .concepts[payload.conceptIndex].question = payload.content;
    }
    if (payload.type === 'description') {
      state.subjects[payload.subjectIndex]
        .concepts[payload.conceptIndex].description = payload.content;
    }
    if (payload.type === 'summary') {
      state.subjects[payload.subjectIndex]
        .summary = payload.content;
    }
  },
};

const actions = {
  conceptsSelect: ({ commit }, concept) => {
    commit('CONCEPTS_SEL', concept);
  },
  conceptsDeselect: ({ commit }, index) => {
    commit('CONCEPTS_DESEL', index);
  },
  conceptsAdd: ({ commit }, payload) => {
    commit('CONCEPTS_ADD', payload);
  },
  conceptsDel: ({ commit }, payload) => {
    commit('CONCEPTS_DEL', payload);
  },
  conceptsId: ({ commit }, payload) => {
    commit('CONCEPTS_ID', payload);
  },
  conceptClear: ({ commit }) => {
    commit('CONCEPTS_CLEAR');
  },
  conceptsCountInit: ({ commit }, payload) => {
    commit('CONCEPTSCOUNT_INIT', payload);
  },
  subjectsInit: ({ commit }, payload) => {
    commit('SUBJECTS_SET', payload);
  },
  subjectsAdd: ({ commit }, payload) => {
    commit('SUBJECTS_ADD', payload);
  },
  subjectsId: ({ commit }, payload) => {
    commit('SUBJECTS_ID', payload);
  },
  subjectsUpdate: ({ commit }, payload) => {
    commit('SUBJECTS_UPDATE', payload);
  },
};

const getters = {
  subjects: () => state.subjects,
  conceptsSelected: () => state.conceptsSelected,
  conceptsCount: () => state.conceptsCount,
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
    if (mutation.type === 'SUBJECTS_SET') {
      if (mutation.payload.type === 'new') {
        for (let j = 0; j <= 1; j += 1) {
          for (let i = 0; i <= state.subjects[j].concepts.length - 1; i += 1) {
            const conceptId = state.subjects[j].concepts[i].id;
            localStorageAPI
              .save(conceptId, `SUBJECTS_${j}_CONCEPTS_${i}_ID`);
            const conceptQuestion = state.subjects[j].concepts[i].question;
            localStorageAPI
              .save(conceptQuestion, `SUBJECTS_${j}_CONCEPTS_${conceptId}_QUESTION`);
            const conceptDescription = state.subjects[j].concepts[i].description;
            localStorageAPI
              .save(conceptDescription, `SUBJECTS_${j}_CONCEPTS_${conceptId}_DESCRIPTION`);
            const subjectSummary = state.subjects[j].summary;
            localStorageAPI.save(subjectSummary, `SUBJECTS_${j}_SUMMARY`);
          }
        }
        localStorageAPI.save(state.conceptsCount, 'CONCEPTSCOUNT');
      }
    }
    if (mutation.type === 'SUBJECTS_ID') {
      // every 'subject add' restores all subject & concept content with new keys
      // concept IDs have keys that follow array index (same as the concepts[] array)
      // concept question and description follow conceptIDs (same as concepts[])
      const subjectId = mutation.payload.idNew;
      for (let i = 0; i < state.subjects[mutation.payload.idNew].concepts.length; i += 1) {
        const conceptId = state.subjects[mutation.payload.idNew].concepts[i].id;
        localStorageAPI
          .save(conceptId, `SUBJECTS_${subjectId}_CONCEPTS_${i}_ID`);
        const conceptQuestion = state.subjects[mutation.payload.idNew].concepts[i].question;
        localStorageAPI
          .save(conceptQuestion, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_QUESTION`);
        const conceptDescription = state.subjects[mutation.payload.idNew]
          .concepts[i].description;
        localStorageAPI
          .save(conceptDescription, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_DESCRIPTION`);
        const subjectSummary = state.subjects[mutation.payload.idNew].summary;
        localStorageAPI.save(subjectSummary, `SUBJECTS_${subjectId}_SUMMARY`);
      }
      localStorageAPI.save(state.conceptsCount, 'CONCEPTSCOUNT');
    }
    if (mutation.type === 'CONCEPTS_ID') {
      // catch conceptid and conceptdel seprately to separate save and remove
      const subjectId = mutation.payload.subjectIndex;
      const conceptIndex = mutation.payload.idNew - mutation.payload.blanksCount;
      const conceptId = state.subjects[subjectId].concepts[conceptIndex].id;
      localStorageAPI
        .save(conceptId, `SUBJECTS_${subjectId}_CONCEPTS_${conceptIndex}_ID`);
      const conceptQuestion = state.subjects[subjectId]
        .concepts[conceptIndex].question;
      localStorageAPI
        .save(conceptQuestion, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_QUESTION`);
      const conceptDescription = state.subjects[subjectId]
        .concepts[conceptIndex].description;
      localStorageAPI
        .save(conceptDescription, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_DESCRIPTION`);
      const subjectSummary = state.subjects[subjectId].summary;
      localStorageAPI.save(subjectSummary, `SUBJECTS_${subjectId}_SUMMARY`);
      localStorageAPI.save(state.conceptsCount, 'CONCEPTSCOUNT');
    }
    if (mutation.type === 'CONCEPTS_DEL') {
      localStorageAPI.remove(`SUBJECTS_${mutation
        .payload.subjectIndex}_CONCEPTS_${mutation.payload.conceptLastIndex}_ID`);
      localStorageAPI.remove(`SUBJECTS_${mutation
        .payload.subjectIndex}_CONCEPTS_${mutation.payload.conceptLastId}_QUESTION`);
      localStorageAPI.remove(`SUBJECTS_${mutation
        .payload.subjectIndex}_CONCEPTS_${mutation.payload.conceptLastId}_DESCRIPTION`);
      localStorageAPI.remove(`SUBJECTS_${mutation.payload.subjectIndex}_SUMMARY`);
      if (mutation.payload.conceptLastIndex === 0) {
        const subjectLastIndex = (state.subjects.length) - 1;
        for (let i = 0; i <= state.subjects[subjectLastIndex].concepts.length - 1; i += 1) {
          const conceptId = state.subjects[subjectLastIndex].concepts[i].id;
          localStorageAPI.remove(`SUBJECTS_${subjectLastIndex + 1}_CONCEPTS_${mutation
            .payload.conceptLastIndex}_ID`);
          localStorageAPI.remove(`SUBJECTS_${subjectLastIndex + 1}_CONCEPTS_${conceptId}_QUESTION`);
          localStorageAPI.remove(`SUBJECTS_${subjectLastIndex + 1}_CONCEPTS_${conceptId}_DESCRIPTION`);
        }
      }
      localStorageAPI.save(state.conceptsCount, 'CONCEPTSCOUNT');
    }
    if (mutation.type === 'SUBJECTS_UPDATE') {
      const subjectObject = state.subjects[mutation.payload.subjectIndex];
      const subjectId = subjectObject.id;
      if (mutation.payload.type === 'question') {
        const conceptObject = subjectObject.concepts[mutation.payload.conceptIndex];
        const conceptId = conceptObject.id;
        const conceptQuestion = conceptObject.question;
        localStorageAPI
          .save(conceptQuestion, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_QUESTION`);
      }
      if (mutation.payload.type === 'description') {
        const conceptObject = subjectObject.concepts[mutation.payload.conceptIndex];
        const conceptId = conceptObject.id;
        const conceptDescription = conceptObject.description;
        localStorageAPI
          .save(conceptDescription, `SUBJECTS_${subjectId}_CONCEPTS_${conceptId}_DESCRIPTION`);
      }
      if (mutation.payload.type === 'summary') {
        const subjectSummary = subjectObject.summary;
        localStorageAPI.save(subjectSummary, `SUBJECTS_${subjectId}_SUMMARY`);
      }
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
