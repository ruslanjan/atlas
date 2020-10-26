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
    },

    heating: {
      active: false,
    },

    hotWater: {
      active: false,
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
