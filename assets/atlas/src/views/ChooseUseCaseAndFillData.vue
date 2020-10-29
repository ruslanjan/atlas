<template>
  <div>
    <div class="hidden md:block">
      <div class="md:grid grid-cols-7 min-h-screen">
        <div class="md:block md:col-span-3 border-r">
          <use-case-selection/>
        </div>
        <div class="hidden md:block col-span-3 h-screen overflow-y-scroll">
          <filling-data/>
        </div>
        <div class="col-span-1 justify-end hidden md:flex">
          <div class="h-full mx-8 bg-center"
               :style="`background-image: url('${require('../assets/kz_ornament.svg')}'); width: 128px`"></div>
        </div>
      </div>
    </div>
    <div class="md:hidden">
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import FillingData from "@/views/FillingData";
import UseCaseSelection from "@/views/UseCaseSelection";

export default {
  name: "ChooseUseCaseAndFillData",
  components: {
    'filling-data': FillingData,
    'use-case-selection': UseCaseSelection
  },
  mounted() {
    if (!this.$store.state.location.latlng) {
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>

</style>