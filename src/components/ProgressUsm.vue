<template >
    <div class="usm-progress text-left">


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
    <span class="text-left">
      <b-badge variant="dark ml-2"
       v-b-popover.hover.top="'Время нахождения угля на ленте'" 
        > 
          {{ mech.time_coal }}
      </b-badge>
      <b-badge variant="primary ml-2"
       v-b-popover.hover.top="'Время работы в минутах'" 
        > 
          {{ mech.work_time }}
      </b-badge>
      <b-badge variant="warning ml-2"
       v-b-popover.hover.top="'Время простоя в минутах'" 
        > 
          {{ Math.round((mech.total_time - mech.work_time)*10)/10 }}
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
              {{showSteps(item.time, item.value, item.time_coal)}}
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
  name: 'UsmProgress',
  props: {
    mech: Object
  },
    data() {
        return {
        }
    },
    methods: {
        showSteps: function(timeStep, typeStep, totalStep) {
            if (typeStep == 1 || typeStep == 3) {
                return `c ${timeStep} -  ${totalStep} часов уголь на ленте `
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
          else if (val>0.1) {
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
        //console.log('usm mounted')
    }
}
</script>

<style lang="scss">
</style>

