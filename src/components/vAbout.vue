<template>
  <div class="json">
     <p>before</p>
      <slot name="name1" />
      <slot name="name2" />
      <p>after</p>
  </div>
</template>

<script>
export default {
  name: 'Json',
  props: {
    msg: String
  },
    methods: {
    },
    computed:  {
    },
    mounted() {
    }
}
</script>

<style lang="scss">
</style>
