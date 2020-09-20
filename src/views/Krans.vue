<template>
<div class="krans ml-4 mr-4">
    <div class="date-header"> дата: <strong>{{ date }}</strong>  смена: <strong>{{ shift }}</strong> </div>
    <!-- <div v-for="(mech, key) in KRANS_DATA" v-show='mech.total_180>22 || mech.total_90>22' :key='key' > --> 
    <div v-for="(mech, key) in KRANS_DATA" :key='key' > 
            <kranProgress :mech='mech'  />
            <div  class="time-line-mech"> 
                <span  v-for="(hour, keyH) in hours" :key=keyH> {{hour}} </span>
            </div>
        <hr />
    </div>
</div>
</template>

<script>
import kranProgress from '@/components/ProgressKran.vue'
import {mapActions, mapGetters} from 'vuex'
import { shiftNow, dateNow, hoursProgress   } from '@/functions/functions';

export default {
  name: 'Krans',
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
    kranProgress 
  },
   computed: {
      ...mapGetters([
           'KRANS_DATA'
          ]),
   },
   methods: {
    ...mapActions([
            'GET_KRANS_DATA'
        ]),
    pollData() {
        this.polling = setInterval(() => {
            this.$store.dispatch('GET_KRANS_DATA');
        }, 5000)
    },
    },
    mounted() {
        console.log('KRANS mounted');
        this.shift = shiftNow()
        this.date = dateNow()
        this.hours = hoursProgress(shiftNow())
        this.GET_KRANS_DATA()
    },
    beforeDestroy () {
       clearInterval(this.polling)
    },
    created() {
       this.pollData()
    }
}
</script>


