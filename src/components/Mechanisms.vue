<template>
  <div class="main" >
    <b-overlay
        :show="!flagOverlay"
        spinner-variant="primary"
        spinner-small
        rounded="lg"
        class='mb-1'
      >
      <tonsByTerminals v-if="typeMECH=='KRAN'" />
    </b-overlay>

    <div class="date-toggle">
      <div class="text-right">
        <b-form-datepicker
          button-only
          id="example-datepicker"
          size="sm"
          v-model="dateCal"
          class="mr-3"
          locale="ru-RU"
          start-weekday="1"
          label-help=''
          :max="today"
        >
        </b-form-datepicker>
        <b-button
          size="sm"
          variant="secondary"
          @click="backDateShift()"
          class="shadow-sm mr-3"
          :disabled="flagButtonsDisabled"
        >
          &lsaquo;
        </b-button>
      </div>
      <div class="date-header">
        <span
         v-show="flagOverlay"
         id="tipShift"
          >
          <strong>{{ DATE }}</strong> смена:
          <strong>{{ SHIFT }}</strong>
        <b-tooltip 
          target="tipShift"
          placement="bottom"
          variant="secondary">
          {{ getTipShift }}
        </b-tooltip>
        </span>
      </div>
      <div class="text-left">
        <b-button
          size="sm"
          variant="secondary"
          @click="nextDateShift()"
          class="ml-3 mr-3 shadow-sm"
          v-show="!ISNOW"
          :disabled="flagButtonsDisabled"
        >
          &rsaquo;
        </b-button>
        <b-button
          size="sm"
          variant="secondary"
          @click="nowDateShift()"
          class="shadow-sm"
          v-show="!ISNOW"
        >
          &raquo;
        </b-button>
      </div>
    </div>
    <div class=mb-2 v-if="FLAG_TERMINAL_1 && FLAG_TERMINAL_2 && TERMINAL_1.length>0 && TERMINAL_2.length">
        УТ-1 
      </div>
    <div
      v-for="mech in filterTerminal(TERMINAL_1)"
      :key="mech.id"
    >
      <div
        class="p-2 border rounded bg-light mb-2 shadow-sm"
        v-if="FLAG_TERMINAL_1" 
      >
        <b-overlay
          :show="!flagOverlay"
          spinner-variant="primary"
          spinner-small
          rounded="lg"
          class= "border-secondary"
        >
          <progressKRAN :mech="mech" :shift=SHIFT v-if="typeMECH == 'KRAN'" />
          <progressUSM :mech="mech" :shift=SHIFT v-if="typeMECH == 'USM'" />
          <progressSENNEBOGEN :mech="mech" :shift=SHIFT  v-if="typeMECH == 'SENNEBOGEN'" />
        </b-overlay>
      </div>

    </div>
      <div class=mb-2 v-if="FLAG_TERMINAL_1 && FLAG_TERMINAL_2 && TERMINAL_1.length>0 && TERMINAL_2.length">
        <hr/>
        ГУТ-2  
      </div>
    <div
      v-for="mech in filterTerminal(TERMINAL_2)"
      :key="mech.id"
    >
      <div
        class="p-2 border rounded bg-light mb-2 shadow-sm"
        v-if="FLAG_TERMINAL_2" 
      >
        <b-overlay
          :show="!flagOverlay"
          spinner-variant="primary"
          spinner-small
          rounded="lg"
          class= "border-secondary"
        >
          <progressKRAN :mech="mech" :shift=SHIFT v-if="typeMECH == 'KRAN'" />
          <progressUSM :mech="mech" :shift=SHIFT v-if="typeMECH == 'USM'" />
          <progressSENNEBOGEN :mech="mech" :shift=SHIFT  v-if="typeMECH == 'SENNEBOGEN'" />
        </b-overlay>
      </div>
    </div>
    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>

import { shiftNow, dateNow, hoursProgress, addZero, tipShift } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";
import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Mechanisms",
  data() {
    return {
      hours: "",
      dateCal: dateNow(),
      flagButtonsDisabled: false,
      flagOverlay: false,
      today: new Date(),
      UT: {1: null}, 
      GUT: {2: null}, 
    };
  },
  props: {
    typeMECH: String,
    propsDateShift: String,
    propsShift: String,
  },
  components: {
    BOverlay,
    BTooltip,
    BFormDatepicker,
    progressKRAN: () => import("@/components/ProgressKran"),
    progressUSM: () => import("@/components/ProgressUsm"),
    progressSENNEBOGEN: () => import("@/components/ProgressSennebogen"),
    tonsByTerminals: () => import("@/components/tonsByTerminals"),
  }, 
  computed: {
    ...mapGetters([
      "TOTAL_180",
      "FLAG_EMPTY_MECH",
      "DATE",
      "SHIFT",
      "ISNOW",
      "FLAG_TERMINAL_1",
      "FLAG_TERMINAL_2",
      "TERMINAL_1",
      "TERMINAL_2",
    ]),
    getTipShift: function() {
      return tipShift(this.DATE, this.SHIFT)
    }
  },
  methods: {
    ...mapActions([
      "SET_TERMINALS"
    ]),
    backDateShift() {
      let newShift = 1
      let parts = this.DATE.split(".");
      let oldDate = new Date(parts[2], parts[1] - 1, parts[0]);
      let newDate = oldDate
      if (this.SHIFT == 2) {
        newShift = 1;
      } else {
        newShift = 2;
        oldDate.setDate(oldDate.getDate() - 1);
      }
      newDate = addZero(oldDate.getDate()) + "." 
              + addZero(String(oldDate.getMonth() + 1)) + "." 
              + oldDate.getFullYear();
      this.$store.dispatch("SET_DATE_SHIFT"  , [newDate, newShift])
      this.clickAnyButtons()
    },

    nextDateShift() {
      let newShift = 1
      let parts = this.DATE.split(".");
      let oldDate = new Date(parts[2], parts[1] - 1, parts[0]);
      let newDate = oldDate
      if (this.SHIFT == 1) {
        newShift = 2;
      } else {
        newShift = 1;
        oldDate.setDate(oldDate.getDate() + 1);
      }
      newDate = addZero(oldDate.getDate()) + "." 
              + addZero(String(oldDate.getMonth() + 1)) + "." 
              + oldDate.getFullYear();
      this.$store.dispatch("SET_DATE_SHIFT"  , [newDate, newShift])
      this.clickAnyButtons()
    },

    nowDateShift() {
      this.$store.dispatch("SET_DATE_SHIFT"  , [dateNow(), shiftNow()])
      this.clickAnyButtons()
    },
    refresh() {
      setTimeout( () =>
        {
          if (this.ISNOW) {
            this.GET_SET(this.DATE, this.SHIFT);
          }
        }
        , 5000)
    },

    clickAnyButtons() {
      this.GET_SET(this.DATE, this.SHIFT)
      this.flagButtonsDisabled = true;
    },

    GET_SET(date, shift) {
      this.flagOverlay=false
      this.$store.dispatch("SET_" + this.typeMECH + "_API", [
        date,
        shift,
      ]).then( () => {
        this.GET_MECH()
      });
    },

    GET_MECH() {
      this.$store.dispatch("GET_" + this.typeMECH + "_DATA").then(()=>{
          setTimeout(()=>{this.flagOverlay=true}, 500 ) 
          this.flagButtonsDisabled = false;
        }
      )
    },

    isMechWork(data) {
      if (this.typeMECH=="KRAN" && (data.total_180<5 && data.total_90<15)) {
          return false
      }
      if (this.typeMECH=="USM" && data.time_coal<.05) {
          return false
      }
      if (this.typeMECH=="SENNEBOGEN" && data.work_time<0.05) {
          return false
      }
      return true
    },

    filterTerminal(arr) {
      let mehanisms = {}
      let data = this.$store.getters[this.typeMECH + '_DATA']
      for (let mech in data) { 
        if (arr.includes(data[mech].terminal)) {
          mehanisms[mech] = data[mech] 
          if (data[mech].terminal<69)  {
            this.countTerminal1=1
          }
          else {
            this.countTerminal2=1
          }
        }
      }
      return this.filterTerminalEmpty(mehanisms)
    },

    filterTerminalEmpty(data) {
      if (!this.FLAG_EMPTY_MECH) {
        let filterMechanism= {}
        for (let mech in data) { 
          if (this.isMechWork(data[mech])) {
            filterMechanism[mech] = data[mech] 
          }
        }
        return filterMechanism
      }
      return data
    },
  },


  mounted() {
    this.hours = hoursProgress(shiftNow());
    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
    if (this.propsDateShift && this.propsShift) {
      console.log(this.propsDateShift, this.propsShift)
      this.$store.dispatch("SET_DATE_SHIFT"  , [this.propsDateShift, parseInt(this.propsShift)])
    }
    this.GET_SET(this.DATE, this.SHIFT)
    //this.UT  = this.filterTerminal(this.TERMINAL_1)
    //this.GUT = this.filterTerminal(this.TERMINAL_2)
  },
  watch: {
    dateCal: function () {
      let newDate = this.dateCal.split("-").reverse().join(".");
      this.$store.dispatch("SET_DATE_SHIFT"  , [newDate, 1])
      this.GET_SET(newDate, 1)
    },
    
  },
  updated() {
  },
  beforeDestroy() {
    window.removeEventListener("focus", this.refresh);
  },
};
</script>


