import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import 'normalize.css/normalize.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
