<template >
    <div class="kran-progress text-left">
        <div class="name-mech"> {{mech.name}}
            <small class="fio"> {{mech.fio}} </small>
            <b-badge v-show='mech.total_180>9'
              variant="primary"
             v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title" 
              >
                <img class="catalog-item-img" 
                :src="require('@/assets/img/ship.png')" 
                height="18" 
                />
                {{ mech.total_180 }}
            </b-badge>
            <b-badge v-show='mech.total_90>3' variant="dark" class='ml-1'>
                <img class="catalog-item-img" :src="require('@/assets/img/vagon.png')" height="18" />
                {{ mech.total_90 }}
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
             v-b-popover.hover.top="showSteps(item.time, item.value, item.total)" 
            :popover-style="{background: '#fff'}"
            title="title" 
            >
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
    .fio {
      color: #666;
      font-size: 0.7em;
    }
    .time {
      color: #666;
      font-size: 0.7em;
      padding: 0 5px  0 5px;
    }

</style>

