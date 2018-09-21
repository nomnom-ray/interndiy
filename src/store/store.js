import Vue from 'vue';
import Vuex from 'vuex';

import Project from './modules/project';
import Identity from './modules/identity';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Project,
    Identity,
  },
  plugins: [Identity.autosavePlugin],
});

export default store;
