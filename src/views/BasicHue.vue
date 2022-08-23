<template>
  <div class="common-layout">
    <el-container>
      <iframe
        id="iwanthue"
        name="iwanthue"
        :src="url"
        style="height: calc(100% - 50px)"
        width="100%"
      ></iframe>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

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
