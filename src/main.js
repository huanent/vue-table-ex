import Vue from 'vue'
import App from './App.vue'
import TableEx from './components/tableEx'

Vue.config.productionTip = false
Vue.use(TableEx)

new Vue({
  render: h => h(App)
}).$mount('#app')
