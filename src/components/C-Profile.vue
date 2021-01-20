<template>
  <div>
    <b-icon-person-circle class="h2 mb-2" variant="primary" />
    <h5>{{ currentUser.username }}</h5>
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
import { BIconPersonCircle, BIconKeyFill } from "bootstrap-vue";

export default {
  name: "Profile",
  data() {
    return {
      changeColor: "text-dark",
    };
  },
  components: {
    //   BIconBoxArrowInRight
    BIconKeyFill,
    BIconPersonCircle,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
