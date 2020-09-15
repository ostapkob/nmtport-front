<template>
  <div class="map">
    <gmap-map
      :center="center"
      :zoom="14"
      style="width:100%;  height: 400px;"
      :map-type-id="mapTypeId"
      :map-type-control="mapTypeControl"
    >
      <gmap-marker
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :animation="0"
        @click="center=m.position"

      />
      <gmap-polygon 
        :paths="poligons" 
     />
    </gmap-map>
    <p v-for="(m, key) in  poligons" :key=key> {{m}} </p>
  </div>
</template>

<script>
import {test, poligons } from '@/components/map_paths.js'
export default {
  name: "GoogleMap",
  data() {
    return {
      poligons: poligons,
      markers: [
        { position: { lat: 42.8150, lng: 132.8907 }, title: 'Screen5', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon12.png', },
        { position: { lat: 42.8145, lng: 132.8900 }, title: 'Screen6', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon13.png' }
      ],
      geojson: null,
      center: { lat:  42.8153, lng: 132.8905 },
      mapTypeId: "roadmap",
      places: [],
      currentPlace: null,
      mapTypeControl: false,
      ttt: 0.1,
    };
  },

  mounted() {
    console.log(test);
  },
  methods: {
  }
};
</script>
