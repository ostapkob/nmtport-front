<template>
<div class="json">
 <b-button @click=this.GET_LAST_DATA variant="success"> Click </b-button>
 <!-- <b-button  variant="success"> Click </b-button> -->
<Json msg="JSON"/>
      <!-- <div class="bg-mech" v-for="(mech, key) in LAST_DATA" :key=key> -->
      <!--   <h5>{{ mech.name}} <b-badge variant="light">{{mech.value}}</b-badge></h5> -->
      <!--   <p>{{mech.latitude}} : {{mech.longitude}}</p> -->
      <!-- </div> -->
  <hr />
  </div>
</template>

<script>
// @ is an alias to /src
import Json from '@/components/Json.vue'
import {mapActions, mapGetters} from 'vuex'


export default {
  name: 'Jsone',
  components: {
    Json
  },
    computed: {
       ...mapGetters([
            'LAST_DATA'
           ])
    },
    methods: {
                //          increment() {
                //                 this.$store.commit('SET_LAST_DATA_TO_STATE')
                //                console.log(this.$store.state.count)
                //             },
        ...mapActions([
            'GET_LAST_DATA'
        ])
    },
    mounted() {
        console.log('mounted');
        this.GET_LAST_DATA()
    }

}
</script>


