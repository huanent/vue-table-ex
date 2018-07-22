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
    showIndex: Boolean
  },
  mounted() {
    if (this.autoFocus) this.doAutoFocus();
    if (this.showIndex) this.doShowIndex();
  },
  updated() {
    if (this.showIndex) this.doShowIndex();
  },
  methods: {
    doAutoFocus() {
      let tbody = this.$children.find(f => f.$el.className == "tbody-ex");
      if (tbody && tbody.$children[0] && tbody.$children[0].$children[0]) {
        tbody.$children[0].$children[0].setFocus();
      }
    },
    doShowIndex() {
      let thead = this.$children.find(f => f.$el.className == "thead-ex");
      if (thead) thead.showIndex = true;
      let tbody = this.$children.find(f => f.$el.className == "tbody-ex");
      if (tbody)
        tbody.$children.forEach((item, index) => {
          item.showIndex = true;
          item.indexValue = index + 1;
        });
    }
  }
};
</script>
