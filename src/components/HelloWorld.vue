<template>
  <div>
    <table>
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
    </table>

  </div>
</template>

<script>
import TdEx from "./TdEx";
import TrEx from "./TrEx";
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
  },
  components: {
    TdEx,
    TrEx
  }
};
</script>

<style>
html {
  background: #09c;
}
.td-ex {
  margin: 0 auto;
  margin-top: 5%;
}
</style>
