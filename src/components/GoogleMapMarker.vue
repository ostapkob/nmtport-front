<template>
<div>
  {{text}}
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
      ii: 'assets/img/numbers/',
      text: 1,
    };
  },
  methods: {
      newMarker() {
      this.markerMech = new this.google.maps.Marker({
      position:  {'lat':this.marker.latitude, 'lng':this.marker.longitude},
      marker: this.marker,
      map: this.map,
      animation: 0, //this.google.maps.Animation.BOUNCE, //this.marker.alarm,
      //icon: require(this.ff()),
      //icon: require(getIcon(this.marker.state, this.marker.type, this.marker.num)),
      icon:   require(`@/${this.ii}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
      title: this.marker.name //this.marker.title,
    })
      this.markerMech.addListener("click", this.addT)
    },
	pollData () {
		this.polling = setInterval(() => {
			this.changePosition(),
      this.changeIcon(),
      this.alarm(this.marker.alarm)
		}, 15000)
	},
    changePosition() {
        //console.log(this.marker.name)
        //this.markerMech.setMap(null)
        var latlng = new this.google.maps.LatLng(this.marker.latitude, this.marker.longitude)
        this.markerMech.setPosition(latlng)
    },
    changeIcon() {
        //console.log(this.marker.name)
        this.markerMech.setIcon(require(`@/${this.ii}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`))
    },
    getIcon(state, type, num) {
      if (state=='work'){
        return `${type}/blue/${num}.png`
      }
      else if (state=='stay'){
        return `${type}/yellow/${num}.png`
      }
      else if (state=='no_power'){
        return `${type}/red/${num}.png`
      }
      else {
        return `${type}/gray/${num}.png`
      }

    },
    alarm(i) {
      if (i) {
        this.markerMech.setAnimation(1);
        setTimeout(this.toggleBounce, 5000)
      }
    },
    toggleBounce () {
        this.markerMech.setAnimation(null);
        },
    addT() {
      this.text ++
    },

  },
  mounted() {
      this.newMarker()
  },
    computed: {

    },

   created () {
       this.pollData()
   },

  render() {}
};
</script>

