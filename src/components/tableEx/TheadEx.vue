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

