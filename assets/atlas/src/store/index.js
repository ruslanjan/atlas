import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = {
    location: {
        latlng: null,
        irradiation: null,
        selected_area_name: null,
    },

    electricity: {
        active: false,
        offline: false,
        power_usage: 0, // in kWh per day
    },

    heating: {
        active: false,
        power_usage: 0, // in kWh per day
    },

    hotWater: {
        active: false,
        consumption_per_day: 0, // in m^3 per day
    }
}

const loadState = () => {
    if (localStorage.getItem('store')) {
        return JSON.parse(localStorage.getItem('store'));
    }
    return initialState;
}

let store = new Vuex.Store({
    state: loadState(),
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
        },
        resetState(state) {
            Object.assign(state, initialState);
        }
    },
    actions: {},
    modules: {}
});

store.subscribe((mutation, state) => {
    // Store the state object as a JSON string
    localStorage.setItem('store', JSON.stringify(state));
});

export default store;
