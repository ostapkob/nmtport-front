<template>
  <div id="app">
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav" class="header">
        <b-nav card-header tabs>
          <b-nav-item
            to="/krans"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >
            <img
              src="@/assets/img/kran_blue.svg"
              height="18"
            />
            <span class="text-nav"> Краны</span>
            </b-nav-item
          >
          <b-nav-item
            to="/usm"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >
            <img
              src="@/assets/img/usm_blue.svg"
              height="16"
              class="mb-1"
            />
            <span class="text-nav"> Усм</span>
            </b-nav-item
          >
          <b-nav-item
            to="/mapol"
            exact
            exact-active-class="active"
            :disabled="!loggedIn"
            >
            <b-icon-map  variant="primary" />
            <span class="text-nav">  Карта</span>
          </b-nav-item
          >
          <b-nav-item to="/loginRegistr" exact exact-active-class="active"
            >
            <b-icon-gear-fill  variant="primary" /> 
            <span class="text-nav"> Настройки</span>
            </b-nav-item
          >
          <b-nav-item-dropdown id="my-nav-dropdown" left>
            <b-dropdown-item to="/">Растановка</b-dropdown-item>
            <b-dropdown-item to="/video">Видео</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-nav>
      </b-card-header>
      <div id="empty-top"></div>
      <div class="mb-5">
        <router-view></router-view>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { showNotification } from "@/functions/functions";
import { BIconGearFill, BIconMap } from "bootstrap-vue";
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
      tmpSetAlarm: new Set(),
      typeMechanisms: ['KRAN', 'USM', 'SENNEBOGEN'],
    };
  },
  components: {
    BNav,
    BNavItem,
    BCardHeader,
    BCard,
    BNavItemDropdown,
    BDropdownItem,
    BIconGearFill,
    BIconMap,
  },
  methods: {
    ...mapActions([
      "GET_IP",
      "GET_LAST_DATA",
      "SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE",
    ]),
    audioAlarm() {
      for (let mech in this.LAST_DATA) {
        let mechanism = this.LAST_DATA[mech];
        // console.log(mechanism.filter, mechanism.alarm, mechanism.type, mechanism.number)
        if (mechanism.filter) {
          if (mechanism.alarm && this.tmpSetAlarm.has(mechanism.id)) {
            this.tmpSetAlarm.delete(mechanism.id);
            if (this.FLAG_AUDIO) {
              //console.log(mechanism.name, ">audio:", this.FLAG_AUDIO);
              this.playSound();
            }
            if (this.FLAG_NOTIFICATION) {
              //console.log( mechanism.name, ">notification:", this.FLAG_NOTIFICATION );
              showNotification(mechanism.name, {
                body: "Остановка не по графику",
                icon: require("@/assets/img/icon.png"),
                badge: require("@/assets/img/icon512.png"),
                tag: mechanism.number,
                vibrate: [ 500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500, ],
              });
            }
          }
          if (!mechanism.alarm) {
            this.tmpSetAlarm.add(mechanism.id);
          }
        }
      }
      return;
    },
    SET_GET_MECH() { //set and get to store data
      if (this.ISNOW){
        for (let typeMechanism of this.typeMechanisms) {
          this.$store.dispatch("SET_" + typeMechanism + "_API", [
            this.DATE,
            this.SHIFT,
          ]).then(() =>{
            this.$store.dispatch("GET_" + typeMechanism + "_DATA", true);
            console.log('%c===>', 'color:red;');
          })
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
        this.SET_GET_MECH();
        this.audioAlarm();
      }, 30000); // timer
    },
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    ...mapGetters([
        "FLAG_AUDIO",
        "FLAG_NOTIFICATION", 
        "LAST_DATA",
        "DATE",
        "SHIFT",
        "ISNOW"
                    
    ]),
  },
  mounted() {
    this.audioAlarm();
  },
  created() {
    this.GET_IP();
    this.SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE();
    this.GET_LAST_DATA();
    this.SET_GET_MECH();
    //for (let typeMechanism of this.typeMechanisms) {
    //    this.$store.dispatch("GET_" + typeMechanism + "_DATA")
    //  }
    //this.$store.dispatch("GET_KRAN_DATA"); 
    //this.$store.dispatch("GET_USM_DATA");
    //this.$store.dispatch("GET_SENNEBOGEN_DATA");
    this.pollData();
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
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

