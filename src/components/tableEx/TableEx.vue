<template>
  <table class="table-ex">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "TableEx",
  props: {
    showIndex: {
      type: Boolean,
      default: true
    },
    enable: Boolean
  },
  provide() {
    return {
      tableEx: this
    };
  },
  data() {
    return {
      tbodyEx: null
    };
  },
  watch: {
    selectedRowIndex(value) {
      this.$emit("selectedRowIndexChange", value);
    }
  }
};
</script>
<style>
.table-ex {
  border-collapse: collapse; /*关键代码*/
}

.table-ex td {
  position: relative;
  border: 1px solid #ddd;
  padding: 0 0;
  margin: 0;
  height: 32px;
  background-color: white;
}
</style>

