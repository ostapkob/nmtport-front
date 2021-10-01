import { shiftNow, dateNow } from "@/functions/functions";
export default {
  LAST_DATA(state) {
    return state.last_data;
  },
  KRAN_DATA(state) {
    return state.kran_data;
  },
  USM_DATA(state) {
    return state.usm_data;
  },
  SENNEBOGEN_DATA(state) {
    return state.sennebogen_data;
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
  FLAG_EMPTY_MECH(state) {
    return state.flagEmptyMech
  },
  FLAG_NOTIFICATION(state) {
    return state.flagNotification
  },
  TOTAL_180(state) {
    return state.total_terminals_180
  },
  DATE(state) {
    return state.date
  },
  SHIFT(state) {
    return state.shift
  },
  ISNOW(state) {
    return (state.date == dateNow() && state.shift == shiftNow())
  },
  FLAG_2_MAPS(state) {
    return state.flag2Maps
  },
  FLAG_TERMINAL_1(state) {
    return state.flagTerminal1
  },
  FLAG_TERMINAL_2(state) {
    return state.flagTerminal2
  }
}
