<template>
  <div class="common-layout">
    <el-container>
      <WantHue id="iwanthue"></WantHue>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import WantHue from "@/views/WantHue.vue";
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
