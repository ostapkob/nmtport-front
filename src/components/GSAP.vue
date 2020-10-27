<template>
  <div>
    <div ref="box" class="box"> d</div>

    <div class="bubble-wrapper" @click='pulse'>
      <div ref="bubble" class=bubble>
        <img 
          class="bubble-image" 
          src="@/assets/img/ship.png" 
          />
      </div>
      <div ref="bubblePulse" class="bubble-pulse"> </div>
    </div>

    <b-button @click="pulse" class='mt-3 mr-2' variant='danger'> Pulse </b-button>
    <b-button @click="tweenLine" class='mt-3'> Click </b-button>
  </div>
</template>

<script>
//import {TweenMax} from 'gsap/TweenMax'
import { TimelineLite, Back, Elastic, Expo } from "gsap"
export default {
  data() {
    return {
      target: this.$refs['box'],
    }
  },
  methods: {
    tweenLine() {
      const timeline = new TimelineLite()
      const { box } = this.$refs
      timeline.to(box, 2, {
        x: 200,
        rotation: 90,
        ease: Back.easeInOut,
      }) 
      timeline.to(box, 0.5, {
      background: 'green'
    },
        '-=0.5' 
    )},
  pulse() {
    const {bubble, bubblePulse} = this.$refs
    const timeline = new TimelineLite({
       onComplete: () => timeline.restart()
    })
    timeline.to (bubble, 0.4, {
      scale: 0.8,
      rotation: 16,
      ease: Back.easeOut.config(1.7),
    })
    console.log(bubblePulse)
    timeline.to(bubblePulse, 0.5, {
      scale: 0.9,
      opacity: 1,
    },
      '-=0.6'
    ),
    timeline.to(bubble, 1.2, {
      scale: 1,
      rotation: '-=16',
      ease: Elastic.easeOut(2.5, 0.5),
    })  
    timeline.to(bubblePulse, 1.1, {
        scale: 3,
        opacity: 0,
        ease: Expo.easeOut,
      },
    '-=1.2'
    )
  }
 },
}
</script>

<style lang="scss" scoped>
.box {
  height: 20px;
  width: 20px; 
  color: #ff0;
  background: #c45;
}

.bubble-wrapper{
  position: relative;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bubble{
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  background: #272727;
  border-radius: 50%;
  height: 100px;
  width: 100px;
}
.bubble-pulse{
  position: absolute;
  z-index: 1;
  height: 120px;
  width: 120px;
  background: #333;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
}
.bubble-image{
  height: 80%;
}
</style>



