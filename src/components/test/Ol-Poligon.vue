<template>
<div>
    <div ref="map" class='map'> </div>
    <b-button @click="selectedF"> click </b-button >
</div>
</template>
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer } from 'ol/layer';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {transform} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import Polygon from 'ol/geom/Polygon'
import {Vector as VectorLayer} from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import { Stroke, Fill} from 'ol/style';
import Style from 'ol/style/Style';

export default {
   data() {
     return {
       select: null,
       selectedFeatures: []
     }
   },
  mounted() {
    this.initiateMap()
  },
  methods: {
    initiateMap() {
      var raster = new TileLayer({
        source: new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      })

      let coordinates = [
        [132.8880, 42.8128],
        [132.8941, 42.8112],
        [132.8958, 42.8128],
        [132.8912, 42.8150],
      ]
      var polyFeature = new Feature({
          geometry: new Polygon([coordinates ]),
      })

      polyFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857')
      var pointFeature = new Feature({
          geometry: new Point(
            [132.8903, 42.8134])
      })
      pointFeature.getGeometry().transform('EPSG:4326', 'EPSG:3857')

      var vectorLayer = new VectorLayer({
          source: new VectorSource({
              features: [
              polyFeature,
              pointFeature]
          }),
      });
      let center = transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      var map = new Map({
        target: this.$refs['map'],
        view: new View({
        center: center,
        zoom: 16
        }),
      });
      let style = new Style({
          stroke: new Stroke({
            color: 'rgba(100, 255, 0, 1)',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(100, 255, 0, 0.3)',
          })
      })
      polyFeature.setStyle(style)
      map.addLayer(raster)
      map.addLayer(vectorLayer)
    },
    selectedF() {
      let  selectedFeatures = this.select.getFeatures()
      let names = selectedFeatures.getArray().map(function(feature) {return feature.get('name')})
      console.log(names)
    },
  },

  components: {
  }
}
</script>

<style>
.map {
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
