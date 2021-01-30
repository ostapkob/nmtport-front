<template>
  <div>
    <b-card
      no-body
      class="ml-2 mr-2 mt-2 mx-auto shadow-sm"
      style="max-width: 400px"
    >
      <b-tabs pills card>
        <b-tab v-if="!loggedIn" title="Вход" active>
          <b-card-text>
            <cLogin />
          </b-card-text>
        </b-tab>

        <b-tab v-if="!loggedIn" title="Регистрация">
          <b-card-text>
            <cRegister />
          </b-card-text>
        </b-tab>

        <b-tab v-if="loggedIn" size='sm' title="Профиль">
          <b-card-text>
            <cProfile />
          </b-card-text>
        </b-tab>

        <b-tab v-if="loggedIn" title="Выход" @click="logOut">
          <b-card-text>
            <b-alert show> Вы вышли с аккаунта! </b-alert>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText, BTabs, BTab, BAlert } from "bootstrap-vue";
const cLogin = () => import("@/components/C-LogIn");
const cRegister = () => import("@/components/C-Register");
const cProfile = () => import("@/components/C-Profile");

export default {
  name: "Login",
  data() {
    return {};
  },
  components: {
    BCard,
    BCardText,
    BTab,
    BTabs,
    cLogin,
    cRegister,
    BAlert,
    cProfile,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      //this.$router.push('login')
    },
  },
};
</script>

