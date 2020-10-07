<template >
    <div class="usm-progress text-left">
      <div class="name-mech"> {{mech.name}} 
          <small :class="{'fioBrigada': mech.contract==1, 'fioContract': mech.contract==0}"> {{mech.fio}} </small>
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
            <b-badge variant="info ml-2"
             v-b-popover.hover.top="'Общее время работы (время работы + простои) в минутах'" 
              > 
                {{ mech.total_time }}
            </b-badge>
            <small class="time"> {{mech.start}} - {{mech.finish}} </small>
        </div>

    <div v-for="(item, key) in mech.data" :key=key>
    </div>
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
            //title="'c ' + item.time + ' | ' + showSteps(item.value, item.step)"
            //:title= "item.value +' + '+ item.step + ' = ' +ff(item.value, item.step) "
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

    .tab-title-class {
        color: #FF0000 !important;  
    }
    .bg-tit {
        background-color: #blue;
        background: #blue;
        color: #red;
    }
    .bg-title {
        background-color: #blue;
    }
    .fioBrigada {
      color: #666;
      font-size: 0.7em;
    }
    .fioContract {
      color: blue;
      font-size: 0.7em;
    }
    .time {
      color: #666;
      font-size: 0.7em;
      padding: 0 5px  0 5px;
    }

</style>

