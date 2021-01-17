<template>
  <div>
    <div class="wrapper">
      <div ref="map" class="ol-map"> </div>
    <!-- <div id="overlay"></div> -->
      <b-button @click="chengeTerminal()" class="terminal" size="sm" variant="outline-info">
        {{nameTerminal}}
      </b-button>
      
    <!-- <b-button @click="refresh" class="settings" size="sm" variant="outline-info" width=100px>test</b-button> -->
    <b-button v-b-toggle.sidebar class="slidebar" size="sm" variant="outline-info">Легенда</b-button>
    </div>
  <!-- <b-button @click="showMap()" class='mt-1' size="sm" variant="info"> -->
  <!--   showMap -->
  <!-- </b-button> -->
  <!-- <b-button @click="screenSize()" class='mt-1 ml-1' size="sm" variant="info"> -->
  <!--   screenSize -->
    <template v-if="Boolean(this.map) ">
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
//import {OSM } from 'ol/source';
import {transform} from 'ol/proj';
import {DragRotateAndZoom} from 'ol/interaction';
//import {FullScreen} from 'ol/control';
import {Tile as TileLayer } from 'ol/layer';
//import upAndDown from 'ol/easing'
import XYZ from 'ol/source/XYZ';
import {mapActions} from 'vuex'

export default {
   data() {
     return {
      map: null,
      view: null,
      terminal: true,
      nameTerminal: 'ГУТ-2',
      screenWidth: null,
      screenHeight: document.documentElement.clientHeight,
      heightS: 500
     }
   },
  async mounted() {
    this.screenWidth = document.documentElement.clientWidth
    await this.initiateMap(this.clearSelectedFeatures);
  },
  methods: {
    ...mapActions([
        'SET_SELECTED_FEATURES'
    ]),
    screenSize() {
      console.log(this.screenWidth)
    },
    initiateMap(fun) {
      //create a layer with the OSM sourse
      let layer = new TileLayer({
        source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      })
      //create view with center postion

      let center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      let rotationMap
      this.screenWidth>450 ? rotationMap = Math.PI / 2.71 : rotationMap = 0
      this.view = new View({
        center: center,
        rotation: rotationMap,
        zoom: 16
      })
      let interaction = new DragRotateAndZoom();
      //let control = new FullScreen();
      //let overlay = new Overlay({
      //  position: center,
       // element: document.getElementById('overlay')
      //})

      let map = new Map({
        target: this.$refs['map'],
        layers: [layer],
        interaction: [interaction],
//        control: [control],
        //overlay: [overlay],
        view: this.view,
      })
      this.map = map
      this.map.on('click', function (evt) {
        var coord = evt.coordinate;
        var degrees = transform(coord, 'EPSG:3857', 'EPSG:4326');
        console.log(degrees)
        fun()
      })
    },
      clearSelectedFeatures() {
        this.SET_SELECTED_FEATURES([])
      },
    chengeTerminal() {
      this.terminal = !this.terminal
      let center
      let zoomTerminal
      let rotationMap
      if (this.terminal) {
        this.nameTerminal = 'ГУТ-2'
        this.screenWidth>400 ? rotationMap = Math.PI / 2.71 : rotationMap = 0
        center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      zoomTerminal = 16
      }
      else {
        this.nameTerminal = 'УТ-1'
        center = transform([132.90060, 42.8031], 'EPSG:4326', 'EPSG:3857')
        zoomTerminal = 15.5
      }
      this.view.animate({
        center: center,
        rotation: rotationMap,
        zoom: zoomTerminal,
        duration: 1000,
        //easing: this.bounce,
      })
    },
    showMap() {
      let center = this.map.getView().getCenter()
      let transCenter = transform(center,  'EPSG:3857', 'EPSG:4326')
      console.log(transCenter)
      console.log(this.map)
    },
  },
  components: {
  }
}
</script>

<style lang="scss">
.ol-map {
  position: relative;
  margin: 0;
  padding: 0;
  height: 70vh;
  width: 100%;
  background: #ccc;
  margin-top: 5px;
}
#overlay {
  background: blue;
  width: 20px;
  height: 20px;
  border-radius: 80px;
}
.slidebar {
  position: absolute;
  bottom: 2px;
  right: 2px;
}
.settings {
  position: absolute;
  bottom: 34px;
  right: 2px;
}
.terminal {
  position: absolute;
  bottom: 2px;
  left: 2px;
}
.wrapper{
  position: relative
}
</style>
