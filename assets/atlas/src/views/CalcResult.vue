<template>
  <div class="grid h-screen grid-cols-1 md:grid-cols-8">
    <div class="flex flex-col overflow-y-scroll py-12 px-6 col-span-3">
      <div class="flex justify-between align-center" style="flex-shrink: 0">
        <router-link :to="{name: 'FillingData'}"
                     class="text-lg flex align-stretch text-blue-500 hover:underline cursor-pointer hover:text-blue-300 rounded py-1">
          <div class="inline-flex flex-col justify-center">
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
        <router-link class="text-lg link rounded py-1" :to="{name: 'Home'}">В начало</router-link>
      </div>
      <div class="py-3" ref="resultText" id="resultText">
        <div class="text-4xl font-medium">Результаты</div>
        <div class="py-6" v-if="electricity.active">
          <div class="text-2xl font-medium">Электричество</div>
          <div class="flex flex-col gap-3 py-3">
            <div class="flex items-center">
              <img src="icons/bolt.svg" class="h-8 pr-3" alt="">
              <div>
                Годовая выработка системы ~ {{ calculateElectricity().need_energy.toFixed(2) }} кВт⋅ч в
                год
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/solar-panel.svg" class="h-8 pr-3" alt="">
              <div>
                Площадь солнечных панелей ~ {{ calculateElectricity().solar_panel_area.toFixed(2) }} м<sup>2</sup>
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/tenge.svg" class="h-8 pr-3" alt="Стоимость">
              <div>
                Приблизительная стоимость оборудования ~ {{ calculateElectricity().estimated_cost.toFixed(0) }} тг
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/leaf.svg" class="h-8 pr-3" alt="">
              <div>
                Сокращение выбросов CO2 ~ {{ (calculateElectricity().CO2_reduced).toFixed(2) }} т/год
              </div>
            </div>
          </div>
          <div class="prose">
            <p>
              *солнечная энергия не может обеспечивать 100% энергозатрат,
              в связи с чем Вам необходимо иметь резервные
              источники электроэнергии.
              <br/>
              *Приведенные данные о выработке и стоимости носят информативный характер.
            </p>
          </div>
        </div>

        <div class="py-6" v-if="heating.active">
          <div class="text-2xl font-medium">Поддержка отопления</div>
          <div class="flex flex-col gap-3 py-3">
            <div class="flex items-center">
              <img src="icons/bolt.svg" class="h-8 pr-3" alt="">
              <div>
                Отопительная выработка системы ~ {{ calculateHeating().need_energy.toFixed(2) }} кВт⋅ч в
                год
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/solar-panel.svg" class="h-8 pr-3" alt="">
              <div>
                Площадь солнечных коллекторов ~ {{ calculateHeating().solar_collector_area.toFixed(2) }} м<sup>2</sup>
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/tenge.svg" class="h-8 pr-3" alt="Стоимость">
              <div>
                Приблизительная стоимость оборудования ~ {{ calculateHeating().estimated_cost.toFixed(0) }} тг
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/leaf.svg" class="h-8 pr-3" alt="">
              <div>
                Сокращение выбросов CO2 ~ {{ (calculateHeating().CO2_reduced).toFixed(2) }} т/год
              </div>
            </div>
          </div>
          <div class="prose">
            <p>
              *солнечная энергия не может обеспечивать 100% тепла для отопления,
              в связи с чем пользователь должен
              будет иметь резервные источники отопления.
              <br/>
              *Приведенные данные о выработке и стоимости носят информативный характер.
            </p>
          </div>
        </div>

        <div class="py-6" v-if="hotWater.active">
          <div class="text-2xl font-medium">Горячее водоснабжение</div>
          <div class="flex flex-col gap-3 py-3">
            <div class="flex items-center">
              <img src="icons/tap-water.svg" class="h-8 pr-3" alt="">
              <div>
                Расход горячей воды ~ {{ (hotWater.consumption_per_day * 1000).toFixed(2) }} л/сут
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/bolt.svg" class="h-8 pr-3" alt="">
              <div>
                Эквивалент годовой экономии электроэнергии ~ {{ calculateHotWater().need_energy.toFixed(2) }} л/сут
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/solar-panel.svg" class="h-8 pr-3" alt="">
              <div>
                Площадь солнечных коллекторов ~ {{ calculateHotWater().solar_collector_area.toFixed(2) }} м<sup>2</sup>
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/tenge.svg" class="h-8 pr-3" alt="Стоимость">
              <div>
                Приблизительная стоимость оборудования ~ {{ calculateHotWater().estimated_cost.toFixed(0) }} тг
              </div>
            </div>
            <div class="flex items-center">
              <img src="icons/leaf.svg" class="h-8 pr-3" alt="">
              <div>
                Сокращение выбросов CO2 ~ {{ (calculateHotWater().CO2_reduced).toFixed(2) }} т/год
              </div>
            </div>
          </div>
          <div class="prose">
            <p>
              *солнечная энергия не может обеспечивать 100% затрат горячей воды,
              в связи с чем пользователь должен будет
              использовать резервные источники горячей воды.
              <br/>
              *Приведенные данные о выработке и стоимости носят информативный характер.
            </p>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 pt-6">
        <button class="btn" @click="makePdf">Скачать результат</button>
        <button class="btn" @click="resetStateAndGoHome">Начать с начала
        </button>
      </div>
    </div>
    <div class="hidden md:block col-span-5" id="mapContainer"></div>
  </div>
</template>

<script>
import L from "leaflet";
import html2pdf from "html2pdf.js";
import {host} from "@/api";

// Energy conversion efficiency
const ENERGY_CONVERSION_EFFICIENCY_OF_SOLAR_PANEL = 0.25;
const ENERGY_CONVERSION_EFFICIENCY_OF_SOLAR_COLLECTOR = 0.60;
// // CO2 Coefficient
const CO2_TONS_PER_KWH = 0.919 / 1000 // in tons of CO2 per kWh
// // Price per m^2
const SOLAR_PANEL_PRICE_PER_METER_SQUARED = 90000; // to be discussed
const SOLAR_COLLECTOR_PRICE_PER_METER_SQUARED = 100000; //

export default {
  name: "CalcResult",
  data: () => ({
    map: null,
    marker: null
  }),
  methods: {
    makePdf() {
      let element = this.$el.querySelector('#resultText');
      const opt = {
        margin: 30,
        filename: `Расчет на '${this.location.selected_area_name}'.pdf`,
      };
      html2pdf().set(opt).from(element).save()

      // doc.text("Hello world!", 10, 10);
      // doc.save(`Расчет на '${this.location.selected_area_name}'.pdf`);

    },
    resetStateAndGoHome() {
      this.$store.commit('resetState');
      this.$router.replace({name: 'Home'})
    },
    calculateElectricity() {
      let res = {
        need_energy: 0, // in kWh per year
        solar_panel_area: 0, // in m^2
        estimated_cost: 0, // in Kazakhstan currency
        CO2_reduced: 0, // in ton/years
      };
      res.need_energy = this.electricity.power_usage * 365;
      res.solar_panel_area = res.need_energy /
          (this.location.irradiation * ENERGY_CONVERSION_EFFICIENCY_OF_SOLAR_PANEL);
      res.estimated_cost = res.solar_panel_area * SOLAR_PANEL_PRICE_PER_METER_SQUARED;
      res.CO2_reduced = res.need_energy * CO2_TONS_PER_KWH;
      if (this.electricity.offline) {
        res.estimated_cost *= 2;
      }
      return res;
    },
    calculateHeating() {
      let res = {
        need_energy: 0, // in kWh per year
        solar_collector_area: 0, // in m^2
        estimated_cost: 0, // in Kazakhstan currency
        CO2_reduced: 0, // in ton/years
      };
      res.need_energy = this.heating.power_usage * 365;
      res.solar_collector_area = res.need_energy /
          (this.location.irradiation * ENERGY_CONVERSION_EFFICIENCY_OF_SOLAR_COLLECTOR);
      res.estimated_cost = res.solar_collector_area * SOLAR_COLLECTOR_PRICE_PER_METER_SQUARED;
      res.CO2_reduced = res.need_energy * CO2_TONS_PER_KWH;

      return res;
    },
    calculateHotWater() {
      let res = {
        need_energy: 0, // in kWh per year
        solar_collector_area: 0, // in m^2
        estimated_cost: 0, // in Kazakhstan currency
        CO2_reduced: 0, // in ton/years
      };
      // water specific heat is 4182 j/(kg * °C)
      // we need to heat from 13 °C to 60 °C
      // which is 47°
      // water density is about 997 kg/m^3
      // so ∆T * cp * V * D
      // more appropriately 47 * 4.186 * V * 997
      //
      res.need_energy = 47 * 4182 * this.hotWater.consumption_per_day/*V*/ * 997 / 3600 * 365 / 1000;
      res.solar_collector_area = res.need_energy /
          (this.location.irradiation * ENERGY_CONVERSION_EFFICIENCY_OF_SOLAR_COLLECTOR);
      res.estimated_cost = res.solar_collector_area * SOLAR_COLLECTOR_PRICE_PER_METER_SQUARED;
      res.CO2_reduced = res.need_energy * CO2_TONS_PER_KWH;
      return res;
    },
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
    },

    location() {
      return this.$store.state.location
    }
  },
  mounted() {
    if (!this.$store.state.location.latlng && !this.anyCaseSelected()) {
      this.$router.push("/")
      return;
    }
    this.map = L.map("mapContainer").setView([46.252345, 73.903427], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.tileLayer(host + "/dni/{z}/{x}/{y}.png", {
      tms: true,
      opacity: 0.7,
      attribution: "",
      minZoom: 1,
      maxZoom: 12
    }).addTo(this.map)
    this.mapResizeInterval = setInterval(() => {
      this.map.invalidateSize()
    }, 400);


    let icon = L.icon({
      iconUrl: 'icons/marker.png',
      // shadowUrl: 'leaf-shadow.png',

      iconSize: [48, 48], // size of the icon
      iconAnchor: [24, 44], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -44] // point from which the popup should open relative to the iconAnchor
    });
    this.marker = L.marker([this.location.latlng.lat, this.location.latlng.lng], {icon: icon});
    this.marker.addTo(this.map);
    this.marker.bindPopup(`<b>${this.location.selected_area_name}</b>.`).openPopup();
    this.map.setView(this.location.latlng, 5);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
      clearInterval(this.mapResizeInterval)
    }
  }
}
</script>

<style scoped>

</style>