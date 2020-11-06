<template>
<div>
  <b-sidebar id="sidebar" 
    aria-labelledby="sidebar"
    backdrop
    shadow>
  <template v-slot:default="{ hide }">
      <!-- <div href="/krans" @click="hide">Кран</div> --> 
    <h5 class="text-left ml-3"> Кран  </h5>
    <b-container class="bv-example-row">
      <b-row class='text-left   pr-0'>
        <b-col cols="2">
          <div class='kran-icon-blue mx-auto' />      </b-col>
        <b-col class="my-row">
         Работа на 180°
        </b-col>

        <div class="w-100"></div>
        <b-col cols="2">
          <div class='kran-icon-black mx-auto' />
        </b-col>
        <b-col class="my-row" >
          Работа на 90°
        </b-col>
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='kran-icon-yellow mx-auto' />
        </b-col>
        <b-col class="my-row" >
          Нет поворота
        </b-col>
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='kran-icon-red mx-auto' />
        </b-col>
        <b-col class="my-row" >
          Нет питания
        </b-col  >
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='kran-icon-gray mx-auto' />
        </b-col>
        <b-col class="my-row" >
          Нет питания более 3 часов
        </b-col>
      </b-row>
    </b-container>
    <hr />
    <h5 class="mt-2 text-left ml-3" > Усм  </h5>
    <b-container class="bv-example-row">
      <b-row class='text-left mb-12 align-v="center" '>
        <b-col cols="2" >
          <div class='usm-icon-blue mx-auto' />      </b-col>
        <b-col class="my-row">
         Уголь есть на ленте
        </b-col>
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='usm-icon-yellow mx-auto' />
        </b-col>
        <b-col class="my-row">
          Угля нет на ленте
        </b-col>
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='usm-icon-red mx-auto' />
        </b-col>
        <b-col class="my-row">
          Нет питания
        </b-col>
        <div class="w-100"></div>
        <b-col cols="2">
          <div class='usm-icon-gray' />
        </b-col>
        <b-col class="my-row">
          Нет питания более 3 часов
        </b-col>
      </b-row>
    </b-container>

    <b-button variant="danger" class="mt-4" block @click="hide">Закрыть</b-button>
  </template>
</b-sidebar>
</div>
</template>

<script>
import { BSidebar } from 'bootstrap-vue'
export default {
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
    BSidebar,
  },
}
</script>

<style lang="scss">
.my-row {
  height: 40px;
}
</style>
