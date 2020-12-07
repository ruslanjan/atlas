<template>
  <div id="container" class="min-h-screen grid">
    <div class="md:hidden map-close bg-white p-2 m-2 hover:bg-gray-300 cursor-pointer rounded-lg"
         @click="showMap=false">
      <svg height="32px" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
        <path
            d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
      </svg>
    </div>
    <div id="ui" :class="`bg-white ${!showMap?'flex':'hidden'} md:flex flex-col px-6 py-12 overflow-y-scroll`">
      <div class="flex justify-center gap-4 pb-4">
        <img src="logos/gef.png" class="h-12 pr-3" alt="">
        <img src="logos/kz.jpg" class="h-12 pr-3" alt="">
        <img src="logos/undp.png" class="h-12 pr-3" alt="">
      </div>
      <div class="prose pb-5">
        <h2>
          Калькулятор солнечных источников энергии
          <button id="manual"
                  class="text-gray-600 font-medium rounded-full border border-gray-600 hover:bg-gray-300 text-lg cursor-pointer inline-block"
                  style="vertical-align: super; width: 1.5em">?
          </button>
        </h2>
        <tippy toSelector="#manual">
          Данный калькулятор позволит вам снизить риски при инвестиции в солнечную энергетику. Калькулятор поможет
          оценить:
          <br/>
          1. Какой площади вам нужны солнечные панели или солнечные коллекторы для отопления, обеспечения
          электричеством и горячей водой дома или любого другого объекта.
          <br/>
          2. Какова будет средняя стоимость оборудования такой площади на основании усредненных данных от поставщиков
          солнечного оборудования в Казахстане
          <br/>
          3. Сколько энергии будет выдавать система такой площади в зависимости от региона Казахстана в котором
          находится объект.
          <br/>
          4. А также, на сколько использование данного оборудования снизит ваши выбросы СО2 в атмосферу.
          <br/>
        </tippy>
        <p>
          Узнайте требуемые тип и количество солнечного оборудования для ваших целей
          <button id="manual_2"
                  class="text-gray-600 font-medium rounded-full border border-gray-600 hover:bg-gray-300 text-lg cursor-pointer inline-block"
                  style="vertical-align: super; width: 2rem">?
          </button>
        </p>
        <tippy toSelector="#manual_2">
          Для расчета технологий, вам необходимо подготовить данные о вашем энергопотреблении, введите данные в
          соответствующие поля калькулятора и нажмите "Рассчитать" или воспользуйтесь подсказками. Калькулятор
          обработает данные и отобразит их на странице результатов, данные доступны для скачивания.
          <br/>
          <strong>Методология:</strong>
          <br/>
          Калькулятор рассчитывает мощность и площадь солнечных панелей по следующей формуле:
          <br/>
          Площадь панелей = Желаемая выработка системы / (КПД панелей (20%) * Годовая инсоляция (Сколько солнечной
          энергии поступает в год на 1 м^2 в данном регионе))
          <br/>
          Для солнечных коллекторов (ГВС и отопление) используется та же самая формула, но с соответствующим КПД системы
          (65%)
        </tippy>
        <p>
          Для начала выберите местоположение на карте Республики Казахстан
        </p>
        <p v-if="location.selected_area_name">
          Выбрано: <strong>{{ location.selected_area_name }}</strong>
        </p>
      </div>
      <div class="flex gap-3">
        <input
            class="appearance-none block w-full border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="searchText" type="text" placeholder="Пример: Алматы"/>
        <button class="btn" @click="searchArea" :disabled="loading">Найти</button>
      </div>
      <a class="text-lg text-blue-500 cursor-pointer underline hover:text-blue-300 rounded py-1 md:hidden"
         @click="openMap">Открыть Карту</a>
      <div class="flex-grow"></div>
      <component :is="!location.latlng ? 'span' : 'router-link'" :to="{name: 'UseCaseSelection'}"
                 :class="`btn ${!location.latlng?'btn-disabled':''}`">Продолжить
      </component>
      <button class="btn btn-primary mt-5" @click="want_dick=!want_dick">
        Хотите встроить на свой сайт?
      </button>
      <div v-if="want_dick" class="prose">
        <h4 class="pt-5">
          Скопируйте код ниже на ваш сайт:
        </h4>
        <pre>&lt;iframe src="{{ host }}" height="600" width="500">
&lt;/iframe></pre>
      </div>
      <small class="text-gray-600">Калькулятор разработан в рамках совместного Проекта ПРООН-ГЭФ и Министерства
        Энергетики РК «Снижение рисков
        инвестирования в возобновляемые источники энергии»</small>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import {host} from "@/api";

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      map: null,
      searchText: '',
      marker: null,
      showMap: false,
      mapResizeInterval: null,
      want_dick: false,
      loading: false,
    };
  },
  methods: {
    openMap() {
      window.scrollTo(0, 0);
      this.showMap = true
    },
    async searchArea() {
      let res = await axios.get(
          `https://nominatim.openstreetmap.org/search/${encodeURI(this.searchText)}?countrycodes=KZ` +
          `&format=json`, {
            headers: {
              // header1: value,
            }
          });
      if (res.data.length > 0) {
        this.$toast.success('место найдено')
        let latlng = {
          lat: res.data[0].lat,
          lng: res.data[0].lon
        }
        this.onPositionSelected(latlng);
        this.zoomOnPosition(latlng);
        console.log(latlng)
      } else {
        this.$toast.error('Такое место не найдено')
      }
      console.log(res);
    },
    zoomOnPosition(latlng) {
      this.map.setView(latlng, 9);
    },
    async onPositionSelected(latlng) {
      console.log(latlng);
      let location = {
        latlng: null,
        irradiation: null,
        selected_area_name: null
      }
      let res = await axios.get(`${host}/dni/${latlng.lat}/${latlng.lng}`)
      if (res.data.irradiation === -1) {
        alert("Вы выбрали маркер вне Казахстана")
        return
      }
      if (this.marker) {
        this.marker.remove();
      }
      let icon = L.icon({
        iconUrl: 'icons/marker.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [48, 48], // size of the icon
        iconAnchor: [24, 44], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -44] // point from which the popup should open relative to the iconAnchor
      });
      this.marker = L.marker([latlng.lat, latlng.lng], {icon: icon});
      this.marker.addTo(this.map)
      location.latlng = latlng
      location.irradiation = res.data.irradiation
      res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}` +
          `&format=json`, {
            headers: {
              // header1: value,
            }
          })
      location.selected_area_name = res.data.display_name
      this.$store.commit('setLocation', location)
      this.marker.bindPopup(`<b>${res.data.display_name}</b>.`).openPopup();
    }
  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.10743118848039, 68.28208595042987], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.mapResizeInterval = setInterval(() => {
      this.map.invalidateSize()
    }, 400);
    if (this.location.latlng) {
      let icon = L.icon({
        iconUrl: 'icons/marker.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [48, 48], // size of the icon
        iconAnchor: [24, 44], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -44] // point from which the popup should open relative to the iconAnchor
      });
      this.marker = L.marker([this.location.latlng.lat, this.location.latlng.lng], {icon: icon});
      this.marker.addTo(this.map)
      this.marker.bindPopup(`<b>${this.location.selected_area_name}</b>.`).openPopup();
    }
    this.map.on('click', async (e) => {
      this.onPositionSelected(e.latlng)
    });
    // If need insolation layer uncomment
    // L.tileLayer(host + "/dni/{z}/{x}/{y}.png", {
    //   tms: true,
    //   opacity: 0.7,
    //   attribution: "",
    //   minZoom: 1,
    //   maxZoom: 12
    // }).addTo(this.map)
  },
  computed: {
    location() {
      return this.$store.state.location
    },
    host() {
      return host;
    }
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
#mapContainer {
  height: 100vh;
  z-index: 1;
  cursor: pointer;
}

#ui {
  z-index: 2;
}

#container {
  grid-template-columns: 1fr 2fr;
}

.map-close {
  z-index: 2;
  position: absolute;
  right: 0;
}

@media only screen and (max-width: 767px) {
  #mapContainer {
    position: absolute !important;
    width: 100vw;
  }

  #container {
    grid-template-columns: 1fr;
  }

  .show-mobile {
    display: block;
  }
}
</style>
