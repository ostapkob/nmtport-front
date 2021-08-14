<template>
  <div>
    <olPort />
    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>
import { shiftNow, dateNow } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
const olPort = () => import("@/components/Ol-Port");
export default {
  name: "App",
  components: {
    olPort,
    BTooltip,
  },
  mounted() {
    this.$store.dispatch("SET_DATE_SHIFT"  , [dateNow(), shiftNow()])
  }
};
</script>

<style lang="scss" scoped>
</style>
