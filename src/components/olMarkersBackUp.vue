<template>
<div>
  <div>
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
import {Vector as VectorLayer} from 'ol/layer';
import {OSM } from 'ol/source';
import {transform} from 'ol/proj';
import {DragRotateAndZoom} from 'ol/interaction';
import {FullScreen} from 'ol/control';
import {toStringHDMS} from 'ol/coordinate'
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';

export default {
  props: {
    markers: {
      required: false,
      default() {
        return []
      }
    },
  },
   data() {
     return {
      polling: null,
     }
   },
  mounted() {
    this.initiateMap()
    console.log(this.markers.length)
  },
  methods: {
    initiateMap() {

      //create Maprkers
      let markerSource = new VectorSource()
      if (this.markers.length>0) {
        this.markers.forEach((marker) => {
          let featureProperties = new Feature(new Point(
              //transform([marker.longitude, marker.latitude],
              transform([marker.position.lng, marker.position.lat],
              'EPSG:4326', 'EPSG:3857')
            ));
          let iconStyle = new Style ({
            image: new Icon({
              src: require('@/assets/img/numbers/usm/green/5.png')
            })
          })
          featureProperties.setStyle(iconStyle)
          markerSource.addFeature(featureProperties)
        })
      }
      let markerLayer = new VectorLayer({
        source: markerSource
      });

      let center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      //create a layer with the OSM sourse
      let layer = new TileLayer({
        source: new OSM() // OpenStreetMap
      })

      //create view with center postion

      let view = new View({
        center: center,
        rotation: Math.PI / 2.75,
        zoom: 16,
        constrainResolution: true
      })
      let interaction = new DragRotateAndZoom();
      let control = new FullScreen();
      let overlay = new Overlay({
        position: center,
        //element: document.getElementById('overlay')
        element: this.$refs['overlay']
      })



      let map = new Map({
        target: this.$refs['map'],
        layers: [layer,  markerLayer],
        interaction: [interaction],
        control: [control],
        view: view,
      })

        map.on('click', function(event) {
          // extract the spatial coordinate of the click event in map projection units
          let coord = event.coordinate;
          // transform it to decimal degrees
          let degrees = transform(coord, 'EPSG:3857', 'EPSG:4326');
          // format a human readable version
          let hdms = toStringHDMS(degrees);
          // update the overlay element's content
          let element = overlay.getElement();
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
