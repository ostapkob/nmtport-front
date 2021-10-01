<template>
  <div>
    <olMap propsterminal=terminal>
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
      </template>
    </olMap>
  </div>
</template>
<script>

import olMap from "@/components/Ol-Map";
import Markers from "@/components/Ol-Markers";
import Polygons from "@/components/Ol-Polygons";
//import Points from "@/components/Ol-Points";
// import Ships from "@/components/Ol-Ships";
import { mapActions, mapGetters } from "vuex";
import {
  shiftNow,
  dateNow,
  isVisible,
} from "@/functions/functions";

export default {
  name: "App",
  data() {
    return {
      shift: 1,
      date: "-",
      isFocus: null, // animate only focus
    };
  },
  props: {
    terminal: {
      default() {
        return 1;
      },
    }
  },
  components: {
    Markers,
    Polygons,
    //Points,
    // Ships,
    olMap,

  },
  methods: {
    ...mapActions([
      "GET_LAST_DATA",
      "SET_KRAN_API",
      "SET_USM_API",
      "SET_SENNEBOGEN_API",
      "SET_FILTER_LAST_DATA",
    ]),
  },
  computed: {
    ...mapGetters([
      "LAST_DATA",
      "FILTER_LAST_DATA",
    ]),
  },
  mounted() {
    if (!this.FILTER_LAST_DATA) {
      this.SET_FILTER_LAST_DATA(["usm", "kran"]);
    }
    this.shift = shiftNow();
    this.SET_KRAN_API([dateNow(), shiftNow()]);
    this.$store.dispatch("GET_KRAN_DATA")
    this.SET_USM_API([dateNow(), shiftNow()]);
    this.$store.dispatch("GET_USM_DATA")
    this.SET_SENNEBOGEN_API([dateNow(), shiftNow()]);
    this.$store.dispatch("GET_SENNEBOGEN_DATA")
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

