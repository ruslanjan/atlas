<template>
  <div class="flex flex-col min-h-screen py-12 px-8">
    <div class="flex justify-between align-center">
      <router-link :to="{name: 'UseCaseSelection'}"
                   class="md:hidden text-lg flex align-stretch text-blue-500 hover:underline cursor-pointer hover:text-blue-300 rounded py-1">
        <div class="flex flex-col justify-center">
          <div class="h-5 fill-current">
            <svg viewBox="0 0 512 512" xml:space="preserve" height="100%">
            <g>
              <g>
                <path d="M492,236H68.442l70.164-69.824c7.829-7.792,7.859-20.455,0.067-28.284c-7.792-7.83-20.456-7.859-28.285-0.068
                  l-104.504,104c-0.007,0.006-0.012,0.013-0.018,0.019c-7.809,7.792-7.834,20.496-0.002,28.314c0.007,0.006,0.012,0.013,0.018,0.019
                  l104.504,104c7.828,7.79,20.492,7.763,28.285-0.068c7.792-7.829,7.762-20.492-0.067-28.284L68.442,276H492
                  c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
              </g>
            </g>
            </svg>
          </div>
        </div>
        <span class="px-2">Назад</span>
      </router-link>
      <div class="text-lg py-1 text-white hidden md:block">Ruslan Jankurazov</div>
      <router-link
          class="md:hidden text-lg text-blue-500 hover:underline cursor-pointer hover:text-blue-300 rounded py-1"
          :to="{name: 'Home'}">В начало
      </router-link>
    </div>
    <div class="py-12 flex flex-col gap-4">
      <div v-if="electricity.active">
        <fill-electricity-data/>
        <hr/>
      </div>
      <div v-if="heating.active">
        <fill-heating-data/>
        <hr/>
      </div>
      <div v-if="hotWater.active">
        <fill-hot-water-data/>
      </div>
    </div>
    <div class="flex-grow"></div>
    <div class="flex flex-col align-stretch">
      <router-link :to="{name: 'CalcResult'}"
                   class="btn block md:hidden">Рассчитать</router-link>
    </div>
  </div>
</template>

<script>
import FillElectricityData from "@/components/FillElectricityData";
import FillHeatingData from "@/components/FillHeatingData";
import FillHotWaterData from "@/components/FillHotWaterData";

export default {
  name: "FillingData",
  components: {FillHotWaterData, FillHeatingData, FillElectricityData},
  methods: {
    anyCaseSelected() {
      return (
          this.electricity.active ||
          this.heating.active ||
          this.hotWater.active
      )
    },
  },
  computed: {
    electricity() {
      return this.$store.state.electricity;
    },

    heating() {
      return this.$store.state.heating;
    },

    hotWater() {
      return this.$store.state.hotWater;
    }
  },
  mounted() {
    if (!this.anyCaseSelected() && this.$route.name === 'FillingData') {
      this.$router.push("/") // fix this bug
    }
  }
}
</script>

<style scoped>

</style>