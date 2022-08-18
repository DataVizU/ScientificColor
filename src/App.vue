<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-button type="primary" @click="getContent">Primary</el-button>
      </el-aside>
      <el-container>
        <el-header>
          <el-button-group class="ml-4">
            <el-button type="primary">
              <RouterLink to="/">Basic Hue</RouterLink>
            </el-button>
          </el-button-group>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
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
      console.log(hexColor);
      colorStore.setBasicColor(hexColor);
      const storeColor = colorStore.getBasicColor;
      console.log(storeColor);
    }
  } catch (e) {
    console.error(e);
  }
};
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;
}
.el-container {
  min-height: 96vh;
  padding: 1%;
}
el-main {
  height: 100%;
}
</style>
