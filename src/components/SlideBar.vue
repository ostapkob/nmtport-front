<template>
  <div>
    <b-sidebar id="sidebar" aria-labelledby="sidebar" no-header backdrop shadow>
      <template #default="{ hide }">
        <!-- <div href="/krans" @click="hide">Кран</div> -->
        <h5 class="text-left ml-3">Кран</h5>
        <b-container class="bv-example-row">
          <b-row class="text-left pr-0">
            <b-col cols="2">
              <div class="kran-icon-blue mx-auto" />
            </b-col>
            <b-col class="my-row"> Работа на 180° </b-col>

            <div class="w-100"></div>
            <b-col cols="2">
              <div class="kran-icon-black mx-auto" />
            </b-col>
            <b-col class="my-row"> Работа на 90° </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="kran-icon-yellow mx-auto" />
            </b-col>
            <b-col class="my-row"> Нет поворота </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="kran-icon-red mx-auto" />
            </b-col>
            <b-col class="my-row"> Нет питания </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="kran-icon-gray mx-auto" />
            </b-col>
            <b-col class="my-row"> Нет питания более 3 часов </b-col>
          </b-row>
        </b-container>
        <hr />
        <h5 class="mt-2 text-left ml-3">Усм</h5>
        <b-container class="bv-example-row">
          <b-row class="text-left mb-12 align-v=&quot;center&quot;">
            <b-col cols="2"> <div class="usm-icon-blue mx-auto" /> </b-col>
            <b-col class="my-row"> Уголь есть на ленте </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="usm-icon-yellow mx-auto" />
            </b-col>
            <b-col class="my-row"> Угля нет на ленте </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="usm-icon-red mx-auto" />
            </b-col>
            <b-col class="my-row"> Нет питания </b-col>
            <div class="w-100"></div>
            <b-col cols="2">
              <div class="usm-icon-gray" />
            </b-col>
            <b-col class="my-row"> Нет питания более 3 часов </b-col>
          </b-row>
        </b-container>
        <!-- <small class='text-left ml-1'>
      На механизмы можно кликать, если нужно выбрать несколько, кликайте с зажатой клавишей Shift
    </small> -->
        <hr />
        <h5 class="text-left ml-3">Фильтры</h5>
        <b-form-group class="text-left ml-4" v-slot="{ ariaDescribedby }">
          <b-form-checkbox-group
            v-model="selected"
            :options="options"
            :aria-describedby="ariaDescribedby"
            name="flavour-2a"
            stacked
          ></b-form-checkbox-group>
        </b-form-group>
        <!-- {{selected}} <br/>
    {{FILTER_LAST_DATA}} -->
        <b-button variant="danger" class="mt-4 mb-4" block @click="hide"
          >Закрыть</b-button
        >
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { BSidebar } from "bootstrap-vue";
import { BFormGroup, BFormCheckboxGroup } from "bootstrap-vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      selected: [],
      options: [
        { text: "Краны", value: "kran" },
        { text: "УСМ", value: "usm" },
        { text: "Сeннебогены", value: "sennebogen" },
        { text: "Только работающие", value: "long_no_power" },
      ],
    };
  },
  computed: {
    ...mapGetters(["FILTER_LAST_DATA"]),
  },
  methods: {
    ...mapActions(["SET_FILTER_LAST_DATA", "GET_LAST_DATA"]),
  },
  components: {
    BSidebar,
    BFormGroup,
    BFormCheckboxGroup,
  },
  mounted() {
    // this.SET_FILTER_LAST_DATA(['usm', 'kran'])
    this.selected = this.FILTER_LAST_DATA;
  },
  watch: {
    selected: function () {
      if (typeof this.selected === "string") {
        this.selected = this.selected.split(",");
      }
      this.GET_LAST_DATA();
      this.SET_FILTER_LAST_DATA(this.selected);
    },
  },
};
</script>

<style lang="scss">
.my-row {
  height: 40px;
}
</style>
