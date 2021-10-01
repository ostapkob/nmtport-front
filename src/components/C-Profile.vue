<template>
  <div>
    <b-icon-person-circle class="h2 mb-2" variant="primary" />
    <h5>{{ currentUser.username }}</h5>
    <hr />
    <b-icon-volume-up class="h2 mb-2" variant="primary" />
    <div class="pl-2">
      <b-form-checkbox 
        v-model="flagNotification" 
        class="text-left pb-3"  
        name="check-button" 
        switch 
        >
        Выводить сообщения 
      </b-form-checkbox>
      <b-form-checkbox 
        v-model="flagAudio" 
        class="text-left pb-3"  
        name="check-button" 
        switch 
        >
        Звук сообщения
      </b-form-checkbox>
      <b-form-checkbox 
        v-model="flagEmptyMech" 
        class="text-left pb-3"  
        name="check-button" 
        switch 
        >
        Показывать не работающе механизмы 
      </b-form-checkbox>
      <b-form-checkbox 
        v-model="flagTerminal1" 
        class="text-left pb-3"  
        name="check-button" 
        switch 
        >
        УТ-1
      </b-form-checkbox>
      <b-form-checkbox 
        v-model="flagTerminal2" 
        class="text-left"  
        name="check-button" 
        switch 
        >
        ГУТ-2
      </b-form-checkbox>
    </div>
    <hr />
    <b-icon-key-fill class="h2 mb-2" variant="primary" />
    <p class="text-center">Ключь-приглашения:</p>
    <h5 :class="changeColor">
      {{ currentUser.invite }}
    </h5>
    <b-button
      type="button"
      variant="info"
      v-clipboard:copy="currentUser.invite"
      size="sm"
      @click="changeColor = 'text-info'"
    >
      Скопировать</b-button
    >
    <!-- <b-icon-box-arrow-in-right class='bg-secondary ' variant='light'> </b-icon-box-arrow-in-right > -->
  </div>
</template>

<script>
//import { BIconBoxArrowInRight } from 'bootstrap-vue'
import { BIconPersonCircle, BIconKeyFill, BIconVolumeUp } from "bootstrap-vue";
import { BFormCheckbox } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";
import { requestPermission } from "@/functions/functions";

export default {
  name: "Profile",
  data() {
    return {
      changeColor: "text-dark",
      flagAudio: false,
      flagEmptyMech: false,
      flagNotification: false,
      flagTerminal1: true,
      flagTerminal2: false,
    };
  },
  components: {
    //   BIconBoxArrowInRight
    BIconKeyFill,
    BIconPersonCircle,
    BFormCheckbox,
    BIconVolumeUp
  },
  computed: {
    ...mapGetters([
    "FLAG_AUDIO",
    "FLAG_EMPTY_MECH",
    "FLAG_NOTIFICATION",
    "FLAG_TERMINAL_1",
    "FLAG_TERMINAL_2",
    ]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions([
      "SET_FLAG_AUDIO",
      "SET_FLAG_EMPTY_MECH",
      "SET_FLAG_NOTIFICATION",
      "SET_FLAG_TERMINAL_1",
      "SET_FLAG_TERMINAL_2",
    ]),
  },
  watch: {
    flagAudio: function(){
      this.SET_FLAG_AUDIO(this.flagAudio)
    },
    flagEmptyMech: function(){
      this.SET_FLAG_EMPTY_MECH(this.flagEmptyMech)
    },
    flagNotification: function(){
      if (this.FLAG_NOTIFICATION == null) {
        requestPermission()
      }
      this.SET_FLAG_NOTIFICATION(this.flagNotification)
    },
    flagTerminal1: function(){
      this.SET_FLAG_TERMINAL_1(this.flagTerminal1)
    },
    flagTerminal2: function(){
      this.SET_FLAG_TERMINAL_2(this.flagTerminal2)
    },
  },
  mounted() {
    this.flagAudio = this.FLAG_AUDIO;
    this.flagEmptyMech = this.FLAG_EMPTY_MECH;
    this.flagNotification = this.FLAG_NOTIFICATION;
    this.flagTerminal1 = this.FLAG_TERMINAL_1
    this.flagTerminal2 = this.FLAG_TERMINAL_2;
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
