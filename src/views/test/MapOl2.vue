<template>
  <div id="app" class="mt-0">
    <div id="map"></div>
    <div id="marker"> </div>
  </div>
</template>
<script>
/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map
import Map from "ol/Map";
import View from "ol/View";
import Overlay from 'ol/Overlay';
import { defaults as defaultControls, ScaleLine } from "ol/control";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {fromLonLat, toLonLat} from 'ol/proj';
export default {
  data () {
       return {
           polling: null
       }
   },
  async mounted() {
    await this.initiateMap();
  },
  methods: {

    initiateMap() {
      // create vector layer
      var source = new VectorSource();
      var vector = new VectorLayer({
        source: source
      });
      // create title layer
      var raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer
      var map = new Map({
        //controls: defaultControls().extend([
          //new ScaleLine({
            //units: "degrees",
          //}),
        //]),
        target: "map",
        //layers: [raster, vector],
        layers: [raster],
        view: new View({
          projection: "EPSG:4326",
          center: [132.8896, 42.8128],
          zoom: 16.3,
          maxZoom: 17,
        //  minZoom: 15,
          rotation: Math.PI / 3.1,
        }),
      });
    var pos = fromLonLat([132.8896, 42.8128]);
    var marker = new Overlay({
      position: pos,
      positioning: 'center-center',
      element: document.getElementById('marker'),
      stopEvent: false,
    })
  map.addOverlay(marker);
  },


  },
};
</script>
<style>
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 800px;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
</style>
