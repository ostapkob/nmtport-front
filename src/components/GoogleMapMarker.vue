<template>
<div>
  <!-- {{text}} -->
  <span v-show=show> True </span>
    <b-button @click="animation()" class=mb-2>{{this.marker.name}}</b-button>
    <span v-if=this.marker.alarm> alarm </span>
</div>
</template>


<script>
//import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";

export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    marker: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        markerMech: null,
      path: 'assets/img/numbers/',
      text: 1,
      polling: null,
      flagAnimation: false,
      timerAnimation: 0,
      show: false,
    };
  },
  methods: {
      newMarker() {
      this.markerMech = new this.google.maps.Marker({
      position:  {'lat':this.marker.latitude, 'lng':this.marker.longitude},
      marker: this.marker,
      map: this.map,
      animation: 0,
      icon:   require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
      title: this.marker.name
    })
      this.markerMech.addListener("click", this.addT)
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
        var latlng = new this.google.maps.LatLng(this.marker.latitude, this.marker.longitude)
        this.markerMech.setPosition(latlng)
    },
    changeIcon() {
        this.markerMech.setIcon(require(`@/${this.path}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`))
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
    alarm(i) {
      if (i) {
        if (Date.now() - this.timerAnimation < 30000) {
            this.markerMech.setAnimation(1);
            this.show = true
          }
        else {
            this.markerMech.setAnimation(null);
            this.show = false
          }
      }
      else {
        this.markerMech.setAnimation(null);
        this.timerAnimation = Date.now()
      }
    },
    addT() {
      this.text ++
    },
    animation() {
      this.alarm(true)
    },
  },
  mounted() {
      this.newMarker()
      this.timerAnimation = Date.now()
  },
    computed: {

    },

   created () {
       this.pollData()
   },

  render() {}
};
</script>

