import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/styles.scss"
import VueClipboard from 'vue-clipboard2'

//import { BootstrapVue } from 'bootstrap-vue'
//Vue.use(BootstrapVue)

Vue.config.productionTip = false

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import { BContainer, BRow, BCol, BButton} from 'bootstrap-vue'


// Vue.component(BContainer)
Vue.component('b-container', BContainer)
Vue.component('b-row', BRow)
Vue.component('b-col', BCol)
Vue.component('b-button', BButton)
import { VBToggle } from 'bootstrap-vue'
Vue.directive('b-toggle', VBToggle)
import { VBPopover } from 'bootstrap-vue'
Vue.directive('b-popover', VBPopover)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



