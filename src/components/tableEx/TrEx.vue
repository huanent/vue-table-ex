<template>
  <tr class="tr-ex">
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "TdEx",
  data() {
    return {
      msg: "序号"
    };
  },
  mounted() {
    this.$children.forEach(item =>
      item.$on("selected", this.$emit("selected"))
    );
  }
};
</script>

<style>
</style>
