<template>
  <div id="container" class="h-screen grid">
    <div class="md:hidden map-close bg-white p-2 m-2 hover:bg-gray-300 cursor-pointer rounded-lg" @click="showMap=false">
      <svg height="32px" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
    </div>
    <div id="ui" :class="`bg-white ${!showMap?'flex':'hidden'} md:flex flex-col px-6 py-12 overflow-y-scroll`">
      <div class="prose pb-5">
        <h2>
          Калькулятор по применению возобновляемой энергии
        </h2>
        <p>
          Узнайте требуемые тип и количество солнечного оборудования для ваших целей
        </p>
        <p>
          Для начала выберите местоположение на карте
        </p>
        <p v-if="location.selected_area_name">
          Выбрано: <strong>{{ location.selected_area_name }}</strong>
        </p>
      </div>
      <a class="text-lg text-blue-500 cursor-pointer underline hover:text-blue-300 rounded py-1 md:hidden" @click="showMap=true">Открыть Карту</a>
      <div class="flex-grow"></div>
      <component :is="!location.latlng ? 'span' : 'router-link'" :to="{name: 'UseCaseSelection'}"
                   :class="`btn ${!location.latlng?'btn-disabled':''}`">Продолжить</component>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'

export default {
  name: 'Home',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      map: null,
      marker: null,
      showMap: false,
      mapResizeInterval: null,
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([48.10743118848039, 68.28208595042987], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.mapResizeInterval = setInterval(() => {this.map.invalidateSize()}, 400);
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
      console.log(e.latlng);
      let location = {
        latlng: null,
        irradiation: null,
        selected_area_name: null
      }
      let res = await axios.get(`http://localhost:5000/dni/${e.latlng.lat}/${e.latlng.lng}`)
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
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: icon});
      this.marker.addTo(this.map)
      location.latlng = e.latlng
      location.irradiation = res.data.irradiation
      res = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${e.latlng.lat}&lon=${e.latlng.lng}` +
          `&format=json`, {
            headers: {
              // header1: value,
            }
          })
      location.selected_area_name = res.data.display_name
      this.$store.commit('setLocation', location)
      this.marker.bindPopup(`<b>${res.data.display_name}</b>.`).openPopup();
    });
    L.tileLayer("http://localhost:5000/dni/{z}/{x}/{y}.png", {
      tms: true,
      opacity: 0.7,
      attribution: "",
      minZoom: 1,
      maxZoom: 12
    }).addTo(this.map)
  },
  computed: {
    location() {
      return this.$store.state.location
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
