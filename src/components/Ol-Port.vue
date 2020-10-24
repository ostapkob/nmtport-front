<template>
  <div>
    <olLoader>
    <!-- <olOverInfo class="ol-map"/> -->
    <template v-slot="{ map, markerSource }">
      <Markers
        v-for="marker in LAST_DATA"
        :key="marker.id"
        :map="map"
        :markerSource = 'markerSource'
        :marker="marker">
      </Markers>
    </template>
    </olLoader>
  </div>
</template>

<script>
//import olMap from "@/components/Ol-map";
//import olOverInfo from "@/components/Ol-OverInfo";
//import testMarkers from "@/components/testLastData";
import olLoader from "@/components/Ol-Loader";
import Markers from "@/components/Ol-Markers";
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "App",
  data() {
    return {
     markers: [
        { position: { lat: 42.8142, lng: 132.8897 }, name: 'Screen5', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon12.png', alarm: 0 },
        { position: { lat: 42.8150, lng: 132.8907 }, name: 'Screen6', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon13.png', alarm: 0 },
        { position: { lat: 42.8160, lng: 132.8908 }, name: 'Screen7', icon: 'http://maps.google.com/mapfiles/kml/pal3/icon14.png', alarm: 1 }
      ],
      polling: null,
    };
  },
  components: {
    Markers,
    olLoader,
  },
  methods: {
    ...mapActions([
        'GET_LAST_DATA'
    ]),
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
  },
  mounted() {
    this.GET_LAST_DATA()
  },
  created () {
    this.pollData()
  },
   beforeDestroy () {
       clearInterval(this.polling)
   },
}
</script>

<style lang="scss" scoped>
</style>

