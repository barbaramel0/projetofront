import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask';
Vue.use(VueMask);
import router from './Router'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
