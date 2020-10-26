import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import 'normalize.css/normalize.css'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
