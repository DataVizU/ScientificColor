<template>
  <div class="common-layout">
    <el-container>
      <iframe
        id="palette"
        name="palette"
        :src="baseUrl + '9|s|' + colorStore.nowColor.replace('#', '') + '||1|1'"
        style="height: calc(100% - 50px)"
        width="100%"
      ></iframe>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";

const colorStore = uesColorStore();
const baseUrl =
  "https://paletter-2ginmlqy6316b03c-1301838709.ap-shanghai.app.tcloudbase.com/#/";
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
