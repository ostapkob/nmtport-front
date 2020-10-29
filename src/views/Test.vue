<template>
  <div>
    <olPort />
    <GSAP />
  </div>

</template>

<script>
//import OI from "@/components/Ol-OverInfo";
import olPort from "@/components/Ol-Select";
import gsap from 'gsap'
import GSAP from '@/components/GSAP'

export default {
  name: "App",
  components: {
    olPort,
 //   OI,
    GSAP
  },
   data() {
     return {
       cards: ['123', '345', '567']
     }
   },
  methods: {
    simpleFade(i) {
      gsap.fromTo(this.$refs.cards[i],
      {
        backgroundColor: '#0f0',
        autoAlpha: 1
      },
      {
        autoAlpha: 0,
        duration: 1,
        backgroundColor: '#ff0',
       });
      }
    },
}
</script>

<style lang="scss" scoped>
.port-map {
  height: 400px;
}
</style>
