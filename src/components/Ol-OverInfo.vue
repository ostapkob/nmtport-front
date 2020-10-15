<template>
<div>
  <div>
    <input type="checkbox" id="visible" checked> Toggle Layer Visibility
    <div ref="map" class='map'> </div>
    <div ref="overlay" class='overlay'></div>
  </div>
</div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from 'ol/Overlay'
import {Tile as TileLayer } from 'ol/layer';
import {OSM } from 'ol/source';
import {transform} from 'ol/proj';
import {DragRotateAndZoom} from 'ol/interaction';
import {FullScreen} from 'ol/control';
import {toStringHDMS} from 'ol/coordinate'

export default {
   data() {
     return {
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
        zoom: 16,
        constrainResolution: true
      })
      var interaction = new DragRotateAndZoom();
      var control = new FullScreen();
      var overlay = new Overlay({
        position: center,
        //element: document.getElementById('overlay')
        element: this.$refs['overlay']
      })

      var map = new Map({
        target: this.$refs['map'],
        layers: [layer],
        interaction: [interaction],
        control: [control],
        view: view,
      })

        map.on('click', function(event) {
          // extract the spatial coordinate of the click event in map projection units
          var coord = event.coordinate;
          // transform it to decimal degrees
          var degrees = transform(coord, 'EPSG:3857', 'EPSG:4326');
          // format a human readable version
          var hdms = toStringHDMS(degrees);
          // update the overlay element's content
          var element = overlay.getElement();
          element.innerHTML = hdms;
          // position the element (using the coordinate in the map's projection)
          overlay.setPosition(coord);
          // and add it to the map
          map.addOverlay(overlay);

          console.log(coord)
          console.log(degrees)
          console.log(hdms)
        });

      //map.addLayer(layer) // not need if you are already adding overlay
      //map.setView(view)
    }
  },

  components: {
  }
}
</script>

<style>
.map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 300px;
  width: 100%;
  background: #ccc;
}
.overlay {
  background: #A5E553;
  width: 220px;
  height: 20px;
  border-radius: 20px;
}
</style>
