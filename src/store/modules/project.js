/* eslint "no-param-reassign": 0 */
import DBSubjects from '../../mockdata/subjects';

const state = {
  concepts: [],
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
  SUBJECTS_SET(state, subjects) {
    state.subjects = subjects;
  },
};

const actions = {
  conceptsSelect: ({ commit }, concept) => {
    // if (state.conceptsSelected.length <= 2) {
    commit('CONCEPTS_SEL', concept);
    // }
  },
  conceptsDeselect: ({ commit }, index) => {
    commit('CONCEPTS_DESEL', index);
  },
  subjectsInit: ({ commit }) => {
    commit('SUBJECTS_SET', DBSubjects);
  },
};

const getters = {
  concepts: () => state.concepts,
  subjects: () => state.subjects,
  conceptsSelected: () => state.conceptsSelected,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
