<template>
  <table class="table-ex">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "TableEx",
  props: {
    autoFocus: Boolean,
    showIndex: {
      type: Boolean,
      default: true
    },
    enable: Boolean
  },
  provide(){
    return{
      tableEx:this
    }
  }
};
</script>
<style>
.table-ex {
    border-spacing: 0;
    outline: 1px solid #ccc;
}

.table-ex td {
    position: relative;
    outline: 1px solid #ddd;
    padding: 0 0;
    margin: 0;
    height: 32px;
    background-color: white;
}
</style>

