<template>
  <div>
      <div  class="time-line-mechUp">
        <span  v-for="(hour, keyH) in arrows" :key=keyH> {{hour}} </span>
      </div>
      <div  class="time-line-mech" v-if="shift==1">
        <span  v-for="(hour, keyH) in hours_08_20" :key=keyH> {{hour}} </span>
      </div>

      <div  class="time-line-mech" v-if="shift==2">
        <span  v-for="(hour, keyH) in hours_20_08" :key=keyH> {{hour}} </span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    shift: Number,
  },
  data() {
    return {
    //hours_08_20: ["┃", "09", "10",   "╹","11", "12", "13", "14", "15", "16", "17", "18", "19",  "┃"], 
    //hours_20_08: ["┃", "21", "22",   "╹","23", "00", "01", "02", "03", "04", "05", "06", "07",  "┃"]
    arrows: [
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵", 
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵", 
    "┃", "╵","╹","╵", 
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵",
    "┃", "╵","╹","╵", 
    "┃ "],
    hours_08_20: ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",  "20"], 
    hours_20_08: ["20", "21", "22", "23", "00", "01", "02", "03", "04", "05", "06", "07",  "08"]
    }
  }
}
</script>
