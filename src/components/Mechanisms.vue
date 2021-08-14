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
          >
          <strong>{{ date }}</strong> смена:
          <strong>{{ shift }}</strong>
        </span>
      </div>
      <div class="text-left">
        <b-button
          size="sm"
          variant="secondary"
          @click="nextDateShift()"
          class="ml-3 mr-3 shadow-sm"
          v-show="!isNow"
          :disabled="flagButtonsDisabled"
        >
          &rsaquo;
        </b-button>
        <b-button
          size="sm"
          variant="secondary"
          @click="nowDateShift()"
          class="shadow-sm"
          v-show="!isNow"
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
          <progressKRAN :mech="mech" :shift=shift v-if="typeMECH == 'KRAN'" />
          <progressUSM :mech="mech" :shift=shift v-if="typeMECH == 'USM'" />
          <progressSENNEBOGEN :mech="mech" :shift=shift  v-if="typeMECH == 'SENNEBOGEN'" />
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
                  {{separateNumber1(values.tons*1.15)}} тонн
                </b-badge>
                <b-tooltip 
                  :target="terminal + 'br'"
                  variant="primary">
                  {{values.krans}}
                </b-tooltip>
              </div>
            </div>
          </div>
    </b-overlay>
  <br>
  </div>
</template>

<script>

//v-show="isNow || mech.total_180>5 || mech.total_90 > 5 || mech.total_time>0.1"
import { shiftNow, dateNow, hoursProgress, separateNumber } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";
import { BOverlay } from 'bootstrap-vue'
import { BBadge } from 'bootstrap-vue'
import { mapGetters } from "vuex";

export default {
  name: "Krans",
  data() {
    return {
      shift: 1,
      date: "-",
      hours: "",
      dateCal: dateNow(),
      flagButtonsDisabled: false,
      flagOverlay: false,
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
    ...mapGetters(["TOTAL_180", "FLAG_EMPTY_MECH"]),
    isNow: function () {
      return this.date == dateNow() && this.shift == shiftNow();
    },
  },
  methods: {
    backDateShift() {
      if (this.shift == 2) {
        this.shift = 1;
      } else {
        let parts = this.date.split(".");
        let newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        newDate.setDate(newDate.getDate() - 1);
        this.date =
          newDate.getDate() +
          "." +
          String(newDate.getMonth() + 1) +
          "." +
          newDate.getFullYear();
        this.shift = 2;
      }
      this.clickAnyButtons()
    },
    nextDateShift() {
      if (this.shift == 1) {
        this.shift = 2;
      } else {
        let parts = this.date.split(".");
        let newDate = new Date(parts[2], parts[1] - 1, parts[0]);
        newDate.setDate(newDate.getDate() + 1);
        this.date =
          newDate.getDate() +
          "." +
          String(newDate.getMonth() + 1) +
          "." +
          newDate.getFullYear();
        this.shift = 1;
      }
      this.clickAnyButtons()
    },
    nowDateShift() {
      this.shift = shiftNow();
      this.date = dateNow();
      this.clickAnyButtons()
    },
    refresh() {
       if (this.isNow) {
         this.GET_SET(dateNow(), shiftNow())
       }
    },
    clickAnyButtons() {
      this.GET_SET(this.date, this.shift)
      this.flagButtonsDisabled = true;
      this.SET_FLAG_MECH();
    },
    GET_SET(date, shift) {
      this.flagOverlay=false
      this.$store.dispatch("SET_" + this.typeMECH + "_API", [
        date,
        shift,
      ]).then( () => {
        this.GET_MECH()
      }
      );
    },
    SET_FLAG_MECH() {
      if (this.isNow) {
        this.$store.dispatch("SET_FLAG_" + this.typeMECH + "_NOW", true);
      }
      else {
        this.$store.dispatch("SET_FLAG_" + this.typeMECH + "_NOW", false);
      }
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
    this.shift = shiftNow();
    this.date = dateNow();
    this.hours = hoursProgress(shiftNow());
    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
    this.GET_SET(dateNow(), shiftNow())
    setTimeout(()=>{ 
      console.log('80 sec')
      this.shift = shiftNow();
      this.date = dateNow();
      this.$store.dispatch("SET_FLAG_" + this.typeMECH + "_NOW", true);
      this.GET_SET(dateNow(), shiftNow())
    }, 80000 ) 
  },
  watch: {
    dateCal: function () {
      this.date = this.dateCal.split("-").reverse().join(".");
      this.shift = 1;
      this.GET_SET(this.date, 1)
    },
  },
  updated() {
  },
  beforeDestroy() {
    window.removeEventListener("focus", this.refresh);
  },
};
</script>


