<template>
  <div id="app">
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav" class="header">
        <!-- <b-nav card-header tabs> -->
        <b-nav card-header tabs>
          <b-nav-item
            to="/mapol"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >Карта</b-nav-item
          >
          <b-nav-item
            to="/usm"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >Усм</b-nav-item
          >
          <b-nav-item
            to="/krans"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >Краны</b-nav-item
          >
          <b-nav-item-dropdown id="my-nav-dropdown" left>
            <b-dropdown-item to="/">Растановка</b-dropdown-item>
            <b-dropdown-item to="/video">Видео</b-dropdown-item>
            <!-- <b-dropdown-item to='/archive'>Архив</b-dropdown-item> -->
          </b-nav-item-dropdown>
          <b-nav-item to="/loginRegistr" exact exact-active-class="active"
            >Аккаунт</b-nav-item
          >
          <!-- <b-nav-item v-if=!loggedIn to="/register" >Register</b-nav-item> -->
          <!-- <b-nav-item v-if=loggedIn @click=logOut >Выйти</b-nav-item> -->
        </b-nav>
      </b-card-header>
      <div id="empty-top"> </div>
      <div class="mb-5">
        <router-view></router-view>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { showNotification } from "@/functions/functions";

import {
  BNav,
  BDropdownItem,
  BNavItemDropdown,
  BCardHeader,
  BNavItem,
  BCard,
} from "bootstrap-vue";

export default {
  data() {
    return {
      polling: null,
    }
  },
  components: {
    BNav,
    BNavItem,
    BCardHeader,
    BCard,
    BNavItemDropdown,
    BDropdownItem,
  },
  methods: {
    ...mapActions([
      "GET_IP",
      "GET_LAST_DATA",
      "SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE",
    ]),
    audioAlarm() {
      for (let mech in this.LAST_DATA) {
        let mechanism =   this.LAST_DATA[mech]
        if (mechanism.filter ) {
          if (mechanism.alarm ) {
            if ( this.FLAG_AUDIO ) {
              console.log(mechanism.name, '>audio:', this.FLAG_AUDIO)
              this.playSound();
            }
            if ( this.FLAG_NOTIFICATION) {
            console.log(mechanism.name, '>notification:', this.FLAG_NOTIFICATION)
            showNotification(mechanism.name, 
              {
                body: "Остановка не по графику",
                icon: require("@/assets/img/icon.png"),
                badge: require("@/assets/img/icon512.png"),
                tag: mechanism.number,
                vibrate: [ 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500, ],
              });
            }
            return 
          }
        }
      }
    },
    playSound() {
      let audio = new Audio(require("@/assets/sound/test.mp3"));
      audio.play();
    },
    pollData() {
      this.polling = setInterval(() => {
        this.GET_LAST_DATA();
        this.audioAlarm()
      }, 10000); // timer
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    ...mapGetters([
      "FLAG_AUDIO",
      "FLAG_NOTIFICATION",
      "LAST_DATA"
    ]),
  },
  mounted() {
    this.GET_IP();
    this.SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE();
    this.GET_LAST_DATA();
    this.audioAlarm()
  },
  created() {
    this.pollData();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  }



};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#empty-top {
  height: 80px;
}
</style>

