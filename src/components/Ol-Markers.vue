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
//import { getIcon } from '@/functions/functions';

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
      path: 'assets/img/numbers/',
      polling: null,
     }
   },
  mounted() {
    this.newMarker()
  },
  methods: {
    newMarker() {
      //create Maprkers
      let markerSource = new VectorSource()
      let featureProperties = new Feature(new Point(
          transform([this.marker.longitude, this.marker.latitude],
          //transform([this.marker.position.lng, this.marker.position.lat],
          'EPSG:4326', 'EPSG:3857')
        ));
      let iconStyle = new Style ({
        image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
        })
      })
      featureProperties.setStyle(iconStyle)
      markerSource.addFeature(featureProperties)
      let markerLayer = new VectorLayer({
        source: markerSource
      });

      this.map.addLayer(markerLayer)
    },
    pollData () {
      this.polling = setInterval(() => {
        this.changePosition(),
        this.changeIcon(),
        this.alarm(this.marker.alarm)
        //console.log('pull')
        console.log (Date.now() - this.timerAnimation)
      }, 10000)
    },
    changePosition() {
    },
    changeIcon() {
    },

  getIcon(state, type, num) {
    if (type=='kran') {   // 123
      if (state=='180'){
        return `${type}/blue/${num}.png`
      }
      else if (state=='90_1' || state=='90_2'){
        return `${type}/black/${num}.png`
      }
      else if (state=='stay'){
        return `${type}/yellow/${num}.png`
      }
      else if (state=='no_power'){
        return `${type}/red/${num}.png`
      }
      else if (state=='long_no_power'){
        return `${type}/gray/${num}.png`
      }
      else {
        return `${type}/green/${num}.png`
      }
    }
    if (type=='usm') {
      if (state=='work'){
        return `${type}/blue/${num}.png`
      }
      else if (state=='stay'){
        return `${type}/yellow/${num}.png`
      }
      else if (state=='no_power'){
        return `${type}/red/${num}.png`
      }
      else if (state=='long_no_power'){
        return `${type}/gray/${num}.png`
      }
      else {
        return `${type}/green/${num}.png`
      }
    }
  },

  },
   created () {
       this.pollData()
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
