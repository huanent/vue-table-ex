<template>
  <thead class="thead-ex">
    <tr>
      <th v-if="tableEx.showIndex" class="order-col">行号</th>
      <slot></slot>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "TheadEx",
  inject:{
    tableEx:"tableEx"
  },
};
</script>
<style>
.thead-ex th {
    background-color: #fff;
    border-top: 2px solid rgb(56, 142, 255);
    border-bottom: 1px solid rgb(56, 142, 255);
    line-height: 32px;
    color: #333;
}
</style>


