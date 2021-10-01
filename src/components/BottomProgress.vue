<template>
  <div>
    <div v-for="mech in KRAN_DATA" :key="mech.id">
      <div
        v-if="SELECTED_FEATURES.includes(mech.id)"
        class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm"
      >
        <kranProgress :mech="mech" />
        <Hours :shift=SHIFT />
      </div>
    </div>
    <div v-for="mech in USM_DATA" :key="mech.id">
      <div
        v-if="SELECTED_FEATURES.includes(mech.id)"
        class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm"
      >
        <usmProgress :mech="mech" />
        <Hours :shift=SHIFT />
      </div>
    </div>
    <div v-for="mech in SENNEBOGEN_DATA" :key="mech.id">
      <div
        v-if="SELECTED_FEATURES.includes(mech.id)"
        class="p-3 p-3 pb-3 pl-3 border rounded bg-light mb-2 ml-2 mr-2 shadow-sm"
      >
        <sennebogenProgress :mech="mech" />
        <Hours :shift=SHIFT />
      </div>
    </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import kranProgress from "@/components/ProgressKran.vue";
import usmProgress from "@/components/ProgressUsm.vue";
import sennebogenProgress from "@/components/ProgressSennebogen.vue";
import Hours from "@/components/Hours.vue";
export default {
  data() {
    return {
      shift: 1
    }
  },
  name: "App",
  components: {
    kranProgress,
    usmProgress,
    sennebogenProgress,
    Hours,
  },
  computed: {
    ...mapGetters([
      "SELECTED_FEATURES",
      "KRAN_DATA",
      "USM_DATA",
      "SENNEBOGEN_DATA",
      "SHIFT",
    ]),
  },
};
</script>

