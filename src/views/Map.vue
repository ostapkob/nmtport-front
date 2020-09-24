<template>
  <div>
    <PortMap class="port-map"/>
    <img class="catalog-item-img" :src="require('@/assets/img/ship.png')" height="18" />
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

