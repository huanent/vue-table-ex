<template>
  <div>
    <table-ex class="table" auto-focus showIndex>
      <thead-ex>
        <th-ex>姓名</th-ex>
        <th-ex>年龄</th-ex>
        <th-ex>爱好</th-ex>
      </thead-ex>
      <tbody-ex>
        <tr-ex v-for="(item,index) in jsonData" :key="index">
          <td-ex v-model="item.id" :list="list" display="name" take='id' edit @change="onChange(item,$event)"></td-ex>
          <td-ex v-model="item.age"></td-ex>
          <td-ex v-model="item.like" edit></td-ex>
        </tr-ex>
      </tbody-ex>
      <tfoot-ex>
        <td>合计</td>
        <td></td>
        <td>{{totalAge}}</td>
      </tfoot-ex>
    </table-ex>
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
        { id: null, age: null, like: null },
        { id: null, age: null, like: null },
        { id: null, age: null, like: null },
        { id: null, age: null, like: null }
      ]
    };
  },
  methods: {
    onChange(row, e) {
      if (!e) {
        row.age = null;
        return;
      }
      row.age = e.age;
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
</style>
