import Vue from 'vue';
import Vuex from 'vuex';

import Project from './modules/project';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Project,
  },
});

export default store;
