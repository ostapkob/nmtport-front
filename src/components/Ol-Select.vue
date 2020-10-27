<template>
<div>
    <div ref="map" class='map'> </div>
    <b-button @click="selectedF"> click </b-button >
</div>
</template>
<script>
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
//import OSM from 'ol/source/OSM';
import Select from 'ol/interaction/Select';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {transform} from 'ol/proj';
import {Icon, Style} from 'ol/style';
//import { singleClick} from 'ol/events/condition';
import { doubleClick} from 'ol/events/condition';
//import { pointerMove} from 'ol/events/condition';
import { click} from 'ol/events/condition';
//import { focus} from 'ol/events/condition';
import XYZ from 'ol/source/XYZ';

export default {
   data() {
     return {
 //      map: {}
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

      var vectorSource = new VectorSource({
        format: new GeoJSON(),
      });

    var iconFeature = new Feature({
      geometry: new Point(transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      ),
      name: '3'}
    )
    var iconFeature2 = new Feature({
      geometry:new Point(transform([135.8896, 45.8128], 'EPSG:4326', 'EPSG:3857')
          //scale: 0.8
      ),
      name: '4'}
    )
    var iconStyle = new Style({
      image: new Icon({
        src: require(`@/assets/img/numbers/kran/blue/3.png`),
          scale: 0.8
      }),
    });

    var iconStyle2 = new Style({
      image: new Icon({
        src: require(`@/assets/img/numbers/kran/blue/4.png`),
          scale: 0.8
        //src: 'http://maps.google.com/mapfiles/kml/pal3/icon12.png',
      }),
    });
    iconFeature.setStyle(iconStyle);
    iconFeature2.setStyle(iconStyle2);
    vectorSource.addFeature(iconFeature)
    vectorSource.addFeature(iconFeature2)

    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });
      var map = new Map({
        target: this.$refs['map'],
        view: new View({
        center: transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5,
        }),
      });

    var select2 = new Select({
      //condition: click
      condition:  doubleClick//singleClick
    })
    this.select = new Select({
      //condition: click
      condition:  click//singleClick
    })
    this.select.on('select', function() {
      console.log('focus obhs')
    })
    console.log(iconFeature)
    select2.on('select', function() {
    })
    map.addInteraction(this.select)
    map.addInteraction(select2)

    map.addLayer(raster)
    map.addLayer(vectorLayer)
  },
    selectedF() {
      let  selectedFeatures = this.select.getFeatures()
      let names = selectedFeatures.getArray().map(function(feature) {return feature.get('name')})
      console.log(names)
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
