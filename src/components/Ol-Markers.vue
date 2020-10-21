<template>
  <div>
    <b-button @click="animation()" class='mt-1'>
      {{marker.name}}
    </b-button>
  </div>
</template>
<script>
import "ol/ol.css";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
//import Geolocation from 'ol/Geolocation'
import {Icon, Style, Circle, Stroke,  Fill} from 'ol/style';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';

//import VectorSource from 'ol/source/Vector';
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
    markerSource: {
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
      markerFeature: null
     }
   },
  mounted() {
    this.newMarker()
  },
  methods: {
    newMarker() {

      //let geolocation = new Geolocation({
              //tracking: true
            //});

      // create Maprker
          this.markerFeature = new Feature(new Point(
          transform([this.marker.longitude, this.marker.latitude],
          //transform([this.marker.position.lng, this.marker.position.lat],
          'EPSG:4326', 'EPSG:3857')
        ));

      // create Style
      let iconStyle = new Style ({
        image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
        })
      })

      // Set Style
      this.markerFeature.setStyle(iconStyle)

      // add  marker to Source
      this.markerSource.addFeature(this.markerFeature)

      // create Layer
      let markerLayer = new VectorLayer({
        source: this.markerSource
      });
      //markerFeature.bindTo('position', geolocation)
      this.map.addLayer(markerLayer)

    },
    pollData () {
      this.polling = setInterval(() => {
        this.changePosition(),
        this.changeIcon()
        //this.alarm(this.marker.alarm)
        //console.log('pull')
        //console.log (Date.now() - this.timerAnimation)
      }, 10000)
    },
    changePosition() {
      let coord = this.markerFeature.getGeometry().getCoordinates()
      coord = transform([this.marker.longitude, this.marker.latitude],
          //transform([this.marker.position.lng, this.marker.position.lat],
          'EPSG:4326', 'EPSG:3857')
      this.markerFeature.getGeometry().setCoordinates(coord)
    },
    animation(){
     let fill = new Fill({
       color: 'rgba(200,20,25,0.5)'
     });
     let stroke = new Stroke({
       color: 'rgba(250,250,250,1)',
       width: 2
     });
      let iconStyle = [
       new Style({
         image: new Circle({
         fill: fill,
         stroke: stroke,
         radius: 25
           }),
         fill: fill,
         stroke: stroke
       }),
       new Style ({
          image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
          //scale: 0.8
        })
        }),
      ]
      this.markerFeature.setStyle(iconStyle)

    },
    changeIcon() {
      let iconStyle = [
        new Style({
          image: new Circle({
          radius: 17,
          fill: new Fill({
          color: 'rgba(230,20,30,0)'
              })
            })
          }),
        new Style ({
          image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
          //scale: 0.8
        })
        }),
      ]
      this.markerFeature.setStyle(iconStyle)

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
</style>
