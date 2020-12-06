<template>
  <div>
    <div class="prose">
      <h2>Поддержка отопления</h2>
      <h4>Тип отопительной системы установленный на объекте</h4>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Радиаторы
        <input type="checkbox" v-model="is_using_radiator">
        <span class="checkmark"></span>
      </label>
      <div v-if="is_using_radiator" class="text-gray-600 italic">
        Использование солнечных коллекторов более эффективно с теплыми полами
      </div>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Тёплые полы
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="my-4 hidden">
      <label class="checkbox-container">Другое
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="pt-8 mb-6">
      <label class="block text-xl mb-2" for="power_output_heating">
        Желаемая дневная выработка системы (кВт⋅ч)
        <span class="text-gray-600 font-medium cursor-pointer" v-tippy
              content="В среднем, для отопления дома нужен 1 кВт⋅ч на 10 м^2">?</span>
      </label>
      <input
          :value="heating.power_usage||''"
          @input="updatePowerUsage"
          class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="power_output_heating" type="number" placeholder="Пример: 10">
    </div>
  </div>
</template>

<script>
export default {
  name: "FillHeatingData",
  data: () => ({
    is_using_radiator: false,
  }),
  methods: {
    updatePowerUsage(e) { // in
      this.$store.commit('setHeating', {
        power_usage: parseFloat(e.target.value||0)
      })
    },
    // toggleOffline() {
    //   this.$store.commit('setHeating', {
    //     offline: !this.heating.offline
    //   })
    // }
  },
  computed: {
    heating() {
      return this.$store.state.heating;
    },
  }
}
</script>

<style scoped>

</style>