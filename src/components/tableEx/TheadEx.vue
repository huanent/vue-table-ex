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
  mounted() {
    this.$nextTick(() => {
      this.showIndex = this.$parent.showIndex;
      this.$watch(
        vm => vm.$parent.showIndex,
        value => (this.showIndex = value)
      );
    });
  }
};
</script>

