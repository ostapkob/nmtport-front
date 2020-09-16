<template>
  <GoogleMapLoader
    :mapConfig=mapConfig
    apiKey="AIzaSyDEEA8HUpeyr66BT6arigNEcKgqckkSDUg"
  >
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path.sync="line.path"
        :google="google"
        :map="map"
      />
    <div>
        <b-button @click="dayNight()" class=mt-2 > Day / Night </b-button>
    </div>
    </template>
  </GoogleMapLoader>
</template>
<script>

import GoogleMapLoader   from "./GoogleMapLoader";
import GoogleMapMarker   from "./GoogleMapMarker";
import GoogleMapLine     from "./GoogleMapLine";
import { mapSettings }   from "@/constants/mapSettings";
import { markers, lines } from '@/components/MapPaths.js'
import { themeMap } from '@/functions/functions';

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine
  },

  data() {
    return {
      lines: [],
      markers: [],
      shift: 1
    };
  },

  methods: {
    clearMarkers:  function() {
        for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        }
        this.markers = [];
    },


    dayNight: function() {
       this.shift = 2
        console.log(this.shift)
    },

  },
  computed: {
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
    this.markers = markers 
    this.lines = lines 
    
  },
    watch: {
        

    }
};
</script>

