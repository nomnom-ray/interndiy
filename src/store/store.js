import Vue from 'vue';
import Vuex from 'vuex';

import Project from './modules/project';
import Identity from './modules/identity';
import Metrics from './modules/metrics';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Project,
    Identity,
    Metrics,
  },
  plugins: [Identity.autosavePlugin, Metrics.autosavePlugin],
});

export default store;
