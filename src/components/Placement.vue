<template>
  <div>
    <h5>{{ msg }}</h5>
    <div>
      <div class="m-3">
        <b-overlay
          :show="getPlacement[9].kran==0 && getPlacement[11].kran==0 && getPlacement[13].kran==0"
          spinner-variant="primary"
          spinner-type="grow"
          spinner-small
          rounded="lg"
        >
        <b-card-group deck class="mb-3">
          <b-card
            header-bg-variant="info"
            header-text-variant="white"
            header="8-9 причал"
            class="jorder rounded bg-light mb-2 shadow-sm"
          >
            <b-card-text> {{getPlacement[9].kran}}  кранов </b-card-text>
            <b-card-text> {{getPlacement[9].usm}}  УСМ </b-card-text>
          </b-card>

          <b-card
            header-bg-variant="info"
            header-text-variant="white"
            header="10-11 причал"
            class="jorder rounded bg-light mb-2 shadow-sm"
          >
            <b-card-text> {{getPlacement[11].kran}}  кранов </b-card-text>
            <b-card-text> {{getPlacement[11].usm}}  УСМ </b-card-text>
          </b-card>

          <b-card
            header-bg-variant="info"
            header-text-variant="white"
            header="12-14 причал"
            class="jorder rounded bg-light mb-2 shadow-sm"
          >
            <b-card-text> {{getPlacement[13].kran}}  кранов </b-card-text>
            <b-card-text> {{getPlacement[13].usm}}  УСМ </b-card-text>
          </b-card>
        </b-card-group>
        </b-overlay>
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
import { BOverlay } from 'bootstrap-vue'
export default {
  name: "HelloWorld",
  components: {
    BCard,
    BCardGroup,
    BCardText,
    BOverlay,
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
        13: { usm: 0, kran: 0, sennebogen: 0 },
        15: { usm: 0, kran: 0, sennebogen: 0 },
      };
      let data = this.LAST_DATA;
      for (let mech in data) {
        if (data[mech].state != "long_no_power") {
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
