<template>
  <div>
    {{ card }}
    {{ item }}
    <input v-model="item" /> 
    <b-button @click="addToCard(item)" class="bg-info"> Click </b-button>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {},
  data() {
    return {
      msg: "",
      card: "",
      item: ""
    };
  },
  methods: {
    addToCard(item) {
      if (this.cart[item])  {
        this.cart[item].qnt++
      }
      else {
        this.cart[item]= {
          qnt: 1
        }
      }
    }
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>
