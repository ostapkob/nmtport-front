<template>
  <div>
    <Mechanisms typeMECH="KRAN" :propsDateShift=dateShift :propsShift=shift> </Mechanisms>
  </div>
</template>

<script>
import Mechanisms from "@/components/Mechanisms";
//const kranProgress = () => import("@/components/ProgressKran");

export default {
  name: "App",
  components: {
    Mechanisms,
  },
  data() {
    return {
      dateShift: "",
      shift: "",
    };
  },
  methods: {
    hendlerRoute()  {
      this.dateShift = this.$route.params.date
      this.shift = this.$route.params.shift
    }
  },
  computed: {},
  created() {
    this.hendlerRoute()
  },
};
</script>

<style lang="scss" scoped>
</style>
