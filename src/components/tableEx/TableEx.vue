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
  created() {
    let vm = this;
    function inject(parent) {
      parent.$children.forEach(f => {
        f.$tableEx = vm;
        inject(f);
      });
    }
    this.$nextTick(() => inject(vm));
  },
  mounted() {
    if (this.autoFocus) this.doAutoFocus();
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
