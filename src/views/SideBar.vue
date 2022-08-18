<template>
  <el-button type="primary" @click="getContent">Primary</el-button>
  <el-col>
    <el-row
      :gutter="20"
      v-for="(item, index) in colorStore.getBasicColor"
      v-bind:key="index"
    >
      <el-col :span="4">
        <div class="color-block" :style="{ background: item }"></div>
      </el-col>
      <el-col :span="20">
        <div class="color-text">{{ item }}</div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";

const colorStore = uesColorStore();

const getContent = () => {
  try {
    const hueIframe = (document.getElementById("iwanthue") as HTMLIFrameElement)
      .contentWindow;
    const hueIframeDocument = hueIframe?.document;
    const hexColorRwaText = hueIframeDocument?.getElementById(
      "resultColors_hexlist"
    )?.innerHTML;
    if (hexColorRwaText) {
      const hexColor = hexColorRwaText
        .replace("<pre>", "")
        .replace("</pre>", "")
        .split("<br>");
      hexColor.length = hexColor.length - 1;
      colorStore.setBasicColor(hexColor);
      const storeColor = colorStore.getBasicColor;
      console.log(storeColor);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped>
.color-block {
  border-radius: 4px;
  min-height: 36px;
  width: 100%;
}
</style>
