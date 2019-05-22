import Vue from 'vue'
import App from './luckywheel.vue'
import wx from 'weixin-jsapi'
import '@/assets/js/rem.js'
import '@/assets/sass/reset.scss'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
