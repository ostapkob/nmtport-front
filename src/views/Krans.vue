<template>
<div class="krans ml-4 mr-4">

  <b-container class="bv-example-row mt-1 ">
    <b-row class="justify-content-md-center">
      <b-col  class='text-right  pr-0'>
        <b-button
          size="sm"
          variant="outline-info"
          @click="backDateShift()"
          >
          &lsaquo;
        </b-button>
      </b-col>

      <b-col cols="6" class="text-left pl-0 pr-0">
        <div class="date-header">
        дата: <strong>{{ date }}</strong>  смена:
        <strong>{{ shift }}</strong>
        </div>
      </b-col>

      <b-col  class="text-left pl-0" >
        <b-button size="sm"
          variant="outline-info"
          @click="nextDateShift()"
          class='mr-2'
          v-show='!(date==dateNow && shift==shiftNow)'
          >
          &rsaquo;
        </b-button>
        <b-button size="sm"
          variant="outline-info"
          @click="nowDateShift()"
          v-show='!(date==dateNow && shift==shiftNow)'
          >
          &raquo;
        </b-button>
      </b-col>
    </b-row>
  </b-container>

    <div v-for="(mech, key) in KRANS_DATA" :key='key' >
      <kranProgress :mech='mech'  />

        <!-- <div  class="time-line-mech"> -->
        <!--   <span  v-for="(hour, keyH) in hours" :key=keyH> {{hour}} </span> -->
        <!-- </div> -->
        <Hours :shift='shift' />
      <hr />
  </div>
</div>
</template>

<script>
import kranProgress from '@/components/ProgressKran.vue'
import Hours from '@/components/Hours.vue'
import {mapActions, mapGetters} from 'vuex'
import { shiftNow, dateNow, hoursProgress   } from '@/functions/functions';

export default {
  name: 'Krans',
  msg: "text",
  data() {
    return {
        shift: 1,
        date: '-',
        shiftNow: 1,
        dateNow: '-',
        hours: '',
        polling: null
    }
  },
  components: {
    kranProgress,
    Hours
  },
   computed: {
      ...mapGetters([
           'KRANS_DATA'
          ]),
   },
   methods: {
    ...mapActions([
            'GET_KRANS_DATA', 'SET_KRANS_API'
        ]),
    pollData() {
        this.polling = setInterval(() => {
            this.$store.dispatch('GET_KRANS_DATA');
        }, 5000)
    },
     backDateShift() {
       if (this.shift==2) {
         this.shift = 1
       }
       else {
         let parts = this.date.split('.')
         let newDate = new Date(parts[2], parts[1]-1, parts[0])
         newDate.setDate(newDate.getDate()-1)
         this.date =  newDate.getDate()+'.'+String(newDate.getMonth()+1) + '.' + newDate.getFullYear()
         this.shift = 2
       }
       this.SET_KRANS_API([this.date, this.shift])
     },

     nextDateShift() {
       if (this.shift==1) {
         this.shift = 2
       }
       else {
         let parts = this.date.split('.')
         let newDate = new Date(parts[2], parts[1]-1, parts[0])
         newDate.setDate(newDate.getDate()+1)
         this.date =  newDate.getDate()+'.'+String(newDate.getMonth()+1) + '.' + newDate.getFullYear()
         this.shift = 1
       }
       this.SET_KRANS_API([this.date, this.shift])
     },
     nowDateShift() {
        this.shift = shiftNow()
        this.date = dateNow()
       this.SET_KRANS_API([this.date, this.shift])
     },
    },
    mounted() {
        this.shift = shiftNow()
        this.date = dateNow()
        this.shiftNow = shiftNow()
        this.dateNow = dateNow()
        this.hours = hoursProgress(shiftNow())
        this.GET_KRANS_DATA()

    },
  watch: {
    shift: function () {
      this.SET_KRANS_API([this.date, this.shift])
      this.$store.dispatch('GET_KRANS_DATA');
      this.shiftNow = shiftNow()
      this.dateNow = dateNow()
    }
  },

    beforeDestroy () {
      clearInterval(this.polling)
    },
    created() {
       this.pollData()
    },
}
</script>


