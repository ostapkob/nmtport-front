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
            v-show="flagButtonsVisible"
            :disabled="flagButtonsDisabled"
          >
            &rsaquo;
          </b-button>
          <b-button
            size="sm"
            variant="secondary"
            @click="nowDateShift()"
            class="shadow-sm"
            v-show="flagButtonsVisible"
          >
            &raquo;
          </b-button>
      </div>
    </div>

    <div
      v-for="mech in KRANS_DATA"
      class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 shadow-sm"
      :key="mech.id"
    >
      <kranProgress :mech="mech" />
      <Hours :shift="shift" />
    </div>

    <div>
      <span id="bug" variant="primary" class="bug-tooltip">.</span>
      <b-tooltip show target="bug" variant="light">.</b-tooltip>
    </div>
  </div>
</template>

<script>
const kranProgress = () => import("@/components/ProgressKran");
const Hours = () => import("@/components/Hours");

import { mapActions, mapGetters } from "vuex";
import { shiftNow, dateNow, hoursProgress } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BFormDatepicker } from "bootstrap-vue";

export default {
  name: "Krans",
  data() {
    return {
      shift: 1,
      date: "-",
      shiftNow: 1,
      dateNow: "-",
      hours: "",
      polling: null,
      dateCal: dateNow(),
      flagButtonsDisabled: false,
      flagButtonsVisible: false,
    };
  },
  components: {
    kranProgress,
    Hours,
    BTooltip,
    BFormDatepicker,
  },
  computed: {
    ...mapGetters(["KRANS_DATA"]),
  },
  methods: {
    ...mapActions(["GET_KRANS_DATA", "SET_KRANS_API"]),
    pollData() {
      this.polling = setInterval(() => {
        this.$store.dispatch("GET_KRANS_DATA");
      }, 5000);
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
      this.SET_KRANS_API([this.date, this.shift]);
      this.buttonsDisabled();
      this.buttonsVisible();
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
      this.SET_KRANS_API([this.date, this.shift]);
      this.buttonsDisabled();
      this.buttonsVisible();
    },
    nowDateShift() {
      this.shift = shiftNow();
      this.date = dateNow();
      this.SET_KRANS_API([this.date, this.shift]);
      this.buttonsVisible();
    },
    buttonsDisabled() {
      this.flagButtonsDisabled = true;
      setTimeout(() => {
        this.flagButtonsDisabled = false;
      }, 1000);
    },
    buttonsVisible() {
      if (!(this.date == this.dateNow && this.shift == this.shiftNow)) {
        this.flagButtonsVisible = true;
      } else {
        this.flagButtonsVisible = false;
      }
    },
    refresh() {
      this.shiftNow = shiftNow();
      this.dateNow = dateNow();
      if (this.date == this.dateNow && this.shift == this.shiftNow) {
        this.flagButtonsVisible = false;
      } else {
        this.flagButtonsVisible = true;
      }
      this.SET_KRANS_API([this.date, this.shift]);
    },
  },
  mounted() {
    this.shift = shiftNow();
    this.date = dateNow();
    this.shiftNow = shiftNow();
    this.dateNow = dateNow();
    this.hours = hoursProgress(shiftNow());
    this.SET_KRANS_API([this.date, this.shift]);
    this.GET_KRANS_DATA();

    this.$nextTick(function () {
      window.addEventListener("focus", this.refresh); // if focus get data
    });
  },
  watch: {
    // shift: function () {
    //   this.refresh();
    // },

    dateCal: function () {
      this.date = this.dateCal.split("-").reverse().join(".");
      this.shift = 1;
      this.SET_KRANS_API([this.date, this.shift]);
      this.$store.dispatch("GET_KRANS_DATA");
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


