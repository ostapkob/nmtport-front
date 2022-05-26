<template>
  <div>
    <h3>
    {{ $route.params.id}}
    {{ $route.params.type}}
    </h3>
    <div>
      <strong>{{ DATE }}</strong> смена: {{ SHIFT }}
    </div>
    <div class="rfid-table p-2"> 
      <b-table striped hover :items=rfid_data :fields="fields" ></b-table>
    </div>
    <b-button 
       @click="$router.go(-1)"
      variant="info"
      size="sm"
      >
      &laquo; Назад 
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addZero } from "@/functions/functions";
import {
  BTable,
} 
from "bootstrap-vue";
export default {
  name: "RfidWork",
  data() {
    return {
      fields: [
          {
            key: 'time',
            label: 'Время',
            formatter: value => {
              let date = new Date(value) 
              date.setTime(date.getTime() - (10*60*60*1000));
              const hours  = addZero(date.getHours()) 
              const minutes= addZero(date.getMinutes())
              return hours + ":" + minutes
            }
          }, 
          {
            label: 'ФИО',
            key: 'fio',
          }, 
          {
            label: 'Состояние',
            key: 'flag',
            formatter: value => {
              return value ? '✔️' : '❌'
            },
          }, 
        ],
      rfid_data: [],
    }
  },
  components: {
    BTable,
  },
  computed: {
    ...mapGetters([
      "DATE",
      "SHIFT",
      "USM_DATA",
      "KRAN_DATA",
      "SENNEBOGEN_DATA",
      ])
  },
  
  methods: {
    hendlerRfidData()  {
      const type = this.$route.params.type
      const id = this.$route.params.id
      this.rfid_data =this.$store.getters[type.toUpperCase() + '_DATA'][id]['rfid']
    }
  },
  mounted() {
    this.hendlerRfidData()
  },
}
</script>

