<template>
  <div class="w-76 mt-3 mr-3 ml-3">
        <!-- <b-calendar --> 
        <!--   v-model="value" -->
        <!--   @context="onContext" -->
        <!--   start-weekday=1 -->
        <!--   locale="ru-RU" -->
        <!--   > -->
        <!-- </b-calendar> -->

              <b-form-datepicker 
                id="choose-date" 
                v-model="date" 
                class="mb-2"
                placeholder="Выбери дату"
                locale="ru-RU"
                start-weekday=1
                ></b-form-datepicker>
        <!-- <label for="choose-shif">Choose a date</label> -->
        <b-form-radio-group 
          id="choose-shift" 
          v-model="shift" 
          aria-controls="ex-disabled-readonly"
          >
          <b-form-radio value=1> День </b-form-radio> 
          <b-form-radio value=2> Ночь </b-form-radio>
        </b-form-radio-group>
        <hr />
        <!-- <label for="choose-type-mech">Choose a date</label> -->
        <b-form-radio-group 
          id="choose-type-mech" 
          v-model="type_mech" 
          aria-controls="ex-disabled-readonly"
          >
          <b-form-radio value='kran'> Кран </b-form-radio> 
          <b-form-radio value='usm'> УСМ </b-form-radio>
        </b-form-radio-group>
        <b-button v-b-popover.hover.top="'I am popover directive content!'" title="Popover Title"> Ok </b-button>
        <br />




    <b-button v-b-toggle.sidebar-no-header>Toggle Sidebar</b-button>
        <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" no-header shadow>
                                                <template v-slot:default="{ hide }">
                                                          <div class="p-3">
                                                                      <h4 id="sidebar-no-header-title">Custom header sidebar</h4>
                                                                                <p>
                                                                                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                                                                                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                                                                                                  </p>
                                                                                                                            <nav class="mb-3">
                                                                                                                                          <b-nav vertical>
                                                                                                                                                          <b-nav-item active @click="hide">Active</b-nav-item>
                                                                                                                                                                        <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
                                                                                                                                                                                      <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item>
                                                                                                                                                                                                  </b-nav>
                                                                                                                                                                                                            </nav>
                                                                                                                                                                                                                      <b-button variant="primary" block @click="hide">Close Sidebar</b-button>
                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                    </template>
                                                                                                                                                                                                                                        </b-sidebar>









  </div>
</template>

<script>
export default {
  data() {
    return {
    date: '',
    shift: 1,
    type_mech: '',
  }
  },
  methods: {
    onContext(ctx) {
    this.context = ctx
  }
  }
}
</script>
