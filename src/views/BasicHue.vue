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
const url =
  "https://iwanthue-3gxr4jyd858ecae2-1301838709.ap-shanghai.app.tcloudbase.com/";
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
