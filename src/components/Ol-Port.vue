<template>
  <div>
    <olMap >
      <!-- <olOverInfo class="ol-map"/> -->
      <template v-slot="{ map }">
        <Markers
          v-for="marker in LAST_DATA"
          :key="marker.id"
          :map="map"
          :isFocus="isFocus"
          :marker="marker"
        >
        </Markers>
        <Polygons :map="map"> </Polygons>
        <!-- <Points :map="map"> </Points> -->
        <SlideBar />
      </template>
    </olMap>
    <!-- <span v-for='(m, k) in SELECTED_FEATURES' :key=k> {{m}} </span> -->
    <div v-for="mech in KRAN_DATA" :key="mech.id">
      <div
        v-if="SELECTED_FEATURES.includes(mech.id)"
        class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm"
      >
        <kranProgress :mech="mech" />
        <Hours :shift="shift" />
      </div>
    </div>
    <div v-for="mech in USM_DATA" :key="mech.id">
      <div
        v-if="SELECTED_FEATURES.includes(mech.id)"
        class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm"
      >
        <usmProgress :mech="mech" />
        <Hours :shift="shift" />
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
//import Points from "@/components/Ol-Points";
import { mapActions, mapGetters } from "vuex";
import kranProgress from "@/components/ProgressKran.vue";
import usmProgress from "@/components/ProgressUsm.vue";
import Hours from "@/components/Hours.vue";
import {
  shiftNow,
  dateNow,
  hoursProgress,
  isVisible,
} from "@/functions/functions";
import SlideBar from "@/components/SlideBar";

export default {
  name: "App",
  data() {
    return {
      polling: null,
      shift: 1,
      date: "-",
      hours: "",
      isFocus: null, // animate only focus
    };
  },
  components: {
    Markers,
    Polygons,
    //Points,
    olMap,
    kranProgress,
    usmProgress,
    Hours,
    SlideBar,
  },
  methods: {
    ...mapActions([
      "GET_LAST_DATA",
      "SET_KRAN_API",
      "SET_USM_API",
      "SET_FILTER_LAST_DATA",
    ]),
    pollData() {
      this.polling = setInterval(() => {
        //this.$store.dispatch('GET_LAST_DATA')
        //this.GET_LAST_DATA();
        this.shift = shiftNow();
        this.date = dateNow();
        this.SET_KRAN_API([this.date, this.shift]);
        this.SET_USM_API([this.date, this.shift]);
        this.isFocus = isVisible();
      }, 30000); // timer
    },
    //    focusTrue() {
    //      console.log(Date(), 'Focus')
    //      this.GET_LAST_DATA()
    //    },
  },
  computed: {
    ...mapGetters([
      "SELECTED_FEATURES",
      "LAST_DATA",
      "KRAN_DATA",
      "USM_DATA",
      "FILTER_LAST_DATA",
    ]),
  },
  mounted() {
    if (!this.FILTER_LAST_DATA) {
      this.SET_FILTER_LAST_DATA(["usm", "kran"]);
    }
    //this.GET_LAST_DATA();
    this.shift = shiftNow();
    this.date = dateNow();
    this.hours = hoursProgress(shiftNow());
    this.SET_KRAN_API([this.date, this.shift]);
    this.SET_USM_API([this.date, this.shift]);
    this.isFocus = isVisible();
    this.GET_LAST_DATA();
    this.$nextTick(function () {
      window.addEventListener("focus", this.GET_LAST_DATA);
      //window.addEventListener('blur', this.focusFalse);
    });
  },
  created() {
    this.pollData();
  },
  beforeDestroy() {
    clearInterval(this.polling);
    window.removeEventListener("focus", this.GET_LAST_DATA);
    //window.removeEventListener('blur', this.focusFalse);
  },
};
</script>

