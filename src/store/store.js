import Vue from 'vue';
import Vuex from 'vuex';

import Behavior from './modules/behavior';
import Identity from './modules/identity';
import Structure from './modules/structure';
import Metrics from './modules/metrics';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    Behavior,
    Identity,
    Metrics,
    Structure,
  },
  plugins: [
    Identity.autosavePlugin,
    Metrics.autosavePlugin,
    Behavior.autosavePlugin,
    Structure.autosavePlugin,
  ],
});

export default store;
