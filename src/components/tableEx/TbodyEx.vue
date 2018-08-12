<template>
  <tbody class="tbody-ex">
    <slot></slot>
  </tbody>
</template>

<script>
export default {
  name: "TbodyEx",
  data(){
    return{
      trList:[]
    }
  },
  provide(){
    return{
      tbodyEx:this
    }
  }
 };
</script>
