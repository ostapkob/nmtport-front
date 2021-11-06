<template>
<div>

  <div
     class="mt-1 d-flex"
     v-if=FLAG_TERMINAL_1
    >
    <div
     v-for="values in filterTerminal(1)" 
     :key=values[0]
     :id="values[0] + 'br'"
    >
      <div class="text-center mr-2">
        <b-button 
          variant="primary" 
          class="text-lowercase" 
          @click='SET_TERMINALS(values[0])'
          >
          {{values[0]}} <small> пр  </small>
          <b-badge variant="light" size="lg" class="text-lowercase">
            {{separateNumber1(values[1].tons*GET_COEFFICIENT_COAL)}} <small> тн. </small>
          </b-badge>
        </b-button>
      </div>

      <b-tooltip 
        :target="values[0] + 'br'"
        variant="primary">
        {{values[1].krans.slice(0,-2)}}
      </b-tooltip>
    </div>
  </div>

  <div
     class="mt-1 d-flex"
     v-if=FLAG_TERMINAL_2
    >
    <div
     v-for="values in filterTerminal(2)" 
     :key=values[0]
     :id="values[0] + 'br'"
    >
      <div class="text-center mr-2">
        <b-button 
          variant="primary" 
          class="text-lowercase" 
          @click='SET_TERMINALS(values[0])'
          >
          {{values[0]}} <small> пр  </small>
          <b-badge variant="light" size="lg" class="text-lowercase">
            {{separateNumber1(values[1].tons*GET_COEFFICIENT_COAL)}} <small> тн. </small>
          </b-badge>
        </b-button>
      </div>

      <b-tooltip 
        :target="values[0] + 'br'"
        variant="primary"
        placement="bottom"
        >
        {{values[1].krans.slice(0,-2)}}
      </b-tooltip>
    </div>
  </div>
</div>
</template>

<script>

import { separateNumber } from "@/functions/functions";
import { BTooltip } from "bootstrap-vue";
import { BBadge } from 'bootstrap-vue'
import { mapActions, mapGetters } from "vuex";

export default {
  name: "tonsByTerminals",
  data() {
    return {
      limitTurns: 1,
    };
  },
  props: {
  },
  components: {
    BTooltip,
    BBadge,
  }, 
  computed: {
    ...mapGetters([
      "TOTAL_180",
      "FLAG_TERMINAL_1",
      "FLAG_TERMINAL_2",
      "GET_COEFFICIENT_COAL"
    ]),
  },
  methods: {
    ...mapActions([
      "SET_TERMINALS"
    ]),
    separateNumber1(n) {
      return separateNumber(n)
    },
    filterTerminal(t) {
      if (t==1) {
        return Object.entries(this.TOTAL_180)
          .filter(p => p[0] < 70 && p[1].turns > this.limitTurns)
      }
      else if(t==2) {
        return Object.entries(this.TOTAL_180)
          .filter(p => p[0] > 70 && p[1].turns > this.limitTurns)
      }
      else {
        return []
      }
    },
  },
  mounted() {
  },
  watch: {
  },
  updated() {
  },
  beforeDestroy() {
  },
};
</script>


