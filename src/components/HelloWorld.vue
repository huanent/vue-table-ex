<template>
  <div>
    <table-ex class="table" :enable='tableEnable' :show-index="showIndex">
      <thead-ex>
        <tr>
          <th v-if="showIndex" rowspan="2">行号</th>
          <th colspan="3">基本信息</th>
        </tr>
        <tr>
          <th>姓名</th>
          <th>年龄</th>
          <th>爱好</th>
        </tr>
      </thead-ex>
      <tbody-ex auto-focus>
        <tr-ex v-for="(item,index) in jsonData" :key="index" :valid="rowValid(item)" valid-tip>
          <td-ex v-model="item.id" :list="list" display="name" take='id' edit @change="onChange(item,$event)"></td-ex>
          <td-ex v-model="item.age"></td-ex>
          <td-ex v-model="item.like" edit></td-ex>
        </tr-ex>
      </tbody-ex>
      <tfoot-ex :show="true" @addRow="addRow" @delRow="delRow">
        <td v-if="showIndex">合计</td>
        <td></td>
        <td>{{totalAge}}</td>
        <td></td>
      </tfoot-ex>
    </table-ex>
    <div class="ctl-btn">
      <button @click="tableEnable=!tableEnable">切换表格禁用状态</button>
      <button @click="showIndex=!showIndex">切换行号显示</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "张三", id: 1, age: 23 },
        { name: "李四", id: 2, age: 26 },
        { name: "王五", id: 3, age: 42 },
        { name: "赵六", id: 4, age: 19 },
        { name: "小明", id: 5, age: 18 },
        { name: "王刚", id: 6, age: 27 }
      ],
      jsonData: [
        { id: 1, age: 23, like: "打球" },
        { id: null, age: null, like: null },
        { id: null, age: null, like: null },
        { id: null, age: null, like: null }
      ],
      tableEnable: true,
      showIndex: true
    };
  },
  methods: {
    addRow() {
      this.jsonData.push({ id: null, age: null, like: null });
    },
    delRow(e) {
      this.jsonData = this.jsonData.filter(f => this.jsonData.indexOf(f) != e);
    },
    onChange(row, e) {
      if (!e) {
        row.age = null;
        return;
      }
      row.age = e.age;
    },
    rowValid(row) {
      return row.id != null && row.like != null && row.like != "";
    }
  },
  computed: {
    totalAge() {
      let total = 0;
      this.jsonData.map(m => (total += m.age));
      return total;
    }
  }
};
</script>

<style>
.table {
  margin: 0 auto;
  margin-top: 5%;
}
.ctl-btn {
  margin: 0 auto;
  width: 600px;
  margin-top: 50px;
}
</style>
