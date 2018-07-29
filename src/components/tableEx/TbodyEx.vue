<template>
    <tbody class="tbody-ex">
        <slot></slot>
    </tbody>
</template>

<script>
export default {
  name: "TbodyEx",
  created() {
    let vm = this;
    function inject(parent) {
      parent.$children.forEach(f => {
        f.$tbodyEx = vm;
        inject(f);
      });
    }
    this.$nextTick(() => inject(vm));
  }
};
</script>
