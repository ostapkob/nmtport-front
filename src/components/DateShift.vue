<template>
  <div class="date-header">
    <b-button size="sm" variant="outline-info" @click="backDateShift()">
      &laquo;
    </b-button>
    <span class="ml-3 mr-3">
      дата: <strong>{{ date }}</strong> смена:
      <strong>{{ shift }}</strong>
    </span>
    <b-button size="sm" variant="outline-info" @click="nextDateShift()">
      &raquo;
    </b-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Krans",
  data() {
    return {
      shift: 1,
      date: "-",
    };
  },
  methods: {
    ...mapActions(["SET_KRANS_API"]),
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
    },
  },
};
</script>


