<template>
  <tr class="tr-ex">
    <td v-if="showIndex" class="order-col">{{indexValue}}</td>
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "TrEx",
  data() {
    return {
      showIndex: false,
      indexValue: ""
    };
  },
  mounted() {
    this.$children.forEach(item =>
      item.$on("selected", this.$emit("selected"))
    );
  },
  methods: {
    setShowIndex(value) {
      this.showIndex = value;
    }
  }
};
</script>
