import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import 'normalize.css/normalize.css'
import './assets/tailwind.build.css'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
