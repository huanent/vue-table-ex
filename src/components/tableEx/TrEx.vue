<template>
  <tr class="tr-ex">
    <td v-if="showIndex" class="order-col">
      {{indexValue}}
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
      indexValue: "",
      enable: false,
      tableEnable: false,
      preRowValid: false
    };
  },
  mounted() {
    this.indexValue = this.$el.rowIndex;

    this.$nextTick(() => {
      this.showIndex = this.$tableEx.showIndex;
      this.$watch(
        vm => vm.$tableEx.showIndex,
        value => (this.showIndex = value)
      );

      this.tableEnable = this.$tableEx.enable;
      this.$watch(
        vm => vm.$tableEx.enable,
        value => (this.tableEnable = value)
      );
    });
  },
  updated() {
    this.indexValue = this.$el.rowIndex;
  },
  methods: {
    setEnable() {
      if (!this.tableEnable) {
        this.enable = false;
        return;
      }

      if (this.$parent.$children[this.indexValue]) {
        this.$parent.$children[this.indexValue].enable = this.valid;
        if (!this.valid) {
          this.$parent.$children
            .filter(f => f.indexValue > this.indexValue)
            .forEach(item => (item.enable = false));
        } else {
          this.$parent.$children
            .filter(f => f.indexValue > this.indexValue && f.valid)
            .forEach(item => (item.enable = true));
        }
      }

      if (this.indexValue == 1) {
        this.enable = true;
        return;
      }

      if (this.$parent.$children[this.indexValue - 2].valid) {
        this.enable = true;
        return;
      }

      this.enable = this.valid;
    }
  },
  watch: {
    valid(value) {
      this.setEnable();
    },
    indexValue(value) {
      this.setEnable();
    },
    tableEnable(value) {
      this.setEnable();
    }
  }
};
</script>
