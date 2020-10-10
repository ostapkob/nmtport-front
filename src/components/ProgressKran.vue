<template >
<div class="kran-progress text-left">

  <b-list-group>
  <b-list-group-item class="d-flex  p-0 border-light  bg-light align-items-center">
    <b-avatar 
      class="mr-3" 
      size="sm" 
      variant="secondary"
      rounded="sm"
      > 
    <strong>{{ mech.number }} </strong>
    </b-avatar>     

    <span class="mr-auto">
      <small :class="{'fioBrigada': mech.contract==1, 'fioContract': mech.contract==0}"> {{mech.fio}} </small>
      <small class="time-start-finish" v-if='mech.start'> {{mech.start}} - {{mech.finish}} </small>
    </span>
    <span>
    <b-badge v-show='mech.total_180>9'
      variant="primary"
      v-b-popover.hover.top="'Количество поворотов 180° туда обратно'" 
      >
    <img class="catalog-item-img" 
      :src="require('@/assets/img/ship.png')" 
      height="18" 
      />
      {{ mech.total_180 }}
    </b-badge>
    <b-badge v-show='mech.total_90>3' 
      variant="dark" 
      class='ml-1'
      v-b-popover.hover.top="'Количество поворотов 90° туда обратно'" >
      <img class="catalog-item-img" :src="require('@/assets/img/vagon.png')" height="18" />
      {{ mech.total_90 }}
    </b-badge>
    </span>
  </b-list-group-item>
 </b-list-group>

    <div v-for="(item, key) in mech.data" :key=key />
    <b-progress class="mt-2" :max="719" show-value>
        <b-progress-bar
            v-for="(item, key) in mech.data" :key="key"
            :value=item.step
            :variant="colorProgress(item.value)"
            :striped="stripedProgress(item.value)"
            :id="mech.id+'-'+key"
            >
            <b-tooltip 
              :target="mech.id+'-'+key" 
              :variant="colorProgress(item.value)"
              >
              {{showSteps(item.time, item.value, item.total)}}
            </b-tooltip>
            <div v-show="item.step>25" class="time-in-progress text-left">
                {{item.time}}
            </div>
        </b-progress-bar>
    </b-progress>
</div>
</template>

<script>
export default {
  name: 'KranProgress',
  props: {
    mech: Object
  },
    data() {
        return {
            totalStep_180: 0, // 2
            totalStep_90_1: 0,// 1
            totalStep_90_3: 0, // 3 after
            returnValue: '-',
            s: 1,
        }
    },
    methods: {
        showSteps: function(timeStep, typeStep, totalStep) {
            if (typeStep == 2) {
                return `c ${timeStep} - ${totalStep} поворотов по 180°`
            }
            if (typeStep == 1 || typeStep == 3) {
                return `c ${timeStep} -  ${totalStep} поворотов по 90°`
            }
            if (typeStep == 0) {
                return `c ${timeStep} - Простой`
            }
            if (typeStep == -1) {
                return `c ${timeStep} - Нет питания⚡`
            }
            return ''
        },
        stripedProgress: function(val) {
            if (val==-1) {
                return true
            }
            return false
            },
        colorProgress: function(val) {
            let resultColor='danger';

            if (val==0) {
               resultColor='warning text-dark'
            }
            else if (val==1 || val==3) {
               resultColor='dark'
            }
            else if (val==2) {
               resultColor='primary'
            }
            else {
            resultColor='danger show-progress'
            }
            return resultColor
            },
    },
    computed:  {
    },
    mounted() {
        //console.log('kran mounted')
    }
}
</script>

<style lang="scss">
</style>

