<template>
  <div class="main">
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

    <div
      v-for="mech in $store.getters[typeMECH + '_DATA']"
      :key="mech.id"
    >
      <div
        class="p-2 border rounded bg-light mb-2 shadow-sm"
        v-if="!(!FLAG_EMPTY_MECH && !isMechWork(mech))" 
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
      <b-overlay
        :show="!flagOverlay"
        spinner-variant="primary"
        spinner-small
        rounded="lg"
      >
          <div
            v-if="typeMECH=='KRAN'" 
             class="mt-4 d-flex justify-content-around"
            >
            <div
             v-for="(values, terminal) in filterTurns(TOTAL_180, 15)" 
             :key=terminal
            >
              <div
              v-if="values.turns>15"
              > 
                <div> {{terminal}} причал  </div>
                <b-badge 
                  variant="primary" 
                  size="lg"
                  class="p-2 mt-1"
                  :id="terminal + 'br'"
                  >
                  {{separateNumber1(values.tons*coefficient)}} тонн
                </b-badge>
                <b-tooltip 
                  :target="terminal + 'br'"
                  variant="primary">
                  {{values.krans.slice(0,-2)}}
                </b-tooltip>
              </div>
            </div>
          </div>
    </b-overlay>
  <br>
  </div>
</template>

<script>

import { shiftNow, dateNow, hoursProgress, separateNumber, addZero, tipShift } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";
import { BOverlay } from 'bootstrap-vue'
import { BBadge } from 'bootstrap-vue'
import { mapGetters } from "vuex";

export default {
  name: "Krans",
  data() {
    return {
      hours: "",
      dateCal: dateNow(),
      flagButtonsDisabled: false,
      flagOverlay: false,
      coefficient: 1.15,
      today: new Date(),
    };
  },
  props: {
    typeMECH: String,
  },
  components: {
    BOverlay,
    BTooltip,
    BFormDatepicker,
    BBadge,
    progressKRAN: () => import("@/components/ProgressKran"),
    progressUSM: () => import("@/components/ProgressUsm"),
    progressSENNEBOGEN: () => import("@/components/ProgressSennebogen"),
  }, 
  computed: {
    ...mapGetters([
      "TOTAL_180",
      "FLAG_EMPTY_MECH",
      "DATE",
      "SHIFT",
      "ISNOW"

    ]),
    getTipShift: function() {
      return tipShift(this.DATE, this.SHIFT)
    }
  },
  methods: {
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
        console.log(this.DATE);
        console.log(this.SHIFT);
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
    separateNumber1(n) {
      return separateNumber(n)
    },
    filterTurns(obj, limit) {
      let filterObj = {}
      for (let pair of Object.entries(obj)) {
        if (pair[1].turns>limit) {
            filterObj[pair[0]] = pair[1]
        }
      }
      return filterObj
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
    }

  },
  mounted() {
    this.hours = hoursProgress(shiftNow());
    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
    this.GET_SET(this.DATE, this.SHIFT)
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


