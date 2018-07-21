<template>
    <thead class="thead-ex">
        <tr>
            <slot></slot>
        </tr>
    </thead>
</template>

<script>
export default {};
</script>

<style scope>
.thead-ex th {
  background-color: #fff;
  border-top: 2px solid rgb(56, 142, 255);
  border-bottom: 1px solid rgb(56, 142, 255);
  line-height: 32px;
  color: #333;
}
</style>
