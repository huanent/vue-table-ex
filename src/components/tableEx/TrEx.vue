<template>
  <tr class="tr-ex">
    <td v-if="showIndex" class="order-col">
      {{rowIndex}}
      <i v-if="valid&&validTip"></i>
    </td>
    <slot></slot>
  </tr>
</template>

<script>
export default {
  name: "TrEx",
  props: {
    valid: {
      type: Boolean,
      default: true
    },
    validTip: Boolean
  },
  data() {
    return {
      showIndex: true,
      rowIndex: null,
      preTrEx: null,
      nextTrEx: null,
      enable: false,
      tableEnable: false,
      preRowValid: false
    };
  },
  created() {
    let vm = this;
    function inject(parent) {
      parent.$children.forEach(f => {
        f.$trEx = vm;
        inject(f);
      });
    }
    this.$nextTick(() => {
      inject(vm);
    });
  },
  mounted() {
    this.rowIndex = this.$el.rowIndex;

    this.$nextTick(() => {
      this.watchShowIndex();
      this.watchTableEnable();
    });
  },
  updated() {
    this.rowIndex = this.$el.rowIndex;
  },
  methods: {
    setEnable() {
      if (!this.tableEnable) {
        this.enable = false;
        return;
      }

      if (this.$parent.$children[this.rowIndex]) {
        this.$parent.$children[this.rowIndex].enable = this.valid;
        if (!this.valid) {
          this.$parent.$children
            .filter(f => f.rowIndex > this.rowIndex)
            .forEach(item => (item.enable = false));
        } else {
          this.$parent.$children
            .filter(f => f.rowIndex > this.rowIndex && f.valid)
            .forEach(item => (item.enable = true));
        }
      }

      if (this.rowIndex == 1) {
        this.enable = true;
        return;
      }

      if (this.$parent.$children[this.rowIndex - 2].valid) {
        this.enable = true;
        return;
      }

      this.enable = this.valid;
    },
    watchShowIndex() {
      this.showIndex = this.$parent.$parent.showIndex;
      this.$watch(
        vm => vm.$parent.$parent.showIndex,
        value => (this.showIndex = value)
      );
    },
    watchTableEnable() {
      this.tableEnable = this.$parent.$parent.enable;
      this.$watch(
        vm => vm.$parent.$parent.enable,
        value => (this.tableEnable = value)
      );
    }
  },
  watch: {
    valid(value) {
      this.setEnable();
    },
    rowIndex(value) {
      this.setEnable();
    },
    tableEnable(value) {
      this.setEnable();
    }
  }
};
</script>
