<template >
  <div class="kran-progress text-left">
    <b-list-group>
      <b-list-group-item
        class="d-flex p-0 border-light bg-light align-items-center"
      >
        <div class="number-icon">
          <strong>{{ mech.number }} </strong>
        </div>
        <span class="mr-auto mx-1">
          <b-badge
            class="mr-1"
            v-show="mech.total_180 > 10"
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
              <!-- Количество циклов 180° --> 
              <strong>{{Math.round(mech.total_180 * mech.grab * GET_COEFFICIENT_COAL)}} </strong>тонн
            </b-tooltip>
          </b-badge>

          <b-badge
            v-show="mech.total_90 > 10"
            variant="dark"
            :id="mech.id + '90'"
          >
            <img
              class="catalog-item-img"
              :src="require('@/assets/img/vagon.png')"
              height="18"
            />
            {{ mech.total_90 }}
            <b-tooltip :target="mech.id + '90'" variant="dark">
              Количество циклов 90° 
            </b-tooltip>
          </b-badge>

          <b-badge
            v-show="mech.total_180 > 10"
            variant="secondary"
            :id="mech.id + 'grab'"
          >
            <b-tooltip :target="mech.id + 'grab'" variant="secondary">
              Обьём грейфера
            </b-tooltip>
          {{ mech.grab}} м<sup>3</sup>
          </b-badge>

        </span >
          <span
            :class="{
              fioBrigada: mech.contract == 1,
              fioContract: mech.contract == 0,
            }"
          >
            {{ mech.fio }}  
          </span>
          <span class="time-start-finish ml-2" v-if="mech.start">
            {{ mech.start }} - {{ mech.finish }}
          </span>
        <span>
        </span>
      </b-list-group-item>
    </b-list-group>

    <!-- <div v-for="(item, key) in mech.data" :key="key" /> -->
    <b-progress :max="719" 
      v-if='mech.resons && Object.keys(mech.resons).length>0'
      show-value>
      <b-progress-bar
        v-for="(reson, keyReson) in mech.resons"
        :key="keyReson+'reson'"
        :value="reson.step"
        variant="light"
        :id="mech.id + 'reson' + keyReson"
      >
          <!-- :src="require('@/assets/img/resons/'+reson.reson+'.svg')" -->
        <img v-if=reson.reson
          class="catalog-item-img"
          :src=getIcon(reson.reson)
          height="14"
        />
        <b-tooltip 
          v-if="reson.reson"
          :target="mech.id + 'reson' + keyReson"
          variant="light text-dark"
        >
        {{ reson.start }}-{{ reson.stop }} - {{ listResons[reson.reson] }}
        </b-tooltip>
      </b-progress-bar>
    </b-progress>
    <div v-else class="text-light m-0 p-0" style="height: 5px">
      <!-- <small>|</small> -->
    </div>


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
            showSteps(
              item.time,
              timeTo(key, mech.data),
              item.value,
              item.total,
              mech.total_180
            )
          }}
        </b-tooltip>
        <div v-show="item.step > 30 && item.value!=5" class="time-in-progress text-left">
          {{ item.time }}
        </div>
      </b-progress-bar>
    </b-progress>

    <Hours :shift="shift" />
  </div>
</template>

<script>
import resonsM from '@/mixins/resonsM'
import { mapGetters } from "vuex";
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
  name: "KranProgress",
  mixins: [resonsM],
  props: {
    mech: Object,
    shift: Number,
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
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      "GET_COEFFICIENT_COAL"
    ]),
  },
  methods: {
    showSteps: function (timeStep, timeTo, typeStep, totalStep, total_180) {
      if (typeStep == 2) {
        if (totalStep === undefined) {
          totalStep = total_180;
        }
        return `${timeStep}-${timeTo} - ${totalStep} поворотов по 180°`;
      }
      if (typeStep == 1 || typeStep == 3) {
        return `${timeStep}-${timeTo} - ${totalStep}  поворотов по 90°`;
      }
      if (typeStep == 0) {
        return `${timeStep}-${timeTo} - простой`;
      }
      if (typeStep == 5) {
        return `${timeStep}-${timeTo} - вращение колонны`;
      }
      if (typeStep == -1) {
        return `${timeStep}-${timeTo} - нет питания⚡`;
      }
      return "";
    },
    stripedProgress: function (val) {
      if (val==0 || val == -1) {
        return true;
      }
      return false;
    },
    colorProgress: function (val) {
      let resultColor = "danger";

      if (val == 0) {
        resultColor = "success text-dark";
      } else if (val == 1 || val == 3) {
        resultColor = "dark";
      } else if (val == 2) {
        resultColor = "primary";
      } else if (val == 5) {
        resultColor = "warning show-progres text-dark";
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
};
</script>

<style lang="scss">
</style>

