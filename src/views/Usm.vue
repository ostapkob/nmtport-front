<template>
<div class="usm ml-4 mr-4">
    <div class="date-header"> дата: <strong>{{ date }}</strong>  смена: <strong>{{ shift }}</strong> </div>
    <!-- <div v-for="(mech, key) in KRANS_DATA" v-show='mech.total_180>22 || mech.total_90>22' :key='key' > --> 
    <div v-for="(mech, key) in USM_DATA" :key='key' > 
            <usmProgress :mech='mech'  />
            <div  class="time-line-mech"> 
                <span  v-for="(hour, keyH) in hours" :key=keyH> {{hour}} </span>
            </div>
        <hr />
    </div>
</div>
</template>

<script>
import usmProgress from '@/components/ProgressUsm.vue'
import {mapActions, mapGetters} from 'vuex'
import { shiftNow, dateNow, hoursProgress   } from '@/functions/functions';

export default {
  name: 'Usm',
  msg: "text",
  data() {
    return {
        shift: 1,
        date: '-',
        hours: '"',
        polling: null
    }
  }, 
  components: {
    usmProgress 
  },
   computed: {
      ...mapGetters([
           'USM_DATA'
          ]),
   },
   methods: {
    ...mapActions([
            'GET_USM_DATA'
        ]),
    pollData() {
        this.polling = setInterval(() => {
            this.$store.dispatch('GET_USM_DATA');
        }, 5000)
    },
    },
    mounted() {
        console.log('USM mounted');
        this.shift = shiftNow()
        this.date = dateNow()
        this.hours = hoursProgress(shiftNow())
        this.GET_USM_DATA()
    },
    beforeDestroy () {
       clearInterval(this.polling)
    },
    created() {
       this.pollData()
    }
}
</script>


