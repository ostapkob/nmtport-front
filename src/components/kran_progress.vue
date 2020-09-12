<template>
    <div class="kran-progress text-left">
        <div class="h5 font-weight-bold"> {{mech.name}} 
            <b-badge variant="primary"> 
                {{ mech.total_180 }}
            </b-badge>
            <b-badge variant="dark" class='ml-1'> 
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
            >
            <div v-show="item.step>25" class="text-left">
                {{item.time}}
            </div>
        </b-progress-bar>
    </b-progress>
    <hr />
</div>

</template>

<script>
export default {
  name: 'KranProgress',
  props: {
    mech: Object
  },
    methods: {
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
.bg-mech {
    margin-top: 20px;
    width: 300px;
    padding:  2px 2px 0px 0px;
    border-radius: 5px;
}
</style>
