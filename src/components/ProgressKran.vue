<template >
    <div class="kran-progress text-left">
        <div class="name-mech"> {{mech.name}} 
            <b-badge v-show='mech.total_180>10' variant="primary"> 
                {{ mech.total_180 }}
            </b-badge>
            <b-badge v-show='mech.total_90>10' variant="dark" class='ml-1'> 
                {{ mech.total_90 }}
            </b-badge>
        </div>

    <div v-for="(item, key) in mech.data" :key=key>
    </div>
    <b-progress class="mt-2" :max="720" show-value>
        <b-progress-bar 
            v-for="(item, key) in mech.data" :key="key" 
            :value=item.step 
            :variant="colorProgress(item.value)"
            :striped="stripedProgress(item.value)"
            :title= "item.value +' + '+ item.step + ' = ' +ff(item.value, item.step) "
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
            returnValue: '-'
        }
    },
    methods: {
        showSteps: function(typeStep, countStep) {
            if (typeStep == 2) {
                this.totalStep_180 += countStep
                return this.totalStep_180.toString() + 'поворотов по 180°'
            }
            if (typeStep == 1) {
                this.totalStep_90_1 += countStep
                return this.totalStep_90_1.toString() + 'поворотов по 90°'
            }
            if (typeStep == 0) {
                return ' Простой'
            }
            if (typeStep == -1) {
                return ' ⚡Нет питания⚡'
            }
            return ''
        },

        ff: function(val, step) {
            let r = val+step
            if (step == 1) {
                r="test"
            }
            else {
                r='www'
            }
            return r.toString()
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
            else if (val==1) {
               resultColor='dark'
            }
            else if (val==2) {
               resultColor='primary'
            }
            else {
            resultColor='danger show-progress'
            }
            return resultColor 
            }
    },
    computed:  {

    },
    mounted() {
        console.log('kran mounted')
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

</style>

