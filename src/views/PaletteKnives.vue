<template>
  <div class="common-layout">
    <el-container>
      <ChromaJs ></ChromaJs>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ChromaJs from "./ChromaJs.vue";


</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
