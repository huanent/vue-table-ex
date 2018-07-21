<template>
  <td class="td-ex">
    <input ref="input" v-model="value" @keydown="keydown" @focus="focus" @blur="blur" @input="input" :readonly='!edit' />
    <div class="drawdown-icon" v-if="showDrawdown" @mousedown="drawdownClick">
      <i />
    </div>
    <ul v-if="showList">
      <li v-for="(item,index) in searchList" :class="{selected:item==selectedItem}" :key="index" @mousedown="itemClick(item)">{{displayValue(item)}}</li>
    </ul>
  </td>
</template>

<script>
import "../common/scrollIntoViewIfNeeded.js";
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
      readonly: true
    };
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
      }
    },
    displayValue(item) {
      if (this.display) return item[this.display];
      else return item;
    },
    takeValue(item) {
      if (this.take) return item[this.take];
      else return item;
    },
    itemClick(item) {
      this.$emit("update:bindValue", this.takeValue(item));
      this.value = this.displayValue(item);
      this.selectedItem = item;
    },
    input() {
      if (!this.list) return;
      this.$nextTick(() => {
        this.showList = this.searchList.length != 0;
      });
    },
    keydown(e) {
      switch (e.keyCode) {
        case 13: //回车
          if (!this.list) return;
          this.$emit("update:bindValue", this.takeValue(this.selectedItem));
          this.value = this.displayValue(this.selectedItem);
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
      let index = this.searchList.indexOf(this.selectedItem);
      if (!this.showList) {
        this.showList = true;
        if (index == -1) this.selectedItem = this.searchList[0];
        return;
      }
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

<style scoped>
td {
  position: relative;
  outline: 1px solid #ddd;
  padding: 0 0;
  margin: 0;
  height: 32px;
  background-color: white;
}
.td-ex input {
  display: block;
  border: 0;
  margin: 0;
  padding: 0 10px;
  width: auto;
  height: 100%;
  outline: 0;
}

.td-ex input:focus {
  background-color: rgb(255, 255, 234);
}

.drawdown-icon {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drawdown-icon i {
  width: 10px;
  height: 10px;
  display: block;
  border-left: 1px #ccc solid;
  border-bottom: 1px #ccc solid;
  transform: rotate(-45deg);
  margin-bottom: 5px;
}

.td-ex ul {
  list-style-type: none;
  position: absolute;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #fff;
  outline: 1px solid #ddd;
  overflow-y: auto;
  max-height: 180px;
  z-index: 1000;
}
.td-ex ul li {
  height: 32px;
  padding: 0 10px;
  margin: 0;
  line-height: 32px;
  cursor: pointer;
}
.td-ex ul li:hover {
  background-color: #ddd;
}
.td-ex ul li.selected {
  background-color: #09c;
  color: #fff;
}
</style>
