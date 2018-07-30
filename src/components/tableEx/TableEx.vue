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
  }
};
</script>
