<template>
  <div class="w-76 mt-3 mr-3 ml-3">
        <!-- <b-calendar --> 
        <!--   v-model="value" -->
        <!--   @context="onContext" -->
        <!--   start-weekday=1 -->
        <!--   locale="ru-RU" -->
        <!--   > -->
        <!-- </b-calendar> -->

        <b-form-datepicker 
          id="choose-date" 
          v-model="date" 
          class="mb-2"
          placeholder="Выбери дату"
          locale="ru-RU"
          start-weekday=1
          ></b-form-datepicker>
        <!-- <label for="choose-shif">Choose a date</label> -->
        <b-form-radio-group 
          id="choose-shift" 
          v-model="shift" 
          aria-controls="ex-disabled-readonly"
          >
          <b-form-radio value=1> День </b-form-radio> 
          <b-form-radio value=2> Ночь </b-form-radio>
        </b-form-radio-group>
        <hr />
        <!-- <label for="choose-type-mech">Choose a date</label> -->
        <b-form-radio-group 
          id="choose-type-mech" 
          v-model="type_mech" 
          aria-controls="ex-disabled-readonly"
          >
          <b-form-radio value='kran'> Кран </b-form-radio> 
          <b-form-radio value='usm'> УСМ </b-form-radio>
        </b-form-radio-group>
        <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title"> Ok </b-button>
        <br />
        Пока не работает
</div>
</template>

<script>
import { BFormDatepicker } from 'bootstrap-vue'
import { BFormRadioGroup, BFormRadio  } from 'bootstrap-vue'
//import { BPopover } from 'bootstrap-vue'
export default {
  data() {
    return {
    date: '',
    shift: 1,
    type_mech: '',
    }
  },
  methods: {
    onContext(ctx) {
    this.context = ctx
    },
  },
  components: {
    BFormDatepicker,
    BFormRadioGroup,
    BFormRadio,
    //BPopover 
  },
}
</script>

<style lang="scss">
.kran-icon-blue, 
.kran-icon-yellow, 
.kran-icon-red,
.kran-icon-black,
.kran-icon-gray,
.usm-icon-blue, 
.usm-icon-yellow, 
.usm-icon-red,
.usm-icon-black,
.usm-icon-gray 
{
  margin-top: 5px;
  position: static;
}
.legend {
  white-space: pre;
  background: #ffe;
  
}
</style>
