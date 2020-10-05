<template>
  <GoogleMapLoader
    :mapConfig=mapConfig
    apiKey="AIzaSyDEEA8HUpeyr66BT6arigNEcKgqckkSDUg"
  >

    <template v-slot="{ google, map }">
      <GoogleMapMarker
        v-for="marker in LAST_DATA"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
        :animation='marker.alarm'
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path.sync="line.path"
        :google="google"
        :map="map"
      />

    <div>
        <!-- <b-button @click="dayNight()" class=mt-2 > Day / Night </b-button> -->
        <!-- <p v-for="mech in LAST_DATA" :key=mech.id> {{mech}} --- </p> -->
    </div>
    </template>
  </GoogleMapLoader>
</template>
<script>

import GoogleMapLoader   from "./GoogleMapLoader";
import GoogleMapMarker   from "./GoogleMapMarker";
import GoogleMapLine     from "./GoogleMapLine";
import { mapSettings }   from "@/constants/mapSettings";
import { lines } from '@/constants/MapPaths.js'
import { themeMap } from '@/functions/functions';
import {mapActions, mapGetters} from 'vuex'

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine
  },

  data() {
    return {
      lines: [],
      //markers: [],
      shift: 1,
      polling: null,
      text: 'text'
    };
  },

  methods: {
    ...mapActions([
        'GET_LAST_DATA'
    ]),
    dayNight: function() {
       this.shift = 2
    },
	pollData () {
		this.polling = setInterval(() => {
			this.$store.dispatch('GET_LAST_DATA')
		}, 10000)
    },
  },
  computed: {
    ...mapGetters([
        'LAST_DATA'
        ]),
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
        styles: themeMap(this.shift)
      };
    },
    mapCenter() {
        return {lat: 42.8150, lng: 132.8907}
    },
  },
  mounted() {
    this.lines = lines
    //this.markers = markers
    this.GET_LAST_DATA()
  },
   beforeDestroy () {
       clearInterval(this.polling)
   },
   created () {
       this.pollData()
   },
};
</script>

