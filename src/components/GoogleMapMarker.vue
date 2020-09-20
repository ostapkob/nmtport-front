<template>
<div>
    <b-button @click="changePosition()" class=mb-2>{{this.marker.name}}</b-button>
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
        markerMech: null
    };
  },
  methods: {
      newMarker() {
      this.markerMech = new this.google.maps.Marker({
      position:  {'lat':this.marker.latitude, 'lng':this.marker.longitude},
      marker: this.marker,
      map: this.map,
      animation: this.marker.alarm,
      icon: this.marker.icon,
      title: this.marker.name //this.marker.title,
    })
    },
	pollData () {
		this.polling = setInterval(() => {
			this.changePosition()
		}, 5000)
	},
    changePosition() {
        console.log(this.marker.name)
        //this.markerMech.setMap(null)
        var latlng = new this.google.maps.LatLng(this.marker.latitude, this.marker.longitude)
        this.markerMech.setPosition(latlng)
    }


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

