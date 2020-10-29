<template>
  <div>
    <div class="prose">
      <h2>Поддержка отопления</h2>
      <h4>Тип отопительной системы установленный на объекте</h4>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Радиаторы
        <input type="checkbox">
        <span class="checkmark"></span>
      </label>
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
        Желаемая мощность (в кВт⋅ч в день)
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
  methods: {
    updatePowerUsage(e) { // in
      this.$store.commit('setHeating', {
        power_usage: parseInt(e.target.value||0)
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