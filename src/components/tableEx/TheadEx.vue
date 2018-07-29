<template>
  <thead class="thead-ex">
    <tr>
      <th v-if="showIndex" class="order-col">行号</th>
      <slot></slot>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "TheadEx",
  data() {
    return {
      showIndex: true
    };
  },
  created() {
    let vm = this;
    function inject(parent) {
      parent.$children.forEach(f => {
        f.$tfootEx = vm;
        inject(f);
      });
    }
    this.$nextTick(() => inject(vm));
  },
  mounted() {
    this.$nextTick(() => {
      this.showIndex = this.$tableEx.showIndex;
      this.$watch(
        vm => vm.$tableEx.showIndex,
        value => (this.showIndex = value)
      );
    });
  }
};
</script>

