<template>
  <div>
    <div class="text-lg font-bold">Узнать расход горячей воды</div>
    <div class="text-sm text-gray-600 italic">Информация ниже носит справочный характер</div>
    <div v-for="(item, index) in items" :key="item.id" class="grid grid-cols-2 lg:grid-cols-7 gap-2">
      <div class="pt-8 lg:pt-8 col-span-2 lg:col-span-3">
        <label class="block text-lg mb-2"
               :for="`name_${item.id}`">
          Прибор {{ index + 1 }}:
        </label>
        <div class="relative">
          <select
              class="block appearance-none w-full border py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="`name_${item.id}`" @input="(e) => initItemFromDevice(index, e.target.value)">
            <option>Выберите прибор</option>
            <optgroup v-for="(v, k) in getDevicesGrouped()" :label="k" :key="k">
              <option v-for="device in v" :key="device">{{ device }}</option>
            </optgroup>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="pt-3 lg:pt-8 lg:col-span-2">
        <label class="block text-lg mb-2" :for="`consuming_${item.id}`">
          Количество:
        </label>
        <div class="flex">
          <div class="flex flex-col justify-center px-3 border rounded-l cursor-pointer hover:bg-gray-200 select-none"
               @click="() => {if (item.count>0) {item.count -= 1}}">
            <span class="text-3xl font-medium block text-gray-700">-</span>
          </div>
          <div>
            <input
                class="appearance-none block text-center w-full border-t border-b py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                :id="`consuming_${item.id}`" v-model.number="item.count" type="number" placeholder="Пример: 10">
          </div>
          <div class="flex flex-col justify-center px-3 border rounded-r cursor-pointer hover:bg-gray-200 select-none"
               @click="() => {item.count += 1}">
            <span class="text-2xl font-normal block text-gray-700">+</span>
          </div>
        </div>
      </div>
      <div class="pt-3 lg:pt-8 lg:col-span-2">
        <label class="block text-lg mb-2" :for="`consuming_${item.id}`">
          Расход:
        </label>
        <div class="consume">
          <input
              class="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="`consuming_${item.id}`" v-model.number="item.consume" type="number" placeholder="Пример: 10">
        </div>
      </div>
    </div>
    <div class="flex justify-between align-center items-center border-t-2 mt-6">
      <div class="link flex align-center items-center" @click="addItem">
        <div class="text-2xl font-medium">+</div>
        <div class="pl-2">Добавить ещё прибор</div>
      </div>
      <div>Итого: {{ estimated }} литров в сутки</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HotWaterCalculator",
  data: () => ({
    items: [],
    estimated: 0,
    counter: 0,
    devices_select: {
      "Душ": 40,
      "Ванна": 60,
      "Рукомойник": 10,
    }
  }),
  methods: {
    addItem() {
      this.items.push({
        id: this.counter++,
        name: "",
        count: 0,
        consume: 0,
      })
    },
    initItemFromDevice(index, device) {
      this.$set(this.items, index, {
        ...this.items[index],
        name: device,
        count: 1,
        consume: this.devices_select[device],
      })
    },
    getDevicesGrouped() {
      let current = '';
      let t = {};
      t[current] = [];
      Object.entries(this.devices_select).forEach((item) => {
        if (item[1] !== 0) {
          t[current].push(item[0]);
        } else {
          current = item[0];
          t[current] = [];
        }
      })
      return t;
    }
  },
  watch: {
    items: {
      handler: function (val) {
        this.estimated = val.reduce((acc, v) => {
          return acc + v.consume * v.count;
        }, 0)
      },
      deep: true
    }
  },
  mounted() {
    if (this.$store.state.hotWater.calculator_state) {
      Object.assign(this.$data, this.$store.state.hotWater.calculator_state);
    } else {
      this.addItem();
    }
  },
  beforeDestroy() {
    this.$store.commit('setHotWaterCalculatorState', this.$data)
  }
}
</script>

<style scoped>
.consume {
  display: inline-block;
  position: relative;
}

.consume::after {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  bottom: 0;
  right: .5em;
  transition: all .05s ease-in-out;
}

/* move unit more to the left on hover or focus within
   for arrow buttons will appear to the right of number inputs */
.consume:hover::after,
.consume:focus-within::after {
  right: 1.5em;
}

/* handle Firefox (arrows always shown) */
@supports (-moz-appearance:none) {
  div::after {
    right: 1.5em;
  }
}

.consume::after {
  content: "л/сут";
}
</style>
