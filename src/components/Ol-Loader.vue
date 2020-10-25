<template>
  <div>
    <div ref="map" id="ol-map"> </div>
    <!-- <div id="overlay"></div> -->
  <b-button @click="chengeTerminal()" class="mt-1 mr-2" size="sm" variant="warning">
    {{nameTerminal}}
  </b-button>
  <b-button @click="showMap()" class='mt-1' size="sm" variant="info">
    showMap
  </b-button>
    <template v-if="Boolean(this.map) && Boolean(this.markerSource) ">
        <slot
          :map="map"
          :markerSource = 'markerSource'
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
import {FullScreen} from 'ol/control';
import VectorSource from 'ol/source/Vector';
import {Tile as TileLayer } from 'ol/layer';
//import upAndDown from 'ol/easing'
import XYZ from 'ol/source/XYZ';

export default {
   data() {
     return {
      map: null,
      markerSource: null,
      view: null,
      terminal: true,
      nameTerminal: 'УТ-1',
     }
   },
  async mounted() {
    await this.initiateMap();
  },
  methods: {
    initiateMap() {
      //create a layer with the OSM sourse
      let layer = new TileLayer({
        source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      })
      this.markerSource = new VectorSource()
      //create view with center postion
      let center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
       this.view = new View({
        center: center,
        rotation: Math.PI / 2.75,
        zoom: 16
      })
      let interaction = new DragRotateAndZoom();
      let control = new FullScreen();
      //let overlay = new Overlay({
      //  position: center,
       // element: document.getElementById('overlay')
      //})

      let map = new Map({
        target: this.$refs['map'],
        layers: [layer],
        interaction: [interaction],
        control: [control],
        //overlay: [overlay],
        view: this.view,
      })
      this.map = map
      this.map.on('click', function (evt) {
        var coord = evt.coordinate;
        var degrees = transform(coord, 'EPSG:3857', 'EPSG:4326');
        //  var hdms = toStringHDMS(degrees);
        //  var element = overlay.getElement();
        //  element.innerHTML = hdms;
        //  overlay.setPosition(coord);
        //  map.addOverlay(overlay);
        console.log(degrees)
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });
        if (feature) {
          feature.set('click', !feature.get('click'))
        //  console.log(feature.get('id'))
          console.log(feature.get('name'))
        //  console.log(feature.get('alarm'))
        //  console.log(feature.get('state'))
       //   console.log(feature.get('time'))
        //  console.log(feature.get('click'))
        } else {
          console.log('map')
        }
      });
    this.map.on('pointermove', function (e) {
      if (e.dragging) {
        console.log('map--')
        return;
        }
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
      });
      //this.map.setView(view)
      //this.map.addOverlay(overlay);
    },
    chengeTerminal() {
      this.terminal = !this.terminal
      let center
      let zoomTerminal
      if (this.terminal) {
        this.nameTerminal = 'УТ-1'
        center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      zoomTerminal = 16
      }
      else {
        this.nameTerminal = 'ГУТ-2'
        center = transform([132.90060, 42.8031], 'EPSG:4326', 'EPSG:3857')
        zoomTerminal = 15.5
      }
      this.view.animate({
        center: center,
        rotation: Math.PI / 2.75,
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
    bounce(t) {
      var s = 7.5625;
      var p = 2.75;
      var l;
      if (t < 1 / p) {
          l = s * t * t;
        }
      else {
      if (t < 2 / p) {
        t -= 1.5 / p;
        l = s * t * t + 0.75;
      } else {
        if (t < 2.5 / p) {
          t -= 2.25 / p;
          l = s * t * t + 0.9375;
        }
        else {
          t -= 2.625 / p;
          l = s * t * t + 0.984375;
            }
          }
        }
    return l;
    }
  },
  components: {
  }
}
</script>

<style>
#ol-map {
  margin: 0;
  padding: 0;
  height: 250px;
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
