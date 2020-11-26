import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState = () => ({
    location: {
        latlng: null,
        irradiation: null,
        selected_area_name: null,
    },

    electricity: {
        active: false,
        offline: false,
        calculator_state: null,
        power_usage: 0, // in kWh per day
    },

    heating: {
        active: false,
        power_usage: 0, // in kWh per day
    },

    hotWater: {
        active: false,
        calculator_state: null,
        consumption_per_day: 0, // in m^3 per day
    }
})

const loadState = () => {
    const now = new Date();

    if (localStorage.getItem('store')) {
        let expiry = JSON.parse(localStorage.getItem('expiry'));
        if (now.getTime() < expiry) {
            return JSON.parse(localStorage.getItem('store'));
        } else {
            localStorage.clear();
        }
    }
    return initialState();
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
        setElectricityCalculatorState(state, new_state) {
            state.electricity.calculator_state = {
                ...new_state
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
        setHotWaterCalculatorState(state, new_state) {
            state.hotWater.calculator_state = {
                ...new_state
            }
        },
        resetState(state) {
            Object.assign(state, initialState());
        }
    },
    actions: {},
    modules: {}
});

store.subscribe((mutation, state) => {
    const now = new Date()
    let expiry = now.getTime() + 86400000;
    // Store the state object as a JSON string
    localStorage.setItem('expiry', JSON.stringify(expiry));
    localStorage.setItem('store', JSON.stringify(state));
});

export default store;
