<template>
  <td class="td-ex" ref="td">
    <input ref="input" v-model="value" @keydown="keydown" @focus="focus" @blur="blur" @input="input" :readonly='!edit||!tableEx.enable||!enable' />
    <div class="drawdown-icon" v-if="showDrawdown&&tableEx.enable&&enable" @mousedown="drawdownClick">
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
  inject: {
    tableEx: "tableEx",
    tbodyEx: "tbodyEx",
    trEx: "trEx"
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
      colIndex: null
    };
  },
  mounted() {
    this.colIndex = this.$refs.td.cellIndex;
    this.trEx.tdList.push(this);

    this.$nextTick(() => {
      //自动选中第一个单元格
      if (
        this.tableEx.autoFocus &&
        this.trEx.rowIndex == 1 &&
        this.colIndex == 1
      ) {
        this.$refs.input.focus();
      }
    });

    //不是下拉则直接赋值，下拉则根据take选中值
    if (!this.list) {
      this.value = this.bindValue;
    } else {
      let selectedItem = this.list.find(
        f => this.takeValue(f) == this.bindValue
      );
      if (selectedItem) this.itemClick(selectedItem);
    }
  },
  beforeDestroy() {
    this.trEx.tdList = this.trEx.tdList.filter(f => f !== this);
  },
  updated() {
    this.colIndex = this.$refs.cellIndex;
  },
  methods: {
    setFocus() {
      this.$refs.input.focus();
    },
    drawdownClick() {
      this.showList = !this.showList;
      this.$nextTick(() => this.$refs.input.focus());
    },
    focus(e) {
      this.$nextTick(() => {
        e.target.select();
      });
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
      if (
        !this.enable ||
        !this.tableEx.enable ||
        (!this.trEx.valid && e.keyCode == 40)
      )
        return;

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
            let rowIndex = this.tbodyEx.trList.indexOf(this.trEx);
            if (rowIndex == this.tbodyEx.trList.length - 1) return;
            let colIndex = this.trEx.tdList.indexOf(this);
            this.tbodyEx.trList[rowIndex + 1].tdList[colIndex].setFocus();
          }
          break;
        case 38: //上
          if (this.list) {
            this.arrowUpKeydown();
            this.scrollIntoView();
          } else {
            let rowIndex = this.tbodyEx.trList.indexOf(this.trEx);
            if (rowIndex == 0) return;
            let colIndex = this.trEx.tdList.indexOf(this);
            this.tbodyEx.trList[rowIndex - 1].tdList[colIndex].setFocus();
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
      let index = this.trEx.tdList.indexOf(this);
      if (index == 0) return;
      this.trEx.tdList[index - 1].setFocus();
    },
    arrowRightKeydown() {
      let index = this.trEx.tdList.indexOf(this);
      if (index == this.trEx.tdList.length - 1) return;
      this.trEx.tdList[index + 1].setFocus();
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
    },
    enable() {
      let index = this.tbodyEx.trList.indexOf(this.trEx);
      if (index == 0) return true;
      let tr = this.tbodyEx.trList[index - 1];
      if (tr) return tr.valid;
      return false;
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
<style>
.td-ex input {
  display: block;
  border: 0;
  margin: 0;
  padding: 0 10px;
  width: auto;
  height: 100%;
  outline: 0;
}

.td-ex input:read-only {
  cursor: not-allowed;
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
