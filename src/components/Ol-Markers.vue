<template>
  <div>
    <b-button @click="clickEmit" class='mt-1'>
      {{marker.name}}
    </b-button>
    <b-button @click="clickMarker(marker.id)" class='mt-1 ml-1' variant="info">
      {{marker.name}}
    </b-button>
  </div>
</template>
<script>
import "ol/ol.css";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style, Circle, Stroke,  Fill} from 'ol/style';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';

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
    clickMarker: Function
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
      this.markerFeature = new Feature({
          geometry:  new Point(transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857'),
        ),
          name: this.marker.name,
          id: this.marker.id,
          alarm: this.marker.alarm,
          state: this.marker.state,
          time: this.marker.time

      });

      // create Style
      let iconStyle = new Style ({
        image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
        }),
      })

      // Set Style
      this.markerFeature.setStyle(iconStyle)

      // add  marker to Source
      this.markerSource.addFeature(this.markerFeature)
      this.markerLayer = new VectorLayer() 

      // create Layer
      this.markerLayer.setSource(this.markerSource)
      //markerFeature.bindTo('position', geolocation)
      this.map.addLayer(this.markerLayer)

    },
    markerClick() {
      console.log(this.marker)
      console.log(this.markerFeature)
      console.log(this.markerFeature.get('name'))
    },
    pollData () {
      this.polling = setInterval(() => {
        this.changePosition(),
        this.changeIcon()
        this.setKeys()
      }, 2000)
    },
    setKeys() {
          this.markerFeature.set('name', this.marker.name)
          this.markerFeature.set('id', this.marker.id)
          this.markerFeature.set('alarm', this.marker.alarm)
          this.markerFeature.set('state', this.marker.state)
          this.markerFeature.set('time', this.marker.time)
    },
    changePosition() {
      let coord = this.markerFeature.getGeometry().getCoordinates()
      coord = transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857')
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
      this.clickMarker(this.marker.id)
      if (this.markerFeature.get('click')) {
        this.markerFeature.setStyle(iconStyle)
      }
    },
    clickEmit: function() {
      this.$emit('remove')
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
   created () {
       this.pollData()
   },
  components: {
  }
}
</script>

<style>
</style>
