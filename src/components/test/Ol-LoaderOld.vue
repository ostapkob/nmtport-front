<template>
  <div>
    <div id="wrapper">
      <div ref="map" id="ol-map"> </div>
    <!-- <div id="overlay"></div> -->
      <b-button @click="chengeTerminal()" id='terminal' class="mt-1 mr-2" size="sm" variant="warning">
        {{nameTerminal}}
      </b-button>
    </div>
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
import {mapActions} from 'vuex'

export default {
   data() {
     return {
      map: null,
      markerSource: null,
      view: null,
      terminal: true,
      nameTerminal: 'ГУТ-2',
     }
   },
  async mounted() {
		this.SET_SELECTED_FEATURES([1,2])
    await this.initiateMap();
  },
  methods: {
    ...mapActions([
        'SET_SELECTED_FEATURES'
    ]),
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
        rotation: Math.PI / 2.71,
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
        console.log(degrees)
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });
        if (feature) {
          feature.set('click', !feature.get('click'))
          console.log(feature.get('name'))
        } else {
          console.log('click map')
          this.SET_SELECTED_FEATURES([5,6])
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
      clearSelectedFeatures() {
        console.log('ww')
        this.SET_SELECTED_FEATURES([5,6])
      },
    chengeTerminal() {
      this.terminal = !this.terminal
      let center
      let zoomTerminal
      if (this.terminal) {
        this.nameTerminal = 'ГУТ-2'
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
        rotation: Math.PI / 2.71,
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

<style>
#ol-map {
  margin: 0;
  padding: 0;
  height: 150px;
  width: 100%;
  background: #ccc;
}
#overlay {
  background: blue;
  width: 20px;
  height: 20px;
  border-radius: 80px;
}
#terminal {
  position: absolute;
  bottom: 2px;
  left: 2px;
}
#wrapper{
  position: relative
}
</style>
