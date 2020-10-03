import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      last_data: [],
      krans_data: [],
      usm_data: [],
      // ip:      'http://94.154.76.136',
      ip:      'http://127.0.0.1:5000',
      last_data_api: '',
      kran_api: '',
      usm_api: '',
      // kran_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/kran',
      // usm_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/usm',
      errored_last_data: false,
  },
  mutations: {
      SET_LAST_DATA_TO_STATE: (state, values) => {
        state.last_data = values;
      },
      SET_KRANS_DATA_TO_STATE: (state, values) => {
        state.krans_data = values;
      },
      SET_USM_DATA_TO_STATE: (state, values) => {
        state.usm_data = values;
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
        state.last_data_api = state.ip + '/api/v1.0/all_last_data_state'
        state.kran_api = state.ip + '/api/v1.0/get_data_period_with_fio_now/kran'
        state.usm_api = state.ip + '/api/v1.0/get_data_period_with_fio_now/usm'
        console.log('CHANGE_IP')
      }
  },
  actions: {
    GET_IP ({commit}) {
      commit('CHANGE_IP') // i am doing this because need change ip for the test
    },
    GET_LAST_DATA({commit}) {
      return axios(this.state.last_data_api, {
          method: "GET"
      })
      .then(args => {
          commit('SET_LAST_DATA_TO_STATE', args.data);
          return args;
      })
      .catch(error => {
          commit('ERROR_STATE_LAST_DATA' );
          console.log(error)
          return error;
      })
    },
    GET_KRANS_DATA({commit}) {
      return axios(this.state.kran_api, {
          method: "GET"
      })
      .then(args => {
          commit('SET_KRANS_DATA_TO_STATE', args.data);
          return args;
      })
      .catch(error => {
          console.log(error)
          return error;
      })
    },
    GET_USM_DATA({commit}) {
      return axios(this.state.usm_api, {
          method: "GET"
      })
      .then(args => {
          commit('SET_USM_DATA_TO_STATE', args.data);
          return args;
      })
      .catch(error => {
          console.log(error)
          return error;
      })
    },

    SET_KRANS_API({commit}, value) {
      commit('CHANGE_KRANS_API', value);
      return axios(this.state.kran_api, {
          method: "GET"
      })
      .then(args => {
          commit('SET_KRANS_DATA_TO_STATE', args.data);
          return args;
      })
      .catch(error => {
          console.log(error)
          return error;
      })
    },
    SET_USM_API({commit}, value) {
      commit('CHANGE_USM_API', value);
      return axios(this.state.usm_api, {
          method: "GET"
      })
      .then(args => {
          commit('SET_USM_DATA_TO_STATE', args.data);
          return args;
      })
      .catch(error => {
          console.log(error)
          return error;
      })
  },
  },
  modules: {
  },
  getters: {
    LAST_DATA(state) {
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
    }
  },
})
