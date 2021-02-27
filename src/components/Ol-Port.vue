<template>
  <div>
    <olMap >
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
        <!-- <Ships :map="map"> </Ships> -->
        <SlideBar />
      </template>
    </olMap>
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

import olMap from "@/components/Ol-Map";
import Markers from "@/components/Ol-Markers";
import Polygons from "@/components/Ol-Polygons";
//import Points from "@/components/Ol-Points";
// import Ships from "@/components/Ol-Ships";
import { mapActions, mapGetters } from "vuex";
import kranProgress from "@/components/ProgressKran.vue";
import usmProgress from "@/components/ProgressUsm.vue";
import Hours from "@/components/Hours.vue";
import {
  shiftNow,
  dateNow,
  isVisible,
} from "@/functions/functions";
import SlideBar from "@/components/SlideBar";

export default {
  name: "App",
  data() {
    return {
      shift: 1,
      date: "-",
      isFocus: null, // animate only focus
    };
  },
  components: {
    Markers,
    Polygons,
    //Points,
    // Ships,
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
    this.SET_KRAN_API([dateNow(), shiftNow()]);
    this.$store.dispatch("GET_KRAN_DATA")
    this.SET_USM_API([dateNow(), shiftNow()]);
    this.$store.dispatch("GET_USM_DATA")
    this.isFocus = isVisible();
    this.$nextTick(function () {
      window.addEventListener("focus", this.GET_LAST_DATA);
    });
  },
  created() {
  },
  beforeDestroy() {
    window.removeEventListener("focus", this.GET_LAST_DATA);
  },
};
</script>

