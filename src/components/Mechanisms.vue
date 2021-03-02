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
      class="p-2 border rounded bg-light mb-2 shadow-sm"
      :key="mech.id"
    >
      <b-overlay
        :show="!flagOverlay"
        spinner-variant="primary"
        spinner-small
        rounded="lg"
      >
        <progressKRAN :mech="mech" :shift=shift v-if="typeMECH == 'KRAN'" />
        <progressUSM :mech="mech" :shift=shift v-if="typeMECH == 'USM'" />
        <progressSenebog :mech="mech" :shift=shift  v-if="typeMECH == 'SENNEBOG'" />
      </b-overlay>
    </div>
    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>

//v-show="isNow || mech.total_180>5 || mech.total_90 > 5 || mech.total_time>0.1"
import { shiftNow, dateNow, hoursProgress } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";
import { BOverlay } from 'bootstrap-vue'

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
    progressKRAN: () => import("@/components/ProgressKran"),
    progressUSM: () => import("@/components/ProgressUsm"),
  },
  computed: {
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
    buttonsDisabled() {
      this.flagButtonsDisabled = true;
      setTimeout(() => {
        this.flagButtonsDisabled = false;
      }, 1500);
    },
    refresh() {
       if (this.isNow) {
         this.GET_SET( dateNow(), shiftNow(), 10 )
       }
    },
    clickAnyButtons() {
      if (this.isNow) {
        this.$store.dispatch("SET_FLAG_" + this.typeMECH + "_NOW", true);
      }
      else {
        this.$store.dispatch("SET_FLAG_" + this.typeMECH + "_NOW", false);
      }
      this.GET_SET(this.date, this.shift, 1300)
      this.buttonsDisabled();
    },
  GET_SET(date, shift, timer) {
      this.flagOverlay=false
      this.$store.dispatch("SET_" + this.typeMECH + "_API", [
        date,
        shift,
      ]).then(
        setTimeout(this.GET_MECH, timer ) // becouse don't work promise
      );
  },
    GET_MECH() {
          this.$store.dispatch("GET_" + this.typeMECH + "_DATA")
          this.flagOverlay=true
    },
  },
  mounted() {
    this.shift = shiftNow();
    this.date = dateNow();
    this.hours = hoursProgress(shiftNow());
    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
    this.GET_SET(dateNow(), shiftNow(), 300)
  },
  watch: {
    dateCal: function () {
      this.date = this.dateCal.split("-").reverse().join(".");
      this.shift = 1;
      this.GET_SET(this.date, 1, 1000)
    },
  },
  updated() {
  },
  beforeDestroy() {
    window.removeEventListener("focus", this.refresh);
  },
};
</script>


