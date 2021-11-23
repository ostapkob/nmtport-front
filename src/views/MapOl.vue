<template>
  <div>
    <div>
      <olPort :terminal="1"/>
      <olPort class="mt-1" :terminal="2" v-if=FLAG_2_MAPS />
      <SlideBar />
    </div>
    <BottomProgress />
    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>
import { shiftNow, dateNow } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import SlideBar from "@/components/SlideBar";
import BottomProgress from "@/components/BottomProgress";
import { mapGetters } from "vuex";
const olPort = () => import("@/components/Ol-Port");
export default {
  data() {
    return {
    }
  },
  name: "App",
  components: {
    olPort,
    BTooltip,
    SlideBar,
    BottomProgress,
  },
  computed: {
    ...mapGetters([
      "FLAG_2_MAPS",
      "SELECTED_FEATURES",
    ]),
  },
  mounted() {
    this.$store.dispatch("SET_DATE_SHIFT"  , [dateNow(), shiftNow()])
  }
};
</script>

