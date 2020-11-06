export default {
    SET_LAST_DATA_TO_STATE: (state, values) => {
      state.last_data = values;
    },
    SET_KRANS_DATA_TO_STATE: (state, values) => {
      state.krans_data = values;
    },
    SET_USM_DATA_TO_STATE: (state, values) => {
      state.usm_data = values;
    },
    SET_SELECTED_FEATURES_TO_STATE: (state, values) => {
      state.selectedFeatures = values
    },
    ERROR_STATE_LAST_DATA: (state) => {
      state.errored_last_data = true;
    },
    CHANGE_KRANS_API: (state, date_shift) => {
      let date = date_shift[0]
      let shift = date_shift[1]
      state.kran_api = state.ip + '/api/v1.0/get_data_period_with_fio/kran/' + date + '/' + shift
    },
    CHANGE_USM_API: (state, date_shift) => {
      let date = date_shift[0]
      let shift = date_shift[1]
      state.usm_api = state.ip + '/api/v1.0/get_data_period_with_fio/usm/' + date + '/' + shift
    },
    CHANGE_IP: (state) => {
      state.last_data_api = state.ip + '/api/v1.0/get_all_last_data_state'
      state.kran_api = state.ip + '/api/v1.0/get_data_period_with_fio_now/kran'
      state.usm_api = state.ip + '/api/v1.0/get_data_period_with_fio_now/usm'
      //  console.log('CHANGE_IP')
    },

}
