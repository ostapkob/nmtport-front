<template>
  <div>
    <PortMap class="port-map"/>
  </div>
</template>

<script>
import PortMap from "@/components/GoogleMapPort";

export default {
  name: "App",
  components: {
    PortMap
  }
};
</script>

<style lang="scss" scoped>
.port-map {
  height: 400px;
}
</style>

