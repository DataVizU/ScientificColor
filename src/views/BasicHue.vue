<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="title">色彩空间</div>
            <el-row>
              <el-col :span="12">
                <el-cascader
                  placeholder="预设"
                  v-model="presetValue"
                  :options="presetOptions"
                  @change="presetHandleChange"
                />
                <div class="slider-block">
                  <input-slider
                    id="H"
                    :lower-limit="0"
                    :upper-limit="360"
                    :step="1"
                    :default-value="hDefault"
                  />
                  <input-slider
                    id="C"
                    :lower-limit="0.0"
                    :upper-limit="100.0"
                    :step="0.01"
                    :default-value="cDefault"
                  />
                  <input-slider
                    id="L"
                    :lower-limit="0.0"
                    :upper-limit="100.0"
                    :step="0.01"
                    :default-value="lDefault"
                  />
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content ep-bg-purple-light" />
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <div class="grid-content ep-bg-purple" />
          </el-col>
        </el-row>
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, Ref, ref, watch } from "vue";
import InputSlider from "@/components/input-slider.vue";
import { PRESETS } from "@/assets/presets";
import type { presetValueType } from "@/type/type";

const presetValue: Ref<[presetValueType] | never[]> = ref([]);

const hDefault = ref([0, 360]);

const cDefault = ref([0.0, 100.0]);

const lDefault = ref([0.0, 100.0]);

const presetOptions = [
  {
    value: "presets",
    label: "预设集",
    disabled: true,
  },
  {
    value: "allColors",
    label: "全部颜色",
  },
  {
    value: "defaultPreset",
    label: "默认",
  },
  {
    value: "colorblindFriendly",
    label: "色盲友好",
  },
  {
    value: "fancyLight",
    label: "绚丽",
  },
  {
    value: "fancyDark",
    label: "绚丽（黑暗模式）",
  },
  {
    value: "separator1",
    label: "---",
    disabled: true,
  },
  {
    value: "shades",
    label: "阴影",
  },
  {
    value: "tarnish",
    label: "暗淡",
  },
  {
    value: "pastel",
    label: "柔和",
  },
  {
    value: "pimp",
    label: "PIMP",
  },
  {
    value: "intense",
    label: "热烈",
  },
  {
    value: "fluo",
    label: "荧光",
  },
  {
    value: "separator2",
    label: "---",
    disabled: true,
  },
  {
    value: "redRoses",
    label: "红玫瑰",
  },
  {
    value: "ochreSand",
    label: "赭石砂",
  },
  {
    value: "yellowLime",
    label: "黄石灰",
  },
  {
    value: "greenMint",
    label: "绿薄荷",
  },
  {
    value: "iceCube",
    label: "冰块",
  },
  {
    value: "blueOcean",
    label: "蓝海",
  },
  {
    value: "indigoNight",
    label: "靛蓝之夜",
  },
  {
    value: "purpleWine",
    label: "紫葡萄酒",
  },
];

const presetHandleChange = (value: [presetValueType]) => {
  const defaultValue = PRESETS[value[0]];
  hDefault.value = [defaultValue[0], defaultValue[1]];
  cDefault.value = [defaultValue[2], defaultValue[3]];
  lDefault.value = [defaultValue[4], defaultValue[5]];
};
</script>

<style scoped lang="less"></style>
