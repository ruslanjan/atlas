import Vue from 'vue';
import App from './App.vue';
import 'leaflet/dist/leaflet.css';
import 'normalize.css/normalize.css';
import './assets/tailwind.build.css';
import router from './router';
import store from './store';
import VueTippy, { TippyComponent } from "vue-tippy";
import "tippy.js/themes/google.css";
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false

Vue.use(VueToast);
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
