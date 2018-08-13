<template>
  <tfoot class="tfoot-ex">
    <slot>
    </slot>
    <tr v-if="show&&tableEx.enable">
      <td :colspan="colSpan">
        <div class="ctrl-bar">
          <a @click="$emit('addRow')">新增 +</a>
          <a @click="delRow">删除 -</a>
          <span>当前选中第：{{selectedRowIndex+1}} 行</span>
        </div>

      </td>
    </tr>
  </tfoot>
</template>

<script>
export default {
  name: "TfootEx",
  inject: {
    tableEx: "tableEx"
  },
  props: {
    show: false
  },
  computed: {
    colSpan() {
      if (this.tableEx.tbodyEx) {
        var tr = this.tableEx.tbodyEx.trList[0];
        if (tr && tr.tdList) return tr.tdList.length + 1;
      }
      return 1;
    },
    selectedRowIndex() {
      if (this.tableEx.tbodyEx) return this.tableEx.tbodyEx.selectedRowIndex;
      return -1;
    }
  },
  methods: {
    delRow() {
      if (this.tableEx.tbodyEx.trList.length == 1) {
        this.$emit("delRow", -1);
      } else {
        this.$emit("delRow", this.selectedRowIndex);
        this.tableEx.tbodyEx.selectedRow = null;
      }
    }
  }
};
</script>
<style>
.tfoot-ex td {
  text-align: center;
}

.tfoot-ex .ctrl-bar {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
}

.ctrl-bar a {
  padding-left: 15px;
  cursor: pointer;
  font-size: 14px;
}
.ctrl-bar a:nth-child(1) {
  color: rgb(56, 142, 255);
}

.ctrl-bar a:nth-child(2) {
  color: red;
}
.ctrl-bar span {
  font-size: 12px;
  color: #777;
  flex-grow: 1;
  text-align: right;
  padding-right: 10px;
}
</style>
