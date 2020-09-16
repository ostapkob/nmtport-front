<template>
  <div>
    <PortMap class="port-map"/>
  </div>
</template>

<script>
import PortMap from "@/components/MapPort";

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

