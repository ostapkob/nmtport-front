<template>
  <div>
    <Mechanisms typeMECH="KRAN"> </Mechanisms>
  </div>
</template>

<script>
import Mechanisms from "@/components/Mechanisms";
//const kranProgress = () => import("@/components/ProgressKran");

export default {
  name: "App",
  components: {
    Mechanisms,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
