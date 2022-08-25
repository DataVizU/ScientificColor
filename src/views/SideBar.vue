<template>
  <el-col>
    <el-row>
      <img id="logo" src="../pics/logo.svg" alt="logo" />
    </el-row>
    <el-row>
      <el-collapse
        v-model="basicColorActiveNames"
        @change="basicColorHandleChange"
      >
        <el-collapse-item name="1">
          <template #title>
            <el-row class="el-collapse-item-title">
              <div class="el-collapse-item-title-text">
                基色
                <div class="el-collapse-item-title-distance-block"></div>
                <el-icon
                  class="el-collapse-item-title-arrow"
                  :class="basicColorIsActive"
                >
                  <ArrowRight />
                </el-icon>
              </div>
              <el-button
                type="primary"
                @click.stop="getBasicColor"
                class="el-collapse-item-title-btn"
              >
                保存基色
              </el-button>
            </el-row>
          </template>
          <el-row
            :gutter="20"
            v-for="(item, index) in colorStore.basicColor"
            v-bind:key="index"
            class="basic-color-record"
          >
            <el-col :span="3">
              <div
                class="color-block"
                :style="{ background: item }"
                :title="item"
              ></div>
            </el-col>
            <el-col :span="11">
              <div class="color-text">{{ item }}</div>
            </el-col>
            <el-col :span="10">
              <el-button
                type="default"
                @click="setNowColor(index)"
                class="set-color-palette-btn"
              >
                生成色彩梯度
              </el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-row>
      <el-collapse
        v-model="paletteColorActiveNames"
        @change="paletteColorHandleChange"
      >
        <el-collapse-item name="1">
          <template #title>
            <el-row class="el-collapse-item-title">
              <div class="el-collapse-item-title-text">
                颜色梯度
                <div class="el-collapse-item-title-distance-block"></div>
                <el-icon
                  class="el-collapse-item-title-arrow"
                  :class="paletteColorIsActive"
                >
                  <ArrowRight />
                </el-icon>
              </div>
              <el-button
                type="primary"
                @click.stop="getPaletteColor"
                class="el-collapse-item-title-btn"
              >
                保存渐变色
              </el-button>
            </el-row>
          </template>
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
            class="gradient"
          >
            <el-row class="gradient-block">
              <div
                class="gradient-color-block"
                v-for="(item, index2) in palette"
                v-bind:key="index2"
                :style="{
                  background: item,
                  width: 100 / palette.length + '%',
                }"
                :title="item"
              ></div>
            </el-row>
            <el-icon><Close @click="deletePaletteColor(index1)" /></el-icon>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-row>
  </el-col>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";
import { ref } from "vue";
import router from "@/router";

const colorStore = uesColorStore();

const basicColorIsActive = ref("is-active");
const basicColorActiveNames = ref(["1"]);
const basicColorHandleChange = (val: string[]) => {
  if (val.length === 0) {
    basicColorIsActive.value = "";
  } else {
    basicColorIsActive.value = "is-active";
  }
};

const paletteColorIsActive = ref("is-active");
const paletteColorActiveNames = ref(["1"]);
const paletteColorHandleChange = (val: string[]) => {
  if (val.length === 0) {
    paletteColorIsActive.value = "";
  } else {
    paletteColorIsActive.value = "is-active";
  }
};

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
  if (!window.location.href.includes("palette")) {
    router.push("/palette");
  }
};
</script>

<style scoped lang="less">
@font-face {
  font-family: "PingFang SC";
  src: url("../font/苹方黑体-中黑-简.ttf");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "PingFang SC";
  src: url("../font/苹方黑体-准-简.ttf");
  font-weight: 400;
  font-style: normal;
}

#logo {
  width: 100%;
  left: 0;
  top: 0;
}

.el-col,
.el-row,
.el-collapse {
  width: 100%;
}

.el-collapse :deep(.el-collapse-item__arrow) {
  display: none;
}

.el-collapse-item-title {
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .el-collapse-item-title-text {
    display: flex;
    align-items: center;

    font-family: "PingFang SC", serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;

    letter-spacing: -0.01px;

    color: #303133;
  }

  .el-collapse-item-title-distance-block {
    width: 1vw;
  }

  .el-collapse-item-title-arrow.is-active {
    transform: rotate(90deg);
  }

  .el-collapse-item-title-btn {
    margin-right: 10px;

    font-family: "PingFang SC", serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;

    color: #ffffff;
  }
}

.el-collapse :deep(.el-collapse-item__content) {
  margin-top: 24px;
}

.basic-color-record {
  margin-bottom: 20px;
}

.color-block {
  width: 32px;
  height: 32px;
  border-radius: 4px;

  justify-content: space-between;
}

.color-text {
  font-family: "PingFang SC", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  color: #606266;
}

.set-color-palette-btn {
  position: absolute;
  right: 0;
}

#delete-btn {
  flex-direction: row-reverse;
}

#slider-row {
  width: 100%;
  padding-right: 10px;
  padding-bottom: 24px;
  .el-slider {
    margin-left: 12px;
  }
}

.gradient {
  width: 100%;
  height: 40px;

  margin-bottom: 16px;

  justify-content: space-between;
  align-items: center;

  .gradient-block {
    width: 90%;
    height: 100%;

    padding: 4px;

    border: 1px solid #dcdfe6;
    border-radius: 4px;

    .gradient-color-block {
      height: 100%;
    }
  }
}
</style>
