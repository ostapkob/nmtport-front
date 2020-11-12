export default {
    LAST_DATA(state) {
      //console.log(state.ip)
      //console.log('store last_data getters');
        return state.last_data;
    },
    KRANS_DATA(state) {
      // console.log('store kran  getters');
        return state.krans_data;
    },
    USM_DATA(state) {
      // console.log('store usm  getters');
        return state.usm_data;
    },
    SELECTED_FEATURES(state) {
      return state.selectedFeatures
    },
}
