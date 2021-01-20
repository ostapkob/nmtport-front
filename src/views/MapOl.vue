<template>
  <div>
    <olPort />

    <div>
      <!-- bag on safari -->
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>
//import olPort from "@/components/Ol-Port";
import { BTooltip } from "bootstrap-vue";
const olPort = () => import("@/components/Ol-Port");
export default {
  name: "App",
  components: {
    olPort,
    BTooltip,
  },
};
</script>

<style lang="scss" scoped>
</style>
