import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Vuelidate from 'vuelidate'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueMask from 'v-mask'
import VueRouter from 'vue-router'
import VueCurrencyFilter from 'vue-currency-filter'
import vco from "v-click-outside"
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

import "@/assets/scss/styles.scss";
import VueSweetalert2 from 'vue-sweetalert2';

import App from './App'
import http from './http';
import router from './router'
import store from './store'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(VueRouter)
Vue.use(vco)
Vue.use(require('vue-moment'))
Vue.use(ToggleButton)

Vue.config.productionTip = false
Vue.prototype.$http = http;

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueMask)
Vue.use(VueToast)
Vue.use(require('vue-chartist'))
Vue.use(VueSweetalert2)
Vue.use(VueCurrencyFilter, {
  symbol : '£',
  thousandsSeparator: ',',
  fractionCount: 0,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false
})
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE',
    libraries: 'places',
  },
  installComponents: true
})
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
