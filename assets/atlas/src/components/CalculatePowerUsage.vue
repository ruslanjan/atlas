<template>
  <div>
    <div class="text-lg font-bold">Узнать мощность</div>
    <table class="table-fixed w-full">
      <thead>
      <tr>
        <th class="px-4 py-2">Прибор:</th>
        <th class="px-4 py-2">Количество:</th>
        <th class="px-4 py-2">Мощность:</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="item in items" :key="item.id">
        <td>
        </td>
        <td></td>
        <td>
          <div class="w-full px-3 mb-6 md:mb-0">
            <input
                class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name" type="number" v-model.number="item.power" placeholder="0 вт">
          </div>
        </td>
      </tr>

      </tbody>
    </table>
    <div class="flex justify-between align-center items-center">
      <div class="link flex align-center items-center" @click="addItem">
        <div class="text-2xl font-medium">+</div>
        <div class="pl-2">Добавить ещё прибор</div>
      </div>
      <div>Итого: {{ estimated }} Вт</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalculatePowerUsage",
  data: () => ({
    items: [],
    estimated: 0,
    counter: 0
  }),
  methods: {
    addItem() {
      this.items.push({
        id: this.counter++,
        name: "",
        count: 0,
        power: 0,
      })
    }
  },
  mounted() {
    this.addItem();
  }
}
</script>

<style scoped>

</style>