<template>
  <div>
    <olPort />
  </div>
</template>

<script>
//import olPort from "@/components/Ol-Port";
const olPort = () => import ("@/components/Ol-Port") 
export default {
  name: "App",
  components: {
    olPort
  }
};
</script>

<style lang="scss" scoped>
</style>
