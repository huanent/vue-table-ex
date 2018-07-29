<template>
    <tfoot class="tfoot-ex">
        <slot>
        </slot>
    </tfoot>
</template>

<script>
export default {
  name: "TfootEx",
  created() {
    let vm = this;
    function inject(parent) {
      parent.$children.forEach(f => {
        f.$tfootEx = vm;
        inject(f);
      });
    }
    this.$nextTick(() => inject(vm));
  }
};
</script>
