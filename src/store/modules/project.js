/* eslint "no-param-reassign": 0 */
import DBSubjects from '../../mockdata/subjects';

const state = {
  conceptsSelected: [],
  subjects: [],
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
  },
  // eslint-disable-next-line
  CONCEPTS_DEL(state, index) {
    state.conceptsSelected.splice(index, 1);
  },
  // eslint-disable-next-line
  CONCEPTS_ID(state, payload) {
    state.subjects[payload.subjectIndex].concepts[payload.idNew].id = payload.idNew;
  },
  // eslint-disable-next-line
  CONCEPTS_CLEAR(state) {
    state.conceptsSelected.length = 0;
  },
  // eslint-disable-next-line
  SUBJECTS_SET(state, subjects) {
    state.subjects = subjects;
  },
  // eslint-disable-next-line
  SUBJECTS_ADD(state, payload) {
    state.subjects.splice(payload.subjectIndex + 1, 0, payload.subject);
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
  conceptsId: ({ commit }, payload) => {
    commit('CONCEPTS_ID', payload);
  },
  conceptClear: ({ commit }) => {
    commit('CONCEPTS_CLEAR');
  },
  subjectsInit: ({ commit }) => {
    commit('SUBJECTS_SET', DBSubjects);
  },
  subjectsAdd: ({ commit }, payload) => {
    commit('SUBJECTS_ADD', payload);
  },
};

const getters = {
  subjects: () => state.subjects,
  conceptsSelected: () => state.conceptsSelected,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
