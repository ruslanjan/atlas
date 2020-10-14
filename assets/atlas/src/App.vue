<template>
  <div id="app">
    <div class="container">
      <div id="mapContainer"></div>
      <div>
        some text
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

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
    L.tileLayer("http://localhost:5000/dni/{z}/{x}/{y}.png", {tms: true, opacity:0.7, attribution: "", minZoom: 1, maxZoom: 12}).addTo(this.map)
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
</style>
