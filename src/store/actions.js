import axios from 'axios'
export default {
    GET_IP({
        commit
    }) {
        commit('CHANGE_IP') // i am doing this because need change ip for the test
    },
    GET_LAST_DATA({
        commit
    }) {
      axios.get(this.state.last_data_api).then(
        response=> {
            commit('SET_LAST_DATA_TO_STATE', response.data)
        }
      )
    },
    GET_KRAN_DATA({
        commit
    } ) {
      axios.get(this.state.kran_api).then(
        response=> {
          commit('SET_KRAN_DATA_TO_STATE', response.data)
          commit('SET_TOTAL_180_TO_STATE', response.data)
          //console.info(this.state.kran_api)
        }
      )
    },
    GET_USM_DATA({
        commit
    }) {
      axios.get(this.state.usm_api).then(
        response=> {
          commit('SET_USM_DATA_TO_STATE', response.data)
          //console.info(this.state.usm_api)
        }
      )
    },

    GET_SENNEBOGEN_DATA({
        commit
    }) {
      axios.get(this.state.sennebogen_api).then(
        response=> {
          commit('SET_SENNEBOGEN_DATA_TO_STATE', response.data)
          //console.info(this.state.sennebogen_api)
        }
      )
    },

    SET_FLAG_NOTIFICATION({
        commit
    }, value) {
        commit('SET_FLAG_NOTIFICATION_TO_STATE', value);
    },
    SET_FLAG_AUDIO({
        commit
    }, value) {
        commit('SET_FLAG_AUDIO_TO_STATE', value);
    },
    SET_FLAG_EMPTY_MECH({
        commit
    }, value) {
        commit('SET_FLAG_EMPTY_MECH_TO_STATE', value);
    },
    SET_FLAG_2_MAPS({
        commit
    }, value) {
        commit('SET_FLAG_2_MAPS_TO_STATE', value);
    },
    SET_FLAG_TERMINAL_1({
        commit
    }, value) {
        commit('SET_FLAG_TERMINAL_1_TO_STATE', value);
    },
    SET_FLAG_TERMINAL_2({
        commit
    }, value) {
        commit('SET_FLAG_TERMINAL_2_TO_STATE', value);
    },
    SET_KRAN_API({
        commit
    }, value) {
        commit('CHANGE_KRAN_API', value)
    },
    SET_USM_API({
        commit
    }, value) {
        commit('CHANGE_USM_API', value);
    },
    SET_SENNEBOGEN_API({
        commit
    }, value) {
        commit('CHANGE_SENNEBOGEN_API', value);
    },
    SET_SELECTED_FEATURES({
        commit
    }, value) {
        commit('SET_SELECTED_FEATURES_TO_STATE', value);
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
    SET_DATE_SHIFT({
        commit
    }, value) {
        commit('CHANGE_DATE_SHIFT', value);
    },
}
