<template >
  <div class="usm-progress text-left">
    <b-list-group>
      <b-list-group-item
        class="d-flex p-0 border-light bg-light align-items-center"
      >
        <div class="icon-usm">
          <strong>{{ mech.number }} </strong>
        </div>
        <span class="mr-auto mx-1">
          <b-badge variant="dark ml-1 p-1" :id="mech.id + 'coalTime'">
            {{ mech.time_coal }}
            <b-tooltip :target="mech.id + 'coalTime'" variant="dark">
              Время нахождения угля на ленте часах
            </b-tooltip>
          </b-badge>
          <b-badge variant="primary ml-1 p-1" :id="mech.id + 'workTime'">
            {{ mech.work_time }}
            <b-tooltip :target="mech.id + 'workTime'" variant="primary">
              Время работы в часах
            </b-tooltip>
          </b-badge>
          <b-badge variant="success text-dark ml-1 p-1" :id="mech.id + 'notWork'">
            {{ Math.round((mech.total_time - mech.work_time) * 10) / 10 }}
            <b-tooltip :target="mech.id + 'notWork'" variant="warning">
              Время простоя в часах
            </b-tooltip>
          </b-badge>
        </span>
          <small
            :class="{
              fioBrigada: mech.contract == 1,
              fioContract: mech.contract == 0,
            }"
          >
            {{ mech.fio }}
          </small>
          <small class="time-start-finish ml-2" v-if="mech.start">
            {{ mech.start }} - {{ mech.finish }}
          </small>
        <span class="text-left">
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
          v-if="item.step > 5"
          :target="mech.id + '-' + key"
          :variant="colorProgress(item.value)"
        >
          {{
            showSteps(
              item.time,
              timeTo(key, mech.data),
              item.value,
              item.time_coal
            )
          }}
        </b-tooltip>
        <div v-show="item.step > 25" class="time-in-progress text-left">
          {{ item.time }}
        </div>
      </b-progress-bar>
    </b-progress>
    <Hours :shift="shift" />
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
const Hours = () => import("@/components/Hours");

export default {
  name: "UsmProgress",
  props: {
    mech: Object,
    shift: Number,
  },
  data() {
    return {};
  },
  components: {
    BProgress,
    BProgressBar,
    BTooltip,
    BBadge,
    BListGroup,
    BListGroupItem,
    Hours,
  },
  methods: {
    showSteps: function (timeStep, timeTo, typeStep, totalStep) {
      if (typeStep == 1 || typeStep == 3) {
        if (totalStep === undefined) {
          return `c ${timeStep} -  ${this.mech.time_coal} часов уголь на ленте `;
        } else {
          return `c ${timeStep} - ${totalStep} часов уголь на ленте `;
        }
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
      if (val == -1 || val == 0) {
        return true;
      }
      return false;
    },
    colorProgress: function (val) {
      let resultColor = "danger";

      if (val == 0) {
        resultColor = "success text-dark";
      } else if (val > 0.1) {
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
    //console.log('usm mounted')
  },
};
</script>

<style lang="scss">
</style>

