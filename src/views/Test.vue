<template>
  <div>
    {{ card }}
    {{ item }}
    <input v-model="item" /> 
    <b-button @click="addToCard(item)" class="bg-info"> Click </b-button>
    <div style="background: #aaa">
      sennebogen
      <div class="sennebogen-icon-blue" style="left: 40px">
        {{ 2 }}
      </div>
      <div class="sennebogen-icon-red" style="left: 80px">
        {{ 3 }}
      </div>
      <div class="sennebogen-icon-yellow" style="left: 120px">
        {{ 4 }}
      </div>
      <div class="sennebogen-icon-gray" style="left: 160">
        {{ 5 }}
      </div>
    </div>
    <div style="background: #aaa; margin-top: 200px">
      kran
      <div class="kran-icon-blue" style="left: 30px">
        {{ 6 }}
      </div>
      <div class="kran-icon-red" style="left: 60px">
        {{ 7 }}
      </div>
      <div class="kran-icon-yellow" style="left: 90px">
        {{ 8 }}
      </div>
      <div class="kran-icon-gray" style="left: 120">
        {{ 2 }}
      </div>
    </div>
    <div style="background: #aaa; margin-top: 200px">
      usm
      <div class="usm-icon-blue" style="left: 30px">
        {{ 1 }}
      </div>
      <div class="usm-icon-red" style="left: 60px">
        {{ 2 }}
      </div>
      <div class="usm-icon-yellow" style="left: 90px">
        {{ 1 }}
      </div>
      <div class="usm-icon-gray" style="left: 120">
        {{ 4 }}
      </div>
    </div>
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
  body {
    color: #ccc;
  }
</style>
