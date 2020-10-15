<template>
<div>
</div>
</template>
<script>
import "ol/ol.css";
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import VectorSource from 'ol/source/Vector';

export default {
  props: {
    marker: {
      default() {
        return []
      }
    },
    map: {
      required: true,
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
//    this.newMarker()
    console.log('-----------------')
    console.log(this.marker.name)
  },
  methods: {
    newMarker() {
      //create Maprkers
      console.log(this.marker.name)
      let markerSource = new VectorSource()
      let featureProperties = new Feature(new Point(
          //transform([marker.longitude, marker.latitude],
          transform([this.marker.position.lng, this.marker.position.lat],
          'EPSG:4326', 'EPSG:3857')
        ));
      let iconStyle = new Style ({
        image: new Icon({
          src: require('@/assets/img/numbers/usm/green/5.png')
        })
      })
      featureProperties.setStyle(iconStyle)
      markerSource.addFeature(featureProperties)
      let markerLayer = new VectorLayer({
        source: markerSource
      });

      this.map.addLayer(markerLayer) // not need if you are already adding overlay
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
