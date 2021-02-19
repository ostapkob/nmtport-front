export default {
  LAST_DATA(state) {
    //console.log(state.ip)
    // console.log('last_data getters', state.last_data);
    return state.last_data;
  },
  KRAN_DATA(state) {
    console.log('->  kran  getters', state.kran_api);
    return state.kran_data;
  },
  USM_DATA(state) {
    // console.log('->  usm  getters', state.usm_api);
    return state.usm_data;
  },
  SELECTED_FEATURES(state) {
    return state.selectedFeatures
  },
  FILTER_LAST_DATA(state) {
    return state.mechFilter
  },
  FLAG_AUDIO(state) {
    return state.flagAudio
  },
  FLAG_NOTIFICATION(state) {
    return state.flagNotification
  }
}
