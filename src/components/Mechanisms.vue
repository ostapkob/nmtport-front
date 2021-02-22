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
          selected-variant="info"
          nav-button-variant="info"
          today-variant="info"
          locale="ru-RU"
          start-weekday="1"
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
        <strong>{{ date }}</strong> смена:
        <strong>{{ shift }}</strong>
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
      v-show="mech.total_180>5 || mech.totalStep_90 > 5 || mech.total_time>0.1"
    >
      <progressKRAN :mech="mech" :shift=shift v-if="typeMECH == 'KRAN'" />
      <progressUSM :mech="mech" :shift=shift v-if="typeMECH == 'USM'" />
      <progressSenebog :mech="mech" :shift=shift  v-if="typeMECH == 'SENNEBOG'" />
    </div>
    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>

//import { mapActions } from "vuex";
import { shiftNow, dateNow, hoursProgress } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";

export default {
  name: "Krans",
  data() {
    return {
      shift: 1,
      date: "-",
      hours: "",
      polling: null,
      dateCal: dateNow(),
      flagButtonsDisabled: false,
    };
  },
  props: {
    typeMECH: String,
  },
  components: {
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
    pollData() {
      this.polling = setInterval(() => {
        console.log(this.isNow)
        this.refresh();
      }, 45000);
    },
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
      console.log('>>', this.date, this.shift, this.isNow)
      if (this.isNow) {
        console.log('refresh now')
        this.$store.dispatch("SET_" + this.typeMECH + "_API", [
          dateNow(),
          shiftNow()
        ]);
        this.$store.dispatch("GET_" + this.typeMECH + "_DATA");
      }
    },
    clickAnyButtons() {
      this.$store.dispatch("SET_" + this.typeMECH + "_API", [
        this.date,
        this.shift,
      ]);
      this.$store.dispatch("GET_" + this.typeMECH + "_DATA");
      this.buttonsDisabled();
    }
  },
  
  mounted() {
    this.shift = shiftNow();
    this.date = dateNow();
    this.hours = hoursProgress(shiftNow());
    this.$store.dispatch("SET_" + this.typeMECH + "_API", [
      dateNow(),
      shiftNow(),
    ]);
    this.$store.dispatch("GET_" + this.typeMECH + "_DATA");
    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
  },
  watch: {
    dateCal: function () {
      this.date = this.dateCal.split("-").reverse().join(".");
      this.shift = 1;
      this.$store.dispatch("SET_" + this.typeMECH + "_API", [
        this.date,
        this.shift,
      ]);
      this.$store.dispatch("GET_" + this.typeMECH + "_DATA");
    },
  },

  beforeDestroy() {
    clearInterval(this.polling);
    window.removeEventListener("focus", this.refresh);
  },
  created() {
    this.pollData();
  },
};
</script>


