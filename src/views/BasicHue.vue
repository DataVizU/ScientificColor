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
const url = "https://datavizu.github.io/iwanthue/";
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
