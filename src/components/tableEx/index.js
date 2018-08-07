import TdEx from './TdEx.vue'
import TrEx from './TrEx.vue'
import TbodyEx from './TbodyEx.vue'
import TheadEx from './TheadEx.vue'
import TableEx from './TableEx.vue'
import TfootEx from './TfootEx.vue'
import './table-ex.css'

export default {
    install(Vue) {
        Vue.component('td-ex', TdEx)
        Vue.component('tr-ex', TrEx)
        Vue.component('tbody-ex', TbodyEx)
        Vue.component('thead-ex', TheadEx)
        Vue.component('table-ex', TableEx)
        Vue.component('tfoot-ex', TfootEx)
    }
}