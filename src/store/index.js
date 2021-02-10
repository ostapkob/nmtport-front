import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import { auth } from './auth.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    last_data: [],
    krans_data: [],
    usm_data: [],
    selectedFeatures: [],
    ip: 'https://m1.nmtport.ru',
    // ip:      'http://127.0.0.1:5000',
    // ip:      'http://192.168.8.112:5000',
    last_data_api: '',
    kran_api: '',
    usm_api: '',
    // kran_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/kran',
    // usm_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/usm',
    errored_last_data: false,
    flagAudio: null,
    flagNotification: null,
    mechFilter: ['usm', 'kran'],
    listAlarm: [],
    // mechFilter: [],
  },
  actions,
  mutations,
  getters,
  modules: {
    auth
  }
}


)
