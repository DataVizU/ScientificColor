<template>
  <div class="common-layout">
    <el-container>
      <WantHue></WantHue>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import WantHue from "@/views/WantHue.vue";

const url = computed(() => {
  if (window.location.href.includes("datavizu.app")) {
    return "https://iwanthue.datavizu.app/";
  } else {
    return "https://datavizu.github.io/iwanthue/";
  }
});
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
