<template>
  <div class="map">
    <gmap-map
      :center="center"
      :zoom="14"
      style="width:100%;  height: 400px;"
      :map-type-id="mapTypeId"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
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
      geojson: null,
      center: { lat:  42.8153, lng: 132.8905 },
      mapTypeId: "terrain",
      markers: [],
      places: [],
      currentPlace: null,
      ttt: 0.1,
    };
  },

  mounted() {
    console.log(test);
    console.log(poligons);
  },
  methods: {
  }
};
</script>
