<template>
  <div>
    {{ msg }}
    <b-button @click="showNotif" class="bg-info"> Click </b-button>
  </div>
</template>

<script>
// import { showNotification } from "@/functions/functions";

export default {
  name: "App",
  components: {},
  data() {
    return {
      msg: "",
      options: {
        body: "Alarm",
        icon: require("@/assets/img/icon.png"),
        //:sound:  require('@/assets/sound/test.mp3'),
        //'image':  require('@/assets/img/numbers/kran/black/6.png'),
        badge: require("@/assets/img/icon512.png"),
        vibrate: [ 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500, ],
      },
    };
  },
  methods: {
    // notif() {
    //   showNotification("myTest", this.options);
    //   this.playSound();
    // },
    // playSound() {
    //   let audio = new Audio(require("@/assets/sound/test.mp3"));
    //   audio.play();
    // },

    // showNotif() {
    //   setTimeout(this.notif, 4000);
    // },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
