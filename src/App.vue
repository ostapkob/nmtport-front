<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!--   <router-link to="/">Home</router-link> | -->
    <!--   <router-link to="/about">About</router-link> | -->
    <!--   <router-link to="/json">Json</router-link> | -->
    <!--   <router-link to="/krans">Krans</router-link> | -->
    <!--   <router-link to="/map">Map</router-link> -->
    <!-- </div> -->

<!-- <div class='mb-100'  > -->
<!--   <b-navbar toggleable="sm" type="dark" variant="info"> -->
<!--     <b-navbar-brand active to="/mapol">  Карта </b-navbar-brand> -->  
<!--     <b-navbar-brand active to="/krans"> Краны </b-navbar-brand> -->  
<!--     <b-navbar-brand active to="/usm"> УСМ </b-navbar-brand> --> 

<!--     <!-1- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -1-> -->
<!--    <b-navbar-toggle target="navbar-toggle-collapse"> -->
<!--      <template v-slot:default="{ expanded }"> -->
<!--        <div v-if="expanded" > /\</div> -->
<!--        <div v-else> \/ </div> -->
<!--      </template> -->
<!--    </b-navbar-toggle> -->

<!--     <b-collapse id="navbar-toggle-collapse" is-nav> -->
<!--       <b-navbar-nav> -->
<!--         <b-nav-item href="/">Растановка</b-nav-item> -->
<!--         <!-1- <b-nav-item to="/mapol">  Карта </b-nav-item> -1-> -->
<!--         <!-1- <b-nav-item to="/usm"> УСМ </b-nav-item> -1-> -->
<!--         <!-1- <b-nav-item to="/krans"> Краны </b-nav-item> -1-> -->
<!--         <b-nav-item to="/archive"> Архив </b-nav-item> -->
<!--       </b-navbar-nav> -->
<!--     </b-collapse> -->
<!--   </b-navbar> -->
<!-- </div> -->
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs >
        <!-- <b-nav-item>'s with child routes. Note the trailing slash on the first <b-nav-item> -->
        <b-nav-item to="/mapol" exact exact-active-class="active">Карта</b-nav-item>
        <b-nav-item to="/usm" exact exact-active-class="active">Усм</b-nav-item>
        <b-nav-item to="/krans" exact exact-active-class="active">Краны</b-nav-item>
        <b-nav-item-dropdown
          id="my-nav-dropdown"
          left
          >
          <b-dropdown-item to='/'>Растановка</b-dropdown-item>
          <b-dropdown-item to='/archive'>Архив</b-dropdown-item>
          </b-nav-item-dropdown>
      </b-nav>
    </b-card-header>
  <!-- <b-navbar type="dark" variant="info"> -->
  <!--     <b-navbar-nav> -->
  <!--       <b-nav-item to="/mapol" exact exact-active-class="active">Карта</b-nav-item> -->
  <!--       <b-nav-item to="/usm" exact exact-active-class="active">Усм</b-nav-item> -->
  <!--       <b-nav-item to="/krans" exact exact-active-class="active">Краны</b-nav-item> -->
  <!--       <b-nav-item-dropdown left> -->
  <!--         <b-dropdown-item to='/'>Растановка</b-dropdown-item> -->
  <!--         <b-dropdown-item to='/archive'>Archive</b-dropdown-item> -->
  <!--       </b-nav-item-dropdown> -->
  <!--     </b-navbar-nav> -->
  <!-- </b-navbar> -->
     <div class="mb-5">
      <router-view></router-view>
     </div>
  </b-card>
  </div>
</template>



<script>
import {mapActions} from 'vuex'

//import { BCollapse, BNavbar, BNavbarBrand, BNavbarNav, BNavItem, BNavbarToggle  } from 'bootstrap-vue'
//import { BCollapse, BNavbar, BNavbarNav, BNavItem, BNavbarToggle  } from 'bootstrap-vue'
//import {  BNavbar,  BNavbarNav, BNavItem, BDropdownItem,  BNavItemDropdown } from 'bootstrap-vue'
import {BNav,   BDropdownItem, BNavItemDropdown, BCardHeader, BNavItem,  BCard} from 'bootstrap-vue'

export default {
  components: {
    //BNavbar, 
    //BNavbarNav, 
    //BNavItem,
    //BNavbarBrand,
    //BNavbarToggle,
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

