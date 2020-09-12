<template>
<div class="krans">
 <!-- <b-button @click=KRANS_DATA variant="danger" mb-8> Click </b-button> -->
  <div v-for="(mech, key) in KRANS_DATA" :key='key' class="bg-grey ml-4 mr-4"> 
    <kranProgress :mech='mech' />
  </div>
  <hr />
  </div>
</template>

<script>
import kranProgress from '@/components/kran_progress.vue'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Krans',
  components: {
    kranProgress 
  },
   computed: {
      ...mapGetters([
           'KRANS_DATA'
          ])
   },
   methods: {
        ...mapActions([
            'GET_KRANS_DATA'
        ])
    },
    mounted() {
        console.log('KRANS mounted');
        this.GET_KRANS_DATA()
    }

}
</script>


