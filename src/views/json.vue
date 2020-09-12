<template>
<div class="json">
 <!-- <b-button @click=this.GET_LAST_DATA variant="success"> Click </b-button> -->
 <b-button @click=LAST_DATA variant="success"> Click </b-button>
<Json msg="JSON"/>
  <hr />
  </div>
</template>

<script>
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
        ...mapActions([
            'GET_LAST_DATA'
        ])
    },
    mounted() {
        console.log('views mounted');
        this.GET_LAST_DATA()
    }

}
</script>


