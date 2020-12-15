<template>
  <div>
    <div class="prose">
      <h2>Горячее водоснабжение</h2>
      <h4>Приблизительный расход горячей воды в литрах в сутки
        <button
            class="text-gray-600 font-medium rounded-full border border-gray-600 hover:bg-gray-300 text-lg cursor-pointer inline-block"
            style="vertical-align: super; width: 1.5em" v-tippy
            content="Вы можете подсчитать расход воды используя мини-калькулятор ниже">?
        </button>
      </h4>
    </div>
    <div class="pt-8 mb-6">
      <label class="block text-xl mb-2" for="power_output_heating">
      </label>
      <input
          :value="hotWater.consumption_per_day*1000||''"
          @input="updateConsumption"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="power_output_heating" type="number" placeholder="Расход горячей воды в сутки">
      <p class="text-red-500" v-if="(hotWater.consumption_per_day*1000 < 100)">Не менее 100 литров в сутки.</p>
      <p class="text-sm font-normal pt-2">Не знаете какая выработка системы вам нужна?
        <span class="link font-bold" @click="showCalculator = !showCalculator">
          {{ !showCalculator ? 'Узнать' : 'Скрыть' }}
        </span>
      </p>
      <div v-if="showCalculator" class="py-2">
        <hot-water-calculator/>
      </div>
    </div>
  </div>
</template>

<script>
import HotWaterCalculator from "@/components/HotWaterCalculator";

export default {
  name: "FillHotWaterData",
  components: {HotWaterCalculator},
  data: () => ({
    showCalculator: false
  }),
  methods: {
    updateConsumption(e) { // in m^3 per day. Input is in liters, but we will convert that to m^3 anyway.
      this.$store.commit('setHotWater', {
        consumption_per_day: parseFloat(e.target.value || 0) / 1000
      })
    },
    // toggleOffline() {
    //   this.$store.commit('setHeating', {
    //     offline: !this.heating.offline
    //   })
    // }
  },
  computed: {
    hotWater() {
      return this.$store.state.hotWater;
    },
  }
}
</script>

<style scoped>

</style>