<template>
  <el-button type="primary" @click="getBasicColor">Primary</el-button>
  <el-button type="primary" @click="getPaletteColor">Primary</el-button>
  <el-col>
    <el-row
      :gutter="20"
      v-for="(item, index) in colorStore.basicColor"
      v-bind:key="index"
    >
      <el-col :span="6">
        <div
          class="color-block"
          :style="{ background: item }"
          :title="item"
        ></div>
      </el-col>
      <el-col :span="10">
        <div class="color-text">{{ item }}</div>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="setNowColor(index)">Set</el-button>
      </el-col>
    </el-row>
    <el-row id="slider-row">
      <el-slider
        v-model="colorStore.colorsNumber"
        :min="1"
        :max="20"
        show-input
      />
    </el-row>
    <el-row
      v-for="(palette, index1) in colorStore.palettes"
      v-bind:key="index1"
    >
      <el-row class="color-block">
        <el-col
          v-for="(item, index2) in palette"
          v-bind:key="index2"
          :span="Math.floor(24 / palette.length)"
        >
          <div
            class="color-block"
            :style="{ background: item }"
            :title="item"
          ></div>
        </el-col>
      </el-row>
      <el-row class="color-block" id="delete-btn">
        <el-button type="primary" @click="deletePaletteColor(index1)">
          Delete
        </el-button>
      </el-row>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";

const colorStore = uesColorStore();

const getBasicColor = () => {
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

const getPaletteColor = () => {
  try {
    const paletteIframe = (
      document.getElementById("palette") as HTMLIFrameElement
    ).contentWindow;
    const paletteIframeDocument = paletteIframe?.document;
    const paletteColorRwaText =
      paletteIframeDocument?.getElementsByTagName("pre")[0].innerHTML;
    if (paletteColorRwaText) {
      const paletteColor = paletteColorRwaText.split(",");
      colorStore.addPalette(paletteColor);
      const palettes = colorStore.getPalette;
      console.log(palettes);
    }
  } catch (e) {
    console.error(e);
  }
};

const deletePaletteColor = (index: number) => {
  colorStore.deletePalette(index);
};

const setNowColor = (index: number) => {
  colorStore.setNowColor(colorStore.basicColor[index]);
};
</script>

<style scoped lang="less">
.color-block {
  border-radius: 4px;
  min-height: 36px;
  width: 100%;
  justify-content: space-between;
}

#delete-btn {
  flex-direction: row-reverse;
}

#slider-row {
  width: 100%;
  .el-slider {
    margin-left: 12px;
  }
}
</style>
