<template>
  <div>
    <h5>{{ msg }}</h5>
      <div>
        <div class="m-3">
          <span
            v-for="(val, terminal) in getPlacement" 
            :key=terminal
            >
            <b-card-group deck class="mb-3">
              <b-card
                header-bg-variant="info"
                header-text-variant="white"
                :header='String(terminal) + " причал" '
                class="jorder rounded bg-light mb-2 shadow-sm"
                v-show="val.kran>0 || val.usm>0"
              >
                <b-card-text> {{val.kran}} - кран </b-card-text>
                <b-card-text> {{val.usm}} - УСМ </b-card-text>
              </b-card>
            </b-card-group>
          </span>
        </div>
      </div>
  <div>
  </div>

  </div>
</template>

<script>

            //v-show="getPlacement[13].kran!=0 || getPlacement[13].usm!=0"
import { BCard, BCardGroup, BCardText } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";
//import { BOverlay } from 'bootstrap-vue'
export default {
  name: "HelloWorld",
  components: {
    BCard,
    BCardGroup,
    BCardText,
   // BOverlay,
  },
  data() {
    return {
      //  placement: {},
      message: '123'
    };
  },
  props: {
    msg: String,
  },
  methods: {
    ...mapActions([
      "GET_LAST_DATA",
    ]),
  },
  computed: {
    ...mapGetters(["LAST_DATA"]),
    getPlacement: function() {
      let placement = {
        9:  { usm: 0, kran: 0, sennebogen: 0 },
        11: { usm: 0, kran: 0, sennebogen: 0 },
        12: { usm: 0, kran: 0, sennebogen: 0 },
        13: { usm: 0, kran: 0, sennebogen: 0 },
        15: { usm: 0, kran: 0, sennebogen: 0 },
        71: { usm: 0, kran: 0, sennebogen: 0 },
        73: { usm: 0, kran: 0, sennebogen: 0 },
        74: { usm: 0, kran: 0, sennebogen: 0 },
        75: { usm: 0, kran: 0, sennebogen: 0 },
        76: { usm: 0, kran: 0, sennebogen: 0 },
        78: { usm: 0, kran: 0, sennebogen: 0 },
      };
      let data = this.LAST_DATA;
      for (let mech in data) {
        if (data[mech].state != "long_no_power" && data[mech].terminal) {
          placement[data[mech].terminal][data[mech].type]++;
        }
      }
      return placement
    },
  },
  mounted() {
  },
  watch: {
    placement: function() {

  }
  }
};
</script>
