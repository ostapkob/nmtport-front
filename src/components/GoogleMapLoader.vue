<template>
  <div>
    <div
      class="google-map"
      ref="googleMap"
    />
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot
        :google="google"
        :map="map"
      />
    </template>
    <!-- <b-button @click=initializeMap>initializeMap</b-button> -->

  <div>
    <b-form-checkbox 
      v-model="toggleStyle" 
      size="lg" 
      name="check-button" 
      switch
    >
    {{dayNight}}
    </b-form-checkbox>
  </div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";
import {night} from "@/constants/mapNight.js";
import {day} from "@/constants/mapDay.js";

export default {
  props: {
    mapConfig: Object,
    apiKey: String
  },

  data() {
    return {
      google: null,
      map: null,
      toggleStyle: true,
      dayNight: 'День'
    }
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    },

  },
  watch: {
    toggleStyle: function () {
      if (this.toggleStyle) {
       this.map.setOptions({styles: day})
       this.dayNight = "День"
      }
      else {
       this.map.setOptions({styles: night})
       this.dayNight = "Hoчь"
      }
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 160%;
}
</style>

