<template>
  <table class="table-ex">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: "TableEx",
  data() {
    return {};
  },
  props: {
    autoFocus: Boolean,
    showIndex: {
      type: Boolean,
      default: true
    },
    enable: Boolean
  },
  mounted() {
    if (this.autoFocus) this.doAutoFocus();
    let tbody = this.$children.find(f => f.$el.className == "tbody-ex");
    // if (tbody) tbody.$children.forEach(item => );
  },
  methods: {
    doAutoFocus() {
      let tbody = this.$children.find(f => f.$el.className == "tbody-ex");
      if (tbody && tbody.$children[0] && tbody.$children[0].$children[0]) {
        tbody.$children[0].$children[0].setFocus();
      }
    }
  }
};
</script>
