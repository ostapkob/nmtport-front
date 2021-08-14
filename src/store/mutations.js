import { shiftNow, dateNow } from "@/functions/functions";

export default {
  SET_LAST_DATA_TO_STATE: (state, values) => {
    if (state.mechFilter) {
      for (let mech in values) {
        if (values[mech].name) { // ? because i get html and object
          if (
            !state.mechFilter.includes(values[mech].state) &&
            state.mechFilter.includes(values[mech].type)
          ) {
            values[mech]['filter'] = true
          } else {
            values[mech]['filter'] = false
          }
        }
      }
    }
    state.last_data = values;
  },

  SET_STATE_FROM_LOCALSTORAGE: (state) => { //filter and flag
    state.mechFilter = localStorage.getItem('mechFilter')
    state.flagAudio = localStorage.getItem('flagAudio') == 'true'
    state.flagEmptyMech = localStorage.getItem('flagEmptyMech') == 'true'
    state.flagNotification = localStorage.getItem('flagNotification') == 'true'
  },
  SET_KRAN_DATA_TO_STATE: (state, values) => {
    state.kran_data = values;
  },
  SET_USM_DATA_TO_STATE: (state, values) => {
    state.usm_data = values;
  },
  SET_SENNEBOGEN_DATA_TO_STATE: (state, values) => {
    state.sennebogen_data = values;
  },
  SET_SELECTED_FEATURES_TO_STATE: (state, values) => {
    state.selectedFeatures = values
  },
  SET_FILTER_LAST_DATA_TO_STATE: (state, values) => {
    state.mechFilter = values
    localStorage.setItem('mechFilter', state.mechFilter)
  },
  SET_FILTER_LAST_DATA({
    commit
  }, value) {
    commit('SET_FILTER_LAST_DATA_TO_STATE', value);
  },
  SET_FILTER_LAST_DATA_FROM_LOCALSTORAGE({
    commit
  }) {
    commit('SET_STATE_FROM_LOCALSTORAGE');
  },

  SET_FLAG_AUDIO_TO_STATE: (state, flag) => {
    state.flagAudio = flag;
    localStorage.setItem('flagAudio', state.flagAudio)
  },
  SET_FLAG_EMPTY_MECH_TO_STATE: (state, flag) => {
    state.flagEmptyMech = flag;
    localStorage.setItem('flagEmptyMech', state.flagEmptyMech)
  },
  SET_FLAG_NOTIFICATION_TO_STATE: (state, flag) => {
    state.flagNotification = flag;
    localStorage.setItem('flagNotification', state.flagNotification)
  },

  SET_TOTAL_180_TO_STATE: (state, values) => {
    // i don't do it in backend
    let total_terminals_180 = {}
    for (let mech in values) { // create zero object
      if (values[mech].total_terminals_180) {
        for (let terminal in values[mech].total_terminals_180) {
          if (!total_terminals_180[terminal]) {
            total_terminals_180[terminal] = {}
              total_terminals_180[terminal] = {
                'turns':0,
                'tons':0,
                'krans': [],
              }
            }
          }
        }
      }
    for (let mech in values) { // fill object 
      if (values[mech].total_terminals_180) {
        for(let terminal in values[mech].total_terminals_180) {
            if (terminal == "9" && ![47, 54, 14, 16, 82].includes(+mech)){
              continue
            }
            total_terminals_180[terminal]['turns'] += values[mech].total_terminals_180[terminal]
            total_terminals_180[terminal]['tons'] += values[mech].total_terminals_180[terminal]*values[mech].grab
            total_terminals_180[terminal]['krans'] += values[mech].number + ", " 
        }
      }
    }
    state.total_terminals_180 = total_terminals_180;
  },
  HASH_KRAN: (state) => {// not use
    if (state.kran_api) {
      return sessionStorage.getItem(state.kran_api)
    }
    else {
      return sessionStorage.setItem(state.kran_api, JSON.stringify(state.kran_data))
    }
  },
  ERROR_STATE_LAST_DATA: (state) => {
    state.errored_last_data = true;
  },
  CHANGE_KRAN_API: (state, date_shift) => {
      let date = date_shift[0]
      let shift = date_shift[1]
      state.kran_api = state.ip + '/api/v2.0/get_data_period_with_fio/kran/' + date + '/' + shift
  },
  CHANGE_USM_API: (state, date_shift) => {
    let date = date_shift[0]
    let shift = date_shift[1]
    state.usm_api = state.ip + '/api/v2.0/get_data_period_with_fio/usm/' + date + '/' + shift
  },
  CHANGE_SENNEBOGEN_API: (state, date_shift) => {
    let date = date_shift[0]
    let shift = date_shift[1]
    state.sennebogen_api = state.ip + '/api/v2.0/get_data_period_with_fio/sennebogen/' + date + '/' + shift
  },
  CHANGE_IP: (state) => {
    state.last_data_api = state.ip + '/api/v2.0/get_all_last_data_state'
    state.usm_api = state.ip + '/api/v2.0/get_data_period_with_fio/usm/' + dateNow() + '/' + shiftNow()
    state.kran_api = state.ip + '/api/v2.0/get_data_period_with_fio/kran/' + dateNow() + '/' + shiftNow()
    state.sennebogen_api = state.ip + '/api/v2.0/get_data_period_with_fio/sennebogen/' + dateNow() + '/' + shiftNow()
    // state.kran_api = state.ip + '/api/v2.0/get_data_period_with_fio_now/kran'
    // state.usm_api = state.ip + '/api/v2.0/get_data_period_with_fio_now/usm'
  },
  CHANGE_DATE_SHIFT: (state, date_shift) => {
    state.date = date_shift[0]
    state.shift = date_shift[1]
  },
}
