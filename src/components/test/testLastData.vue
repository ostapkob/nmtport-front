<template>
  <div>
  </div>
</template>

<script>
export default {
  props: {
    marker: {
      required: false,
      default() {
        return []
      }
    },
  },
  mounted() {
      console.log(this.marker.name)
  }
}
</script>
