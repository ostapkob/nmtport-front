<template>
  <div>
    <!-- <b-button @click=nowSelectedFeatures class='mt-1'> -->
      <!-- {{marker.name}} -->
    <!-- </b-button> -->
    <b-button @click="animation" class='mt-1 ml-1' variant="info">
      {{marker.name}}
    </b-button>
    <div ref="marker" class="hexagon" > {{marker.number}} </div>
    <img ref="icon" src="@/assets/img/ship.png"
    class="icon" />

  </div>
</template>
<script>
import "ol/ol.css";
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay'
import {Icon, Style, Circle, Stroke,  Fill} from 'ol/style';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj';
import Select from 'ol/interaction/Select';
import { click} from 'ol/events/condition';
import gsap from 'gsap'
//import { pointerMove} from 'ol/events/condition';
import {mapActions, mapGetters} from 'vuex'
//import {timeline} from 'gsap'

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
      markerFeature: null,
      markerSelect: null,
     }
   },
  mounted() {
    this.newMarker(),
		//this.SET_SELECTED_FEATURES([1,2,3])
    this.newMarkerSelect(this.nowSelectedFeatures),
    this.changeIcon()
  },
  methods: {
    newMarker() {
      this.markerFeature = new Feature({
          geometry:  new Point(transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857'), ),
          name: this.marker.name,
          id: this.marker.id,
          alarm: this.marker.alarm,
          state: this.marker.state,
          time: this.marker.time
      });
      // create Select
      // add  marker to Source
      this.markerSource.addFeature(this.markerFeature)
      // create Layer
      var overlay = new Overlay({
        element: this.$refs['marker'],
        position:(transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857')),
      })
      var overlayIcon = new Overlay({
        element: this.$refs['icon'],
        position:(transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857')),
      })
      this.markerLayer = new VectorLayer({
        renderBuffer: 200,
         //anchor: [150, 5],
         //anchorXUnits: 'fraction',
         //anchorYUnits: 'pixels',
      })
      this.markerLayer.setSource(this.markerSource)
      this.map.addOverlay(overlayIcon);
      this.map.addOverlay(overlay);
      //add layer and select
      this.map.addLayer(this.markerLayer)
    },
    newMarkerSelect(fun) {
      this.markerSelect = new Select({
        condition:  click
        //condition:  pointerMove
      })
      this.markerSelect.on('select', function() {
        fun()
      })
      this.map.addInteraction(this.markerSelect)
    },
    ...mapActions([
        'SET_SELECTED_FEATURES'
    ]),
    nowSelectedFeatures() {
      this.SET_SELECTED_FEATURES(
        this.markerSelect.getFeatures().getArray().map(
        function(feature){
          return feature.get('id')
        })
      )},
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
       color: 'rgba(200,20,25,0.5)',
     });
      let stroke = new Stroke({
       color: 'rgba(250,250,250,1)',
       width: 2,
     });
      let newIconStyle = [
       new Style({
         image: new Circle({
         fill: fill,
         stroke: stroke,
         radius: 250
           }),
         fill: fill,
         stroke: stroke
       }),
        new Style ({ // i don't now how get normal existing Style
          image: new Icon({
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
          scale: 0.8
          })
        }),
      ]
      this.markerFeature.setStyle(newIconStyle)
      this.animatLayer()
    },
    changeIcon() {
      let iconStyle = [
        new Style ({
          image: new Icon({
          //anchorXUnits: 'fraction',
          //anchorYUnits: 'pixels',
          src: require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
          scale: 0.8
          })
        }),
      ]
      this.markerFeature.setStyle(iconStyle)
    },
  animatLayer() {
    gsap.fromTo(this.$refs.marker,
    {
      backgroundColor: '#0f0',
      autoAlpha: 1
    },
    {
      autoAlpha: 0,
      duration: 1,
      backgroundColor: '#ff0',
     });
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
  computed: {
    ...mapGetters([
        'SELECTED_FEATURES'
        ]),
  },
}
</script>

<style lang="scss" scoped>
.circle {
  background: #c66;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  position: absolute;
  left: -10px;
  bottom: -10px;
}
.icon {
  background: #999;
  width: 40px;
  height: 20px;
}
</style>
