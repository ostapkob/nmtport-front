<template >
  <div class="usm-progress text-left">
    <b-list-group>
      <b-list-group-item
        class="d-flex p-0 border-light bg-light align-items-center"
      >
        <div class="number-icon">
          <strong>{{ mech.number }} </strong>
        </div>
        <span class="mr-auto mx-1">
          <b-badge variant="dark ml-1 p-1" :id="mech.id + 'coalTime'">
            {{ mech.time_coal }}
            <b-tooltip :target="mech.id + 'coalTime'" variant="dark">
              <!-- Время нахождения угля на ленте часах -->
              <strong> {{ Math.round(mech.tons_in_hour * mech.time_coal) }} </strong> тонн
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

    <b-progress :max="719" show-value>
      <b-progress-bar
        v-for="(period, keyPeriod) in mech.data"
        :key="keyPeriod"
        :value="period.step"
        :variant="colorProgress(period.value)"
        :striped="stripedProgress(period.value)"
        :id="mech.id + '-' + keyPeriod"
      >
        <b-tooltip 
          v-if="period.step > 2"
          :target="mech.id + '-' + keyPeriod"
          :variant="colorProgress(period.value)"
        >
          {{
            showSteps(
              period,
              timeTo(keyPeriod, mech.data)
            )
          }}
        </b-tooltip>
        <div v-show="period.step > 25" class="time-in-progress text-left">
          {{ period.time }}
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
    return {
      listResons: {
        1:	"1 а/п",
        2	: "перегон",
        3	: "отсутствие грязного, нет крана",
        4	: "отсутствие грязного, нет а/м",
        5	: "нет места под чистый, нет крана",
        6	: "перекрыт ж/д переезд, маневровая работа",
        7	: "поломка а/п",
        8	: "смерзшийся уголь",
        9	: "нет топлива",
        10:	"уголь с вагонов",
        11:	"зачистка бункера",
        12:	"пыление",
        13:	"зона работы крана",
        14:	"ТО",
        15:	"Прочее",
        16:	"магнит",
        17:	"бункер",
        18:	"конвейер",
        19:	"Валки/грохот",
        20:	"передвижение",
        21:	"электрика",
        22:	"перекрыт подъезд к УСМ SENNEBOGEN",
        23:	"перекрыт подъезд к УСМ",
        24:	"зачистка УСМ",
        25:	"подготовка места под УСМ",
        26:	"навешивание пологов",
        27:	"поломка крана",
        28:	"маневровые работы",
        29:	"НМУ",
        30:	"отсутствие груза",
        37: "отсутствие а/п", 
        38: "перерыв", 
        undefined: "не ещё" 
      }
    };
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
    showSteps: function (item, timeTo) {
      let timeStep = item.time
      let typeStep = item.value
      let totalStep = item.time_coal

      if (typeStep == 1 || typeStep == 3) { // ? why 3
        if (totalStep === undefined) {
          return `${timeStep}-${timeTo} - ${this.mech.time_coal} часов уголь на ленте `;
        } else {
          return `${timeStep}-${timeTo} - ${totalStep} часов уголь на ленте `;
        }
      }
      if (typeStep == 0) {
        return `${timeStep}-${timeTo} - Простой`;
      }
      if (typeStep == 2) {
        return `${timeStep}-${timeTo} - Лента крутится без угля`;
      }
      if (typeStep == -1) {
        return `${timeStep}-${timeTo} - нет питания⚡`;
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
      } else if (val > 0.1 && val <= 1) {
        resultColor = "primary";
      } else if (val == 2) {
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
    getIcon(reson) {
      let fileName
      try {
          fileName = require('@/assets/img/resons/'+reson+'.svg')
        } catch (e) {
          fileName = require('@/assets/img/resons/0.svg') // TODO red ?
        }
      return fileName
    }
  },
  computed: {},
  mounted() {
    //console.log('usm mounted')
  },
};
</script>

<style lang="scss">
  .filter-gray{
      filter: invert(25%) sepia(50%); 
  }
</style>

