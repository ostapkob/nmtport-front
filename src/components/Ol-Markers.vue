<template>
  <div>
    <!-- <b-button @click=nowSelectedFeatures class='mt-1'> -->
      <!-- {{marker.name}} -->
    <!-- </b-button> -->
    <!-- <b-button @click="alarm(true)" class='mt-1 ml-1' variant="info"> -->
    <!--   {{marker.name}} -->
    <!-- </b-button> -->
    <div ref="wrapper" class="wrapper">
      <div ref="circle" class="circle" > </div>
      <img ref="icon"
       class="icon"
       :src='require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`)'
       @click="clickMarker"
       />
    </div>
  </div>
</template>
<script>
import "ol/ol.css";
import Overlay from 'ol/Overlay'
import {transform} from 'ol/proj';
import {mapActions, mapGetters} from 'vuex'
import { TimelineLite, TimelineMax, Back, Elastic, Expo } from "gsap/dist/gsap"

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
      overlayIcon: null,
      overlayCircle: null,
     }
   },
  mounted() {
    this.newMarker()
		//this.SET_SELECTED_FEATURES([])
  },
  methods: {
    newMarker() {
       this.overlayIcon = new Overlay({
        element: this.$refs['wrapper'],
        position:(transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857')),
      })
      this.map.addOverlay(this.overlayIcon);
    },
    ...mapActions([
        'SET_SELECTED_FEATURES'
    ]),
    clickMarker() {
      console.log(this.marker.id)
      if (event.shiftKey) {
        let nowSelect = this.SELECTED_FEATURES
        if (!nowSelect.includes(this.marker.id)) {
          nowSelect.push(this.marker.id)
          this.SET_SELECTED_FEATURES(nowSelect)
        }
      }
      else {
        this.SET_SELECTED_FEATURES( [this.marker.id] )
      }
      this.pulse()
    },
    pollData () {
      this.polling = setInterval(() => {
        this.changePosition()
        this.alarm(this.marker.alarm)
      }, 15000)
    },
    changePosition() {
      let position=transform([this.marker.longitude, this.marker.latitude], 'EPSG:4326', 'EPSG:3857')
      this.overlayIcon.setPosition(position)
    },

  alarm(val) {
    if (val) {
      const {icon, circle} = this.$refs
      const timeline = new TimelineMax({
        repeat: 3
      })
      timeline.to (icon, 0.4, {
        scale: 1.8,
        rotation: 16,
        ease: Back.easeOut.config(1.7),
      })
      timeline.to(circle, 0.5, {
        scale: 12,
        opacity: 0.7,
        background: '#f34',
      },
        '-=0.6'
      ),
      timeline.to(icon, 1.2, {
        scale: 1,
        rotation: '-=16',
        ease: Elastic.easeOut(2.5, 0.5),
      })
      timeline.to(circle, 1.1, {
          scale: 1,
          opacity: 0,
          ease: Expo.easeOut,
        },
      '-=1.2'
      )
    }

  },
  pulse() {
    const {icon} = this.$refs
    const timeline = new TimelineLite({
    })
    timeline.to (icon, 0.2, {
      scale: 0.8,
      ease: Back.easeOut.config(1.7),
    }, )
    timeline.to(icon, 0.3, {
      scale: 1,
      ease: Elastic.easeOut(2.5, 0.5),
    })
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
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -15px;
  left: -15px;
}
.circle {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  width: 15px;
  height: 15px;
  margin: 0 auto;
  border-radius: 50%;
  opacity: 0;
}
.icon {
  z-index: 2;
  position: absolute;
  cursor: pointer;
}
</style>
