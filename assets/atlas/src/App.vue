<template>
  <div id="app">
    <div class="container">
      <div id="mapContainer"></div>
      <div id="ui">
        some text
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([46.252345, 73.903427], 5);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.map.on('click', async (e) => {
      console.log(e.latlng);
      let res = await axios.get(`http://localhost:5000/dni/${e.latlng.lat}/${e.latlng.lng}`)
      if (this.marker) {
        this.marker.remove();
      }
      let icon = L.icon({
        iconUrl: 'icons/marker.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize: [48, 48], // size of the icon
        iconAnchor: [20, 38], // point of the icon which will correspond to marker's location
        // popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      this.marker = L.marker([e.latlng.lat, e.latlng.lng], {icon: icon});
      this.marker.addTo(this.map)
      console.log(res.data)
    });
    L.tileLayer("http://localhost:5000/dni/{z}/{x}/{y}.png", {
      tms: true,
      opacity: 0.7,
      attribution: "",
      minZoom: 1,
      maxZoom: 12
    }).addTo(this.map)
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
}

#mapContainer {
  height: 100vh;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
#ui {
  padding: 12px;
}

@media only screen and (max-width: 768px) {
  #mapContainer {
    z-index: -1;
    position: absolute;
    width: 100vw;
  }
  #ui {
    z-index: 1;
  }
}
</style>
