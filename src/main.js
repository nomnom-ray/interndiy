import Vue from 'vue';
import App from './App';
import Store from './store/store';
import '../static/weui/weui.css';

Vue.prototype.$store = Store;

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
