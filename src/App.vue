<template>
  <div id="app">
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs >
        <b-nav-item to="/mapol" exact exact-active-class="active" :disabled=!loggedIn>Карта</b-nav-item>
        <b-nav-item to="/usm" exact exact-active-class="active" :disabled=!loggedIn>Усм</b-nav-item>
        <b-nav-item to="/krans" exact exact-active-class="active" :disabled=!loggedIn>Краны</b-nav-item>
        <b-nav-item-dropdown
          id="my-nav-dropdown"
          left
          >
          <b-dropdown-item to='/'>Растановка</b-dropdown-item>
          <b-dropdown-item to='/archive'>Архив</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/loginRegistr"  exact exact-active-class="active">Аккаунт</b-nav-item>
        <!-- <b-nav-item v-if=!loggedIn to="/register" >Register</b-nav-item> -->
        <!-- <b-nav-item v-if=loggedIn @click=logOut >Выйти</b-nav-item> -->
      </b-nav>
    </b-card-header>
    <div class="mb-5">
      <router-view></router-view>
    </div>
  </b-card>
  </div>
</template>



<script>
import {mapActions} from 'vuex'

import {BNav,   BDropdownItem, BNavItemDropdown, BCardHeader, BNavItem,  BCard} from 'bootstrap-vue'

export default {
  components: {
    BNav,
    BNavItem,
    BCardHeader,
    BCard,
    BNavItemDropdown,
    BDropdownItem
  },
   methods: {
    ...mapActions([
            'GET_IP'
        ]),
   },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
      }
  },
    mounted() {
      this.GET_IP()
    }
}
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
</style>

