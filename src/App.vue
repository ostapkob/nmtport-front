<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!--   <router-link to="/">Home</router-link> | -->
    <!--   <router-link to="/about">About</router-link> | -->
    <!--   <router-link to="/json">Json</router-link> | -->
    <!--   <router-link to="/krans">Krans</router-link> | -->
    <!--   <router-link to="/map">Map</router-link> -->
    <!-- </div> -->

<div class='mb-100'>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">Home</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/map"> Карта </b-nav-item>
        <b-nav-item to="/usm"> УСМ </b-nav-item>
        <b-nav-item to="/krans"> Краны </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input> -->
          <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
        </b-nav-form>

        <b-nav-item-dropdown text="Тип" right>
          <b-dropdown-item to="/json">Кран</b-dropdown-item>
          <b-dropdown-item to="/about">УСМ</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>


    <router-view/>



  </div>
</template>


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

