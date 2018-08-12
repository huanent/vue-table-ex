<template>
  <tr class="tr-ex">
    <td v-if="tableEx.showIndex" class="order-col">
      {{rowIndex}}
      <i v-if="valid"></i>
    </td>
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "TrEx",
  inject: {
    tableEx: "tableEx",
    tbodyEx: "tbodyEx"
  },
  provide() {
    return {
      trEx: this
    };
  },
  props: {
    valid: {
      type: Boolean,
      default: true
    },
    validTip: Boolean
  },
  data() {
    return {
      rowIndex: null,
      enable: true,
      tdList:[]
    };
  },
  mounted() {
    this.rowIndex = this.$el.rowIndex;
    this.tbodyEx.trList.push(this)
  },
  beforeDestroy(){
    this.tbodyEx.trList=this.tbodyEx.trList.filter(f=>f!==this)
  },
  updated() {
    this.rowIndex = this.$el.rowIndex;
  },
  methods: {}
};
</script>
