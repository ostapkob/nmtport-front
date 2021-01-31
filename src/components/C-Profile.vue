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
        class="text-left"  
        name="check-button" 
        switch 
        >
        Звук сообщения
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
      flagNotification: false,
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
    "FLAG_NOTIFICATION"
    ]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions([
      "SET_FLAG_AUDIO",
      "SET_FLAG_NOTIFICATION",
    ]),
  },
  watch: {
    flagAudio: function(){
      this.SET_FLAG_AUDIO(this.flagAudio)
    },
    flagNotification: function(){
      if (this.FLAG_NOTIFICATION == null) {
        console.log(null)
        requestPermission()
      }
      this.SET_FLAG_NOTIFICATION(this.flagNotification)
    }
  },
  mounted() {
    this.flagAudio = this.FLAG_AUDIO;
    this.flagNotification = this.FLAG_NOTIFICATION;
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
