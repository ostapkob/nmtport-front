import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      count: 0,
      last_data: [],
      krans_data: [],
      endpoint: 'http://94.154.76.136/api/v1.0/all_last_data',
      // kran_now_api:  'http://94.154.76.136/api/v1.0/get_data_now/kran',
      // usm_now_api:  'http://94.154.76.136/api/v1.0/get_data_now/usm',
      kran_now_api: 'http://127.0.0.1:5000/api/v1.0/get_data_now/kran',
      usm_now_api:  'http://127.0.0.1:5000/api/v1.0/get_data_now/usm',
      errored: false,
      tt: "tt",
  },
  mutations: {
      SET_LAST_DATA_TO_STATE: (state, values) => {
        state.last_data = values;
        console.log('store mutations');
      },
      SET_KRANS_DATA_TO_STATE: (state, values) => {
        state.krans_data = values;
      }
  },
  actions: {
      GET_LAST_DATA({commit}) {
        console.log('store actions');
        return axios(this.state.endpoint, {
            method: "GET"
        })
        .then(args => {
            commit('SET_LAST_DATA_TO_STATE', args.data);
            return args;
        })
        .catch(error => {
            console.log(error)
            return error;
        })
    },   
      GET_KRANS_DATA({commit}) {
        return axios(this.state.kran_now_api, {
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
    }   
  },
  modules: {
  },
  getters: {
    LAST_DATA(state) {
        console.log('store getters');
        return state.last_data;
    },
    KRANS_DATA(state) {
        return state.krans_data;
    }
  }
})
