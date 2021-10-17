import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
import { auth } from './auth.module'

Vue.use(Vuex)

import { shiftNow, dateNow } from "@/functions/functions";

export default new Vuex.Store({
  state: {
    last_data: [],
    kran_data: [],
    usm_data: [],
    sennebogen_data: [],
    selectedFeatures: [],
    ip: 'https://m1.nmtport.ru',
    // ip:      'http://127.0.0.1:5000',
    last_data_api: '',
    kran_api: '',
    tmp_kran_api: '',
    tmp_usm_api: '',
    tmp_sennebogen_api: '',
    shift: shiftNow(),
    date: dateNow(),
    // kran_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/kran',
    // usm_api: 'http://94.154.76.136/api/v1.0/get_data_period_with_fio_now/usm',
    errored_last_data: false,
    flagAudio: null,
    flagNotification: null,
    flagEmptyMech: null,
    mechFilter: ['usm', 'kran'],
    listAlarm: [],
    total_terminals_180: {},
    flag2Maps: false,
    flagTerminal1: true,
    flagTerminal2: true,
  },
  actions,
  mutations,
  getters,
  modules: {
    auth
  },
  methods: {
  }
}


)
