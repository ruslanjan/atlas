<template>
  <div class="flex flex-col py-12 px-6 min-h-screen">
    <div class="flex justify-between align-center">
      <router-link :to="{name: 'Home'}"
                   class="text-lg flex align-stretch text-blue-500 hover:underline cursor-pointer hover:text-blue-300 rounded py-1">
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
      <router-link class="md:hidden text-lg link rounded py-1" :to="{name: 'Home'}">В начало</router-link>
    </div>
    <div class="py-12 prose md:prose-xl">
      <h2>Для каких целей желаете использовать солнечные источники энергии?</h2>
    </div>

    <div class="my-4">
      <label class="checkbox-container">Электроснабжение
        <input type="checkbox" v-bind:checked="electricity.active" @input="toggleElectricityStatus">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Поддержка отопления
        <input type="checkbox" v-bind:checked="heating.active" @input="toggleHeatingStatus">
        <span class="checkmark"></span>
      </label>
    </div>
    <div class="my-4">
      <label class="checkbox-container">Горячее водоснабжение
        <input type="checkbox" v-bind:checked="hotWater.active" @input="toggleHotWaterStatus">
        <span class="checkmark"></span>
      </label>
    </div>

    <div class="flex-grow"></div>

    <div class="flex flex-col align-stretch">
      <component :is="!anyCaseSelected ? 'span' : 'router-link'" :to="{name: 'CalcResult'}"
              :class="`btn ${!anyCaseSelected?'btn-disabled':''} hidden md:block`">Рассчитать</component>
      <component :is="!anyCaseSelected ? 'span' : 'router-link'" :to="{name: 'FillingData'}"
                 :class="`btn ${!anyCaseSelected?'btn-disabled':''} md:hidden`">Продолжить</component>
    </div>
  </div>
</template>

<script>

export default {
  name: "UseCaseSelection",
  methods: {
    toggleElectricityStatus() {
      this.$store.commit('setElectricity', {
        active: !this.electricity.active
      })
    },
    toggleHeatingStatus() {
      this.$store.commit('setHeating', {
        active: !this.heating.active
      })
    },
    toggleHotWaterStatus() {
      this.$store.commit('setHotWater', {
        active: !this.hotWater.active
      })
    }
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
    },

    anyCaseSelected() {
      return (
          this.electricity.active ||
          this.heating.active ||
          this.hotWater.active
      )
    },
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