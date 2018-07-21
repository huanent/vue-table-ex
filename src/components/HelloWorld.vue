<template>
  <div>
    <table-ex class="table">
      <thead-ex>
        <th-ex>列一</th-ex>
        <th-ex>列二</th-ex>
        <th-ex>列三</th-ex>
      </thead-ex>
      <tbody-ex>
        <tr-ex>
          <td-ex v-model="jsonData.name" :list="list" display="name" take='age' edit></td-ex>
          <td-ex v-model="jsonData.name"></td-ex>
          <td-ex v-model="jsonData.name" edit></td-ex>
        </tr-ex>
        <tr-ex>
          <td-ex v-model="jsonData.name" :list="list" display="name" take='age' edit></td-ex>
          <td-ex v-model="jsonData.name"></td-ex>
          <td-ex v-model="jsonData.name" edit></td-ex>
        </tr-ex>
      </tbody-ex>
    </table-ex>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "zhansan1", age: 23 },
        { name: "李四1", age: 24 },
        { name: "zhansan2", age: 23 },
        { name: "李四2", age: 24 },
        { name: "zhansan3", age: 23 },
        { name: "李四3", age: 24 },
        { name: "zhansan4", age: 23 },
        { name: "李四4", age: 24 },
        { name: "zhansan5", age: 23 },
        { name: "李四5", age: 24 },
        { name: "zhansan6", age: 23 },
        { name: "李四6", age: 24 },
        { name: "王五", age: 26 }
      ],
      jsonData: {
        name: null
      }
    };
  }
};
</script>

<style>
.table {
  margin: 0 auto;
  margin-top: 5%;
}
</style>
