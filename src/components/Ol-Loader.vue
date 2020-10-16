<template>
  <div>
    <div ref="map" id="ol-map"> </div>
    <!-- <div id="overlay"></div> -->
    <template v-if="Boolean(this.map)">
        <slot
          :map="map"
        />
    </template>
  </div>
</template>

<script>
import "ol/ol.css";

import Map from "ol/Map";
import View from "ol/View";
//import Overlay from 'ol/Overlay'
import {Tile as TileLayer } from 'ol/layer';
import {OSM } from 'ol/source';
import {transform} from 'ol/proj';
import {DragRotateAndZoom} from 'ol/interaction';
import {FullScreen} from 'ol/control';

export default {
   data() {
     return {
      map: null
     }
   },
  mounted() {
    this.initiateMap()
  },
  methods: {
    initiateMap() {
      //create a layer with the OSM sourse
      var layer = new TileLayer({
        source: new OSM() // OpenStreetMap
      })
      //create view with center postion
      var center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')

      var view = new View({
        center: center,
        rotation: Math.PI / 2.75,
        zoom: 16
      })
      var interaction = new DragRotateAndZoom();
      var control = new FullScreen();
      //var overlay = new Overlay({
      //  position: center,
       // element: document.getElementById('overlay')
      //})

      this.map = new Map({
        target: this.$refs['map'],
        layers: [layer],
        interaction: [interaction],
        control: [control],
        //overlay: [overlay],
        view: view,
      })

      this.map.setView(view)
      //this.map.addOverlay(overlay);
    }
  },

  components: {
  }
}
</script>

<style>
#ol-map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 500px;
  width: 100%;
  background: #ccc;
}
#overlay {
  background: blue;
  width: 20px;
  height: 20px;
  border-radius: 80px;
}
</style>
