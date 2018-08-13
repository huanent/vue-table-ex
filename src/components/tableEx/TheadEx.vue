<template>
  <thead class="thead-ex">
    <slot></slot>
  </thead>
</template>

<script>
export default {
  name: "TheadEx"
};
</script>
<style>
.thead-ex th {
  background-color: #fff;
  line-height: 32px;
  color: #333;
}

.thead-ex tr th {
  border: 1px solid #ddd;
}

.thead-ex tr:nth-child(1) th {
  border-top: 2px solid rgb(56, 142, 255);
}

.thead-ex tr:nth-last-child(1) th{
  border-bottom: 1px solid  rgb(56, 142, 255);
}

</style>


