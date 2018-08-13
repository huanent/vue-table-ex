<template>
  <tbody class="tbody-ex">
    <slot></slot>
  </tbody>
</template>

<script>
export default {
  name: "TbodyEx",
  inject: {
    tableEx: "tableEx"
  },
  data() {
    return {
      trList: [],
      autoFocus: Boolean,
      selectedRow: null
    };
  },
  provide() {
    return {
      tbodyEx: this
    };
  },
  mounted() {
    this.tableEx.tbodyEx = this;
  },
  computed: {
    selectedRowIndex() {
      return this.trList.indexOf(this.selectedRow);
    }
  }
};
</script>
