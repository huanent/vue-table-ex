import TdEx from './TdEx.vue'
import TrEx from './TrEx.vue'

export default {
    install(Vue) {
        Vue.component('td-ex', TdEx)
        Vue.component('tr-ex', TrEx)
    }
}