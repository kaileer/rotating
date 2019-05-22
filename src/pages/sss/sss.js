import Vue from 'vue'
import App from './sss.vue'
import wx from 'weixin-jsapi'
import '@/assets/js/rem.js'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
