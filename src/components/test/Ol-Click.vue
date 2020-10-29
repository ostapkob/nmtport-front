<template>
<div>
  <div>
    <div ref="map" class='map'> </div>
    <div id="popup"></div>
  </div>
</div>
</template>
<script>
import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Point from 'ol/geom/Point';
import TileJSON from 'ol/source/TileJSON';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';

export default {
   data() {
     return {
       map: {}
     }
   },
  mounted() {
    this.initiateMap()
  },
  methods: {
  initiateMap() {
    var iconFeature = new Feature(
      new Point(transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857')
      )
    )
    var iconFeature2 = new Feature(
      new Point(transform([135.8896, 45.8128], 'EPSG:4326', 'EPSG:3857')
      )
    )
    var iconStyle = new Style({
      image: new Icon({
        src: require(`@/assets/img/numbers/kran/blue/3.png`),
      }),
    });

    var iconStyle2 = new Style({
      image: new Icon({
        src: require(`@/assets/img/numbers/kran/blue/4.png`),
        //src: 'http://maps.google.com/mapfiles/kml/pal3/icon12.png',
      }),
    });

    iconFeature.setStyle(iconStyle);
    iconFeature2.setStyle(iconStyle2);

    var vectorSource = new VectorSource({
    });
    vectorSource.addFeature(iconFeature)
    vectorSource.addFeature(iconFeature2)

    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    var rasterLayer = new TileLayer({
      source: new TileJSON({
        url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
        crossOrigin: '',
      }),
    });
    let map = new Map({
      layers: [rasterLayer],
      target: this.$refs['map'],
      view: new View({
        center: transform([132.8896, 42.8128], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5,
      }),
    });

    map.addLayer(vectorLayer)

    map.on('click', function (evt) {
      var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        //console.log(this.map)
        console.log(map)
        return feature;
      });
      if (feature) {
        console.log('Marker')
      } else {
        console.log('map')
      }
    });

    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
      if (e.dragging) {
        console.log('map--')
        return;
      }
      var pixel = map.getEventPixel(e.originalEvent);
      var hit = map.hasFeatureAtPixel(pixel);
      map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
    this.map = map
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
