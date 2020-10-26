import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: {
      latlng: null,
      irradiation: null,
      selected_area_name: null,
    },

    electricity: {
      active: false,
      offline: false,
      power_usage: 0, // in kWh in day
    },

    heating: {
      active: false,
      power_usage: 0, // in kWh in day
    },

    hotWater: {
      active: false,
      consumption_per_day: 0, // in m^3 per day
    }
  },
  mutations: {
    setLocation(state, location) {
      state.location = {
        ...state.location,
        ...location
      }
    },
    setElectricity(state, electricity) {
      state.electricity = {
        ...state.electricity,
        ...electricity
      }
    },
    setHeating(state, heating) {
      state.heating = {
        ...state.heating,
        ...heating
      }
    },
    setHotWater(state, hotWater) {
      state.hotWater = {
        ...state.hotWater,
        ...hotWater
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
