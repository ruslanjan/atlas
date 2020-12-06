<template>
  <div>
    <div class="text-lg font-bold">Узнать расход энергии</div>
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
        <label class="block text-lg mb-2" :for="`power_output_${item.id}`">
          Количество:
        </label>
        <div class="flex">
          <div class="flex flex-col justify-center px-3 border rounded-l cursor-pointer hover:bg-gray-200 select-none"
               @click="() => {if (item.count>0) {item.count -= 1}}">
            <span class="text-3xl font-medium block text-gray-700">-</span>
          </div>
          <div>
            <input
                class="appearance-none block w-full text-center border-t border-b py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                :id="`power_output_${item.id}`" v-model.number="item.count" type="number" placeholder="Пример: 10">
          </div>
          <div class="flex flex-col justify-center px-3 border rounded-r cursor-pointer hover:bg-gray-200 select-none"
               @click="() => {item.count += 1}">
            <span class="text-2xl font-normal block text-gray-700">+</span>
          </div>
        </div>
      </div>
      <div class="pt-3 lg:pt-8 lg:col-span-2">
        <label class="block text-lg mb-2 whitespace-nowrap" :for="`power_output_${item.id}`">
          расход энергии:
        </label>
        <div class="power">
          <input
              class="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :id="`power_output_${item.id}`" v-model.number="item.power" type="number" placeholder="Пример: 10">
        </div>
      </div>
    </div>
    <div class="flex justify-between align-center items-center border-t-2 mt-6">
      <div class="link flex align-center items-center" @click="addItem">
        <div class="text-2xl font-medium">+</div>
        <div class="pl-2">Добавить ещё прибор</div>
      </div>
      <div>Итого: {{ estimated.toFixed(2) }} кВтч</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElectricityUsageCalculator",
  data: () => ({
    items: [],
    estimated: 0,
    counter: 0,
    devices_select: {
      "Лампа (LED)": 9 / 1000,
      "Холодильник/морозильник A+ (Средний - 380л)": 150 / 1000,
      "Холодильник/морозильник A+ (Большой - 1000л)": 600 / 1000,
      "Насос для водяных скважин (1500 л/ч)": 700 / 1000,
      "Электрический водонагреватель (80л)": 2500 / 1000,
      "Отопление/охлаждение:": 0 / 1000,
      "Обогреватель": 1800 / 1000,
      "Кондиционер": 1600 / 1000,
      "Тепловой насос (отапливаемая площадь от 250 кв.м.)": 5000 / 1000,
      "Прачечная:": 0 / 1000,
      "Утюг": 1200 / 1000,
      "Стиральная машина": 1120 / 1000,
      "Кухня:": 0 / 1000,
      "Микроволновка": 1000 / 1000,
      "Кофеварка": 1000 / 1000,
      "Посудомойка": 1500 / 1000,
      "Блендер": 350 / 1000,
      "Тостер": 850 / 1000,
      "Зал:": 0 / 1000,
      "Консоль для видеоигр": 140 / 1000,
      "DVD Player": 350 / 1000,
      "ТВ (32\" LED/LCD)": 50 / 1000,
      "ТВ (65\" LED/LCD)": 130 / 1000,
      "Другие:": 0 / 1000,
      "Система безопасности": 500 / 1000,
      "Плойка": 1500 / 1000,
      "Фен": 1250 / 1000,
      "Компьютер (настольный компьютер)": 800 / 1000,
      "Электрические часы": 3 / 1000,
      "Лазерный принтер": 500 / 1000,
      "Ноутбук": 200 / 1000,
      "Зарядка для сотовых телефонов": 10 / 1000
    }
  }),
  methods: {
    addItem() {
      this.items.push({
        id: this.counter++,
        name: "",
        count: 0,
        power: 0,
      })
    },
    initItemFromDevice(index, device) {
      this.$set(this.items, index, {
        ...this.items[index],
        name: device,
        count: 1,
        power: this.devices_select[device],
      })
    },
    updatePowerUsage(value) { // in
      this.$store.commit('setElectricity', {
        power_usage: parseFloat(value || 0)
      });
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
  computed: {},
  watch: {
    items: {
      handler: function (val) {
        this.estimated = val.reduce((acc, v) => {
          return acc + v.power * v.count;
        }, 0)
        this.updatePowerUsage(this.estimated)
      },
      deep: true
    }
  },
  mounted() {
    if (this.$store.state.electricity.calculator_state) {
      Object.assign(this.$data, this.$store.state.electricity.calculator_state);
    } else {
      this.addItem();
    }
  },
  beforeDestroy() {
    this.$store.commit('setElectricityCalculatorState', this.$data)
  }
}
</script>

<style scoped>
.power {
  display: inline-block;
  position: relative;
}

.power::after {
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
.power:hover::after,
.power:focus-within::after {
  right: 1.5em;
}

/* handle Firefox (arrows always shown) */
@supports (-moz-appearance:none) {
  div::after {
    right: 1.5em;
  }
}

.power::after {
  content: "кВтч";
}
</style>