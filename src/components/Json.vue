<template>
  <div class="json">
      <h2 v-if="$store.state.errored"> Error... </h2>
    <h4> {{ $store.tt }}</h4>
      <hr />
      <div class="bg-mech" v-for="(mech, key) in $store.state.last_data" :key=key>
        <h5>{{ mech.name}} <b-badge variant="light">{{mech.value}}</b-badge></h5>
        <p>{{mech.time}} </p>
        <hr />
        
    </div>


  </div>
</template>

<script>
export default {
  name: 'Json',
  props: {
    msg: String
  },
    computed:  {
    },
    mounted() {
        console.log('json mounted')
        console.log()
    }
}
</script>

<style lang="scss">
.bg-mech {
    margin-top: 20px;
    width: 300px;
    padding:  2px 2px 0px 0px;

    background: teal;
    border-radius: 5px;
    color: #B3BFB8;
h5 {
    font-family: 'Roboto Slab', serif;
    color: #f0f9f0;
    margin: .6px 0;
    }
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
