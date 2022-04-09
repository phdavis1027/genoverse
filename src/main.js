import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import VueElectron from 'vue-electron'
import VueCytoscape from 'vue-cytoscape'

Vue.use(VueCytoscape)
// Vue.use(VueElectron)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
