<template>
  <div>
    <olMap class="mb-2">
    <!-- <olOverInfo class="ol-map"/> -->
    <template v-slot="{ map }">
      <Markers
        v-for="marker in LAST_DATA"
        :key="marker.id"
        :map="map"
        :marker="marker">
      </Markers>
      <Polygons
        :map="map"
      >
      </Polygons>
    </template>
    </olMap>
    <!-- <span v-for='(m, k) in SELECTED_FEATURES' :key=k> {{m}} </span> -->
    <div v-for="mech in KRANS_DATA"
      :key='mech.id'
      >
      <div
        v-if='SELECTED_FEATURES.includes(mech.id)'
        class='p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm'>
        <kranProgress :mech='mech' />
        <Hours :shift='shift' />
      </div>
    </div>
    <div v-for="mech in USM_DATA"
      :key='mech.id'
      >
      <div
        v-if='SELECTED_FEATURES.includes(mech.id)'
        class='p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm'>
        <usmProgress :mech='mech' />
        <Hours :shift='shift' />
      </div>
    </div>
  </div>
</template>

<script>
//import olMap from "@/components/Ol-map";
//import olOverInfo from "@/components/Ol-OverInfo";
//import testMarkers from "@/components/testLastData";
import olMap from "@/components/Ol-Map";
import Markers from "@/components/Ol-Markers";
import Polygons from "@/components/Ol-Polygons";
import {mapActions, mapGetters} from 'vuex'
import kranProgress from '@/components/ProgressKran.vue'
import usmProgress from '@/components/ProgressUsm.vue'
import Hours from '@/components/Hours.vue'
import {shiftNow, dateNow, hoursProgress} from '@/functions/functions';

export default {
  name: "App",
  data() {
    return {
      polling: null,
      shift: 1,
      date: '-',
      hours: '',
    };
  },
  components: {
    Markers,
    Polygons,
    olMap,
    kranProgress,
    usmProgress,
    Hours
  },
  methods: {
    ...mapActions([
      'GET_LAST_DATA',
      'SET_KRANS_API',
      'SET_USM_API'
    ]),
	pollData () {
		this.polling = setInterval(() => {
			this.$store.dispatch('GET_LAST_DATA')
      this.shift = shiftNow()
      this.date = dateNow()
      this.SET_KRANS_API([this.date, this.shift])
      this.SET_USM_API([this.date, this.shift])
		}, 10000)
    },
  },
  computed: {
    ...mapGetters([
      'SELECTED_FEATURES',
      'LAST_DATA',
      'KRANS_DATA',
      'USM_DATA'
      ]),
  },
  mounted() {
    this.GET_LAST_DATA()
    this.shift = shiftNow()
    this.date = dateNow()
    this.hours = hoursProgress(shiftNow())
    this.SET_KRANS_API([this.date, this.shift])
    this.SET_USM_API([this.date, this.shift])
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
