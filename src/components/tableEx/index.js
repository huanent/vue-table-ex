import TdEx from './TdEx.vue'
import TrEx from './TrEx.vue'
import TbodyEx from './TbodyEx.vue'
import TheadEx from './TheadEx.vue'
import ThEx from './ThEx.vue'
import TableEx from './TableEx.vue'

export default {
    install(Vue) {
        Vue.component('td-ex', TdEx)
        Vue.component('tr-ex', TrEx)
        Vue.component('tbody-ex', TbodyEx)
        Vue.component('thead-ex', TheadEx)
        Vue.component('th-ex', ThEx)
        Vue.component('table-ex', TableEx)
    }
}