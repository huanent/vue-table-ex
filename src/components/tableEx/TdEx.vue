<template>
  <td class="td-ex">
    <input ref="input" v-model="value" @keydown="keydown" @focus="focus" @blur="blur" @input="input" :readonly='!edit||!enable' />
    <div class="drawdown-icon" v-if="enable&&showDrawdown" @mousedown="drawdownClick">
      <i />
    </div>
    <ul v-if="showList">
      <li v-for="(item,index) in searchList" :class="{selected:item==selectedItem}" :key="index" @mousedown="itemClick(item)">{{displayValue(item)}}</li>
    </ul>
  </td>
</template>

<script>
import "./scrollIntoViewIfNeeded.js";
export default {
  name: "TdEx",
  model: {
    prop: "bindValue",
    event: "update:bindValue"
  },
  props: {
    bindValue: {
      default: ""
    },
    list: Array,
    display: String,
    take: String,
    edit: Boolean
  },
  data() {
    return {
      showList: false,
      showListTimeout: null,
      showDrawdown: this.$props.list,
      value: "",
      selectedItem: null,
      readonly: true,
      enable: false
    };
  },
  mounted() {
    this.$watch(vm => vm.$parent.enable, value => (this.enable = value));
    if (!this.list) {
      this.value = this.bindValue;
    } else {
      let selectedItem = this.list.find(
        f => this.takeValue(f) == this.bindValue
      );
      if (selectedItem) this.itemClick(selectedItem);
    }
  },
  methods: {
    drawdownClick() {
      this.showList = !this.showList;
      this.$nextTick(() => this.$refs.input.focus());
    },
    focus(e) {
      this.$nextTick(() => {
        e.target.select();
      });
    },
    setFocus() {
      this.$refs.input.focus();
    },
    blur() {
      if (!this.list) return;
      this.showListTimeout = setTimeout(() => {
        this.showList = false;
      }, 100);
      let item = this.list.find(f => this.displayValue(f) == this.value);
      if (!item) {
        this.value = "";
        this.$emit("update:bindValue", null);
        this.$nextTick(() => this.$emit("change", null));
      }
    },
    displayValue(item) {
      if (!this.list) return item;
      if (this.display) return item[this.display];
      else return item;
    },
    takeValue(item) {
      if (!this.list) return item;
      if (this.take) return item[this.take];
      else return item;
    },
    itemClick(item) {
      this.$emit("update:bindValue", this.takeValue(item));
      this.value = this.displayValue(item);
      this.selectedItem = item;
      this.$nextTick(() => this.$emit("change", this.selectedItem));
    },
    input() {
      this.$nextTick(() => {
        if (this.list) {
          this.showList = this.searchList.length != 0;
        } else if (this.edit) {
          this.$emit("update:bindValue", this.value);
        }
      });
    },
    keydown(e) {
      if (!this.enable) return;
      switch (e.keyCode) {
        case 13: //回车
          if (!this.list) return;
          this.$emit("update:bindValue", this.takeValue(this.selectedItem));
          this.value = this.displayValue(this.selectedItem);
          this.$nextTick(() => this.$emit("change", this.selectedItem));
          this.showList = false;
          break;
        case 40: //下
          if (this.list) {
            this.arrowDownKeydown();
            this.scrollIntoView();
          } else {
            var items = this.$parent.$children;
            let index = items.indexOf(this);
            var rows = this.$parent.$parent.$children;
            var rowIndex = rows.indexOf(this.$parent);
            if (rowIndex == rows.length - 1) return;
            if (rows[rowIndex + 1].enable)
              rows[rowIndex + 1].$children[index].setFocus();
          }
          break;
        case 38: //上
          if (this.list) {
            this.arrowUpKeydown();
            this.scrollIntoView();
          } else {
            var items = this.$parent.$children;
            let index = items.indexOf(this);
            var rows = this.$parent.$parent.$children;
            var rowIndex = rows.indexOf(this.$parent);
            if (rowIndex == 0) return;
            if (rows[rowIndex - 1].enable)
              rows[rowIndex - 1].$children[index].setFocus();
          }
          break;
        case 37: //左
          this.arrowLeftKeydown();
          break;
        case 39: //右
          this.arrowRightKeydown();
          break;
        default:
          break;
      }
    },
    arrowDownKeydown() {
      if (this.searchList.length == 0) return;
      let index = this.searchList.indexOf(this.selectedItem);
      if (!this.showList) {
        this.showList = true;
        if (index == -1) this.selectedItem = this.searchList[0];
        return;
      }
      if (index == this.searchList.length - 1) index = 0;
      else index += 1;
      this.selectedItem = this.searchList[index];
    },
    arrowUpKeydown() {
      if (this.searchList.length == 0) return;
      if (!this.showList) return;
      let index = this.searchList.indexOf(this.selectedItem);
      if (index == 0) index = this.searchList.length - 1;
      else index -= 1;
      this.selectedItem = this.searchList[index];
    },
    arrowLeftKeydown() {
      var items = this.$parent.$children;
      let index = items.indexOf(this);
      if (index == 0) return;
      items[index - 1].setFocus();
    },
    arrowRightKeydown() {
      var items = this.$parent.$children;
      let index = items.indexOf(this);
      if (index == items.length - 1) return;
      items[index + 1].setFocus();
    },
    scrollIntoView() {
      if (!this.list) return;
      this.$nextTick(() => {
        let item = document.getElementsByClassName("selected").item(0);
        if (item) {
          item.scrollIntoViewIfNeeded();
        }
      });
    }
  },
  computed: {
    searchList() {
      if (!this.list) return;
      if (this.value == "") return this.list;
      return this.list.filter(
        f => this.displayValue(f).indexOf(this.value) != -1
      );
    }
  },
  watch: {
    showList(value) {
      if (!this.list) return;
      clearTimeout(this.showListTimeout);
      this.showListTimeout = null;
    },
    bindValue(value) {
      if (!this.list) this.value = value;
    }
  }
};
</script>
