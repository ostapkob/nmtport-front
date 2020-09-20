<template>
<div class="json">
        <p v-for="(mech, key) in LAST_DATA" :key=key> {{mech.time}} --- </p>
    <Json :mechanisms_last_data=LAST_DATA msg="JSON"/>
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
  data () {
       return {
           polling: null
       }
   },
  computed: {
     ...mapGetters([
          'LAST_DATA'
         ])
  },
  methods: {
       ...mapActions([
           'GET_LAST_DATA'
       ]),
	pollData () {
		this.polling = setInterval(() => {
			this.$store.dispatch('GET_LAST_DATA')
		}, 5000)
	}
   },
   mounted() {
       this.GET_LAST_DATA()
   },
   beforeDestroy () {
       clearInterval(this.polling)
   },
   created () {
       this.pollData()
        console.log('----------------')
        console.log(typeof(this.LAST_DATA))
   },
}
</script>


