<template>
  <div>
    hot water
  </div>
</template>

<script>
export default {
  name: "FillHotWaterData",
  methods: {
    updateConsumption(e) { // in m^3 per day
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
    hotWater() {
      return this.$store.state.hotWater;
    },
  }
}
</script>

<style scoped>

</style>