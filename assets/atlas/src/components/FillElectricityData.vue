<template>
  <div>
    <div class="prose">
      <h2>Электроснабжение</h2>
      <h4>Тип системы солнечных панелей</h4>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Автономный (с аккамулятором)
        <input type="checkbox" v-bind:checked="electricity.offline" @click="toggleOffline">
        <span class="checkmark radio"></span>
      </label>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Сетевой (подключенная к сети)
        <input type="checkbox" v-bind:checked="!electricity.offline" @click="toggleOffline">
        <span class="checkmark radio"></span>
      </label>
    </div>
    <div class="pt-8 mb-6">
      <label class="block text-xl mb-2" for="power_output">
        Электрическая нагрузка (кВт)
        <button
            class="text-gray-600 font-medium rounded-full border border-gray-600 hover:bg-gray-300 text-lg cursor-pointer inline-block"
            style="vertical-align: super; width: 1.5em" v-tippy
            content="Вы можете подсчитать ваш расход электроэнергии используя мини-калькулятор ниже">?
        </button>
      </label>
      <input
          :value="electricity.power_usage||''"
          @input="updatePowerUsage"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="power_output" type="number" placeholder="Пример: 10">
      <p class="text-sm font-normal pt-2">Не знаете сколько энергии вам нужно?
        <span class="link font-bold" @click="showCalculator = !showCalculator">
          {{ !showCalculator ? 'Узнать расход энергии' : 'Скрыть' }}
        </span>
      </p>
      <div v-if="showCalculator" class="py-2">
        <electricity-usage-calculator/>
      </div>
    </div>
  </div>
</template>

<script>
import ElectricityUsageCalculator from "@/components/ElectricityUsageCalculator";

export default {
  name: "FillElectricityData",
  components: {ElectricityUsageCalculator},
  data: () => ({
    showCalculator: false,
  }),
  methods: {
    updatePowerUsage(e) { // in
      this.$store.commit('setElectricity', {
        power_usage: parseFloat(e.target.value || 0)
      });
    },
    toggleOffline() {
      this.$store.commit('setElectricity', {
        offline: !this.electricity.offline
      });
    }
  },
  computed: {
    electricity() {
      return this.$store.state.electricity;
    },
  }
}
</script>

<style scoped>

</style>