<template>
  <div class="common-layout">
    <el-container>
      <iframe
        id="palette"
        name="palette"
        :src="
          baseUrl +
          colorStore.colorsNumber.toString() +
          '|s|' +
          colorStore.nowColor.replace('#', '') +
          '||1|1'
        "
        style="height: calc(100% - 50px)"
        width="100%"
      ></iframe>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";
import { computed } from "vue";

const colorStore = uesColorStore();
const baseUrl = computed(() => {
  if (window.location.href.includes("datavizu.app")) {
    return "https://palette.datavizu.app/#/";
  } else {
    return "https://datavizu.github.io/Palette/#/";
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
