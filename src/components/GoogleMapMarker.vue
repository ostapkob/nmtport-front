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
        markerMech: null,
      ii: 'assets/img/numbers/'
    };
  },
  methods: {
      newMarker() {
      this.markerMech = new this.google.maps.Marker({
      position:  {'lat':this.marker.latitude, 'lng':this.marker.longitude},
      marker: this.marker,
      map: this.map,
      animation: this.marker.alarm,
      //icon: require(this.ff()),
      //icon: require(getIcon(this.marker.state, this.marker.type, this.marker.num)),
      icon:   require(`@/${this.ii}${this.getIcon(this.marker.state, this.marker.type, this.marker.number)}`),
      title: this.marker.name //this.marker.title,
    })
    },
	pollData () {
		this.polling = setInterval(() => {
			this.changePosition(),
            this.changeIcon()
		}, 5000)
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

