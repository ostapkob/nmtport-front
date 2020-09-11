import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      count: 0,
      last_data: [],
      endpoint: 'http://94.154.99.107/api/v1.0/all_last_data',
      errored: false,
      tt: "tt",
  },
  mutations: {
      SET_LAST_DATA_TO_STATE: (state, products) => {
        state.last_data = products;
        console.log('mutations');
      }
        // get_data(state, value=1) {
        //     axios
        //         .get(state.endpoint)
        //         .then(response => {
        //             state.last_data = response.data
        //             })
        //         // .catch(error =>  console.log(error));
        //        .catch(error => {
        //                    console.log(error);
        //                    state.errored = true;
        //                  })
        //         state.count+=value;
        //       }
  },
  actions: {
      GET_LAST_DATA({commit}) {
        console.log('actions');
        return axios('http://94.154.99.107/api/v1.0/all_last_data', {
        // return axios('http://192.168.99.107/api/v1.0/all_last_data', {
            method: "GET"
        })
        .then(products => {
            commit('SET_LAST_DATA_TO_STATE', products.data);
            return products;
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
        console.log('getters');
        return state.last_data;
    }
  }
})
