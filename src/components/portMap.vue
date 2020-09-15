<template>
  <GoogleMapLoader
    :mapConfig="mapConfig"
    apiKey="AIzaSyDEEA8HUpeyr66BT6arigNEcKgqckkSDUg"
  >
  // insert your google maps api key to render styled map
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
        title="www"
      />
      <GoogleMapLine
        v-for="line in lines"
        :key="line.id"
        :path.sync="line.path"
        :google="google"
        :map="map"
      />
    <div>
        <button @click="clearMarkers()">adfasdf</button>
    </div>
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
import { mapSettings } from "@/constants/mapSettings";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";
import {markers, lines } from '@/components/map_paths.js'

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
      aa: 1
    };
  },

  methods: {
    plus: function () {
      this.aa++
       console.log(this.aa)
    },

 clearMarkers:  function() {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }

 this.markers = [];
}









  },
    
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter
      };
    },
    mapCenter() {
        return {lat: 42.8150, lng: 132.8907}
    }
  },
  mounted() {
    this.markers = markers 
    this.lines = lines 
  }
};
</script>

