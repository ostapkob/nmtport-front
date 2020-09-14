<template>
  <div class="json">
      <h2 v-if="$store.state.errored"> Error... </h2>
    <h4> {{ $store.tt }}</h4>
      <hr />
      <div class="bg-mech" :class="bgMech(mech.value)" v-for="(mech, key) in $store.state.last_data" :key=key>
        <h5>{{ mech.name}} <b-badge variant="light">{{mech.value}}</b-badge></h5>
        <p>{{mech.time}} </p>
        <div> {{mech.latitude}} : {{mech.longitude}} </div>
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
    methods: {
        bgMech: function(val) {
            let resultColor='bg-mech-red';
            if (val<=0.8) {
               resultColor='bg-mech-yellow'
            }
            else if (val<=1) {

               resultColor='bg-mech-teal'
            }
            else {
            resultColor='bg-mech-blue'
            }
            return resultColor 
            }
    },
    computed:  {
    },
    mounted() {
        console.log('component mounted')
        console.log()
    }
}
</script>

<style lang="scss">
.bg-mech-red{
    color: #f0f0f0;
    background: red;
}

.bg-mech-teal{
    color: #f0f0f0;
    background: teal;
    h5 {
        font-family: 'Roboto Slab', serif;
        color: #f0f0f0;
        margin: .6px 0;
        }
}
.bg-mech-blue{
    color: #f0f0f0;
    background: blue;
    h5 {
        font-family: 'Roboto Slab', serif;
        color: #f0f0f0;
        margin: .6px 0;
        }
}
.bg-mech-yellow{
    color: #222;
    background: yellow;
        h5 {
        font-family: 'Roboto Slab', serif;
        color: #333;
        margin: .6px 0;
        }
}

.bg-mech {
    margin-top: 20px;
    width: 300px;
    padding:  2px 2px 0px 0px;
    border-radius: 5px;
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
