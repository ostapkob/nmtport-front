<template >
  <div class="kran-progress text-left">
    <b-list-group>
      <b-list-group-item
        class="d-flex p-0 border-light bg-light align-items-center"
      >
        <div class="icon-kran">
          <strong>{{ mech.number }} </strong>
        </div>
        <span class="mr-auto">
          <small
            :class="{
              fioBrigada: mech.contract == 1,
              fioContract: mech.contract == 0,
            }"
          >
            {{ mech.fio }}
          </small>
          <small class="time-start-finish" v-if="mech.start">
            {{ mech.start }} - {{ mech.finish }}
          </small>
        </span>
        <span>
          <b-badge
            v-show="mech.total_180 > 9"
            variant="primary"
            :id="mech.id + '180'"
          >
            <img
              class="catalog-item-img"
              :src="require('@/assets/img/ship.png')"
              height="18"
            />
            {{ mech.total_180 }}

            <b-tooltip :target="mech.id + '180'" variant="primary">
              Количество поворотов 180° туда обратно
            </b-tooltip>
          </b-badge>

          <b-badge
            v-show="mech.total_90 > 13"
            variant="dark"
            :id="mech.id + '90'"
            class="ml-1"
          >
            <img
              class="catalog-item-img"
              :src="require('@/assets/img/vagon.png')"
              height="18"
            />
            {{ mech.total_90 }}
            <b-tooltip :target="mech.id + '90'" variant="dark">
              Количество поворотов 90° туда обратно
            </b-tooltip>
          </b-badge>
        </span>
      </b-list-group-item>
    </b-list-group>

    <div v-for="(item, key) in mech.data" :key="key" />
    <b-progress class="mt-2" :max="719" show-value>
      <b-progress-bar
        v-for="(item, key) in mech.data"
        :key="key"
        :value="item.step"
        :variant="colorProgress(item.value)"
        :striped="stripedProgress(item.value)"
        :id="mech.id + '-' + key"
      >
        <b-tooltip
          :target="mech.id + '-' + key"
          :variant="colorProgress(item.value)"
        >
          {{
            showSteps(item.time, timeTo(key, mech.data), item.value, item.total, mech.total_180)
          }}
        </b-tooltip>
        <div v-show="item.step > 20" class="time-in-progress text-left">
          {{ item.time }}
        </div>
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
import {
  BTooltip,
  BBadge,
  BProgress,
  BProgressBar,
  BListGroup,
  BListGroupItem,
} from "bootstrap-vue";

export default {
  name: "KranProgress",
  props: {
    mech: Object,
  },
  components: {
    BProgress,
    BProgressBar,
    BTooltip,
    BBadge,
    BListGroup,
    BListGroupItem,
  },
  data() {
    return {
      totalStep_180: 0, // 2
      totalStep_90_1: 0, // 1
      totalStep_90_3: 0, // 3 after
      returnValue: "-",
      s: 1,
    };
  },
  methods: {
    showSteps: function (timeStep, timeTo, typeStep, totalStep, total_180) {
      if (typeStep == 2) {
        if (totalStep === undefined) {totalStep=total_180}
        return `c ${timeStep} - ${totalStep} поворотов по 180°`;
      }
      if (typeStep == 1 || typeStep == 3) {
        return `c ${timeStep} -  ${totalStep} поворотов по 90°`;
      }
      if (typeStep == 0) {
        return `c ${timeStep} по ${timeTo} - Простой`;
      }
      if (typeStep == -1) {
        return `c ${timeStep}  по ${timeTo} - Нет питания⚡`;
      }
      return "";
    },
    stripedProgress: function (val) {
      if (val == -1) {
        return true;
      }
      return false;
    },
    colorProgress: function (val) {
      let resultColor = "danger";

      if (val == 0) {
        resultColor = "warning text-dark";
      } else if (val == 1 || val == 3) {
        resultColor = "dark";
      } else if (val == 2) {
        resultColor = "primary";
      } else {
        resultColor = "danger show-progress";
      }
      return resultColor;
    },
    timeTo(key, data) {
      let newKey = parseInt(key) + 1;
      return data[newKey] === undefined ? "" : data[newKey]["time"];
    },
  },
  computed: {},
  mounted() {
    //console.log('kran mounted')
  },
};
</script>

<style lang="scss">
</style>

