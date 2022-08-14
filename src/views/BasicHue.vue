<template>
  <div class="common-layout">
    <el-container>
      <el-header height="120px">
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
                    id="h"
                    class="input-slider"
                    channel-id="H"
                    :lower-limit="0"
                    :upper-limit="360"
                    :step="1"
                    :default-value="hDefault"
                  />
                  <input-slider
                    id="c"
                    class="input-slider"
                    channel-id="C"
                    :lower-limit="0.0"
                    :upper-limit="100.0"
                    :step="0.01"
                    :default-value="cDefault"
                  />
                  <input-slider
                    id="l"
                    class="input-slider"
                    channel-id="L"
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
import { Ref, ref, watch } from "vue";
import InputSlider from "@/components/input-slider.vue";
import { PRESETS } from "@/assets/presets";
import type { presetValueType } from "@/type/type";
import * as d3 from "d3";
import { useHCLStore } from "@/stores/HCL";

const hclColor = useHCLStore();

const hC = 100.0;
const hL = 75.0;

const cH = 340;
const cL = 80.0;

const lH = 0;
const lC = 0.0;

const hMin = ref(d3.hcl(hclColor.H[0], hC, hL).formatRgb());
const h1 = ref(
  d3
    .hcl(hclColor.H[0] + (hclColor.H[1] - hclColor.H[0]) / 8, hC, hL)
    .formatRgb()
);
const h2 = ref(
  d3
    .hcl(hclColor.H[0] + (hclColor.H[1] - hclColor.H[0]) / 4, hC, hL)
    .formatRgb()
);
const h3 = ref(
  d3
    .hcl(hclColor.H[0] + ((hclColor.H[1] - hclColor.H[0]) * 3) / 8, hC, hL)
    .formatRgb()
);
const h4 = ref(
  d3
    .hcl(hclColor.H[0] + (hclColor.H[1] - hclColor.H[0]) / 2, hC, hL)
    .formatRgb()
);
const h5 = ref(
  d3
    .hcl(hclColor.H[0] + ((hclColor.H[1] - hclColor.H[0]) * 5) / 8, hC, hL)
    .formatRgb()
);
const h6 = ref(
  d3
    .hcl(hclColor.H[0] + ((hclColor.H[1] - hclColor.H[0]) * 3) / 4, hC, hL)
    .formatRgb()
);
const h7 = ref(
  d3
    .hcl(hclColor.H[0] + ((hclColor.H[1] - hclColor.H[0]) * 7) / 8, hC, hL)
    .formatRgb()
);
const hMax = ref(d3.hcl(hclColor.H[1], hC, hL).formatRgb());
const cMin = ref(d3.hcl(cH, hclColor.C[0], cL).formatRgb());
const cMax = ref(d3.hcl(cH, hclColor.C[1], cL).formatRgb());
const lMin = ref(d3.hcl(lH, lC, hclColor.L[0]).formatRgb());
const lMax = ref(d3.hcl(lH, lC, hclColor.L[1]).formatRgb());

watch(hclColor, (newValue) => {
  hMin.value = d3.hcl(newValue.H[0], hC, hL).formatRgb();
  h1.value = d3
    .hcl(newValue.H[0] + (newValue.H[1] - newValue.H[0]) / 8, hC, hL)
    .formatRgb();
  h2.value = d3
    .hcl(newValue.H[0] + (newValue.H[1] - newValue.H[0]) / 4, hC, hL)
    .formatRgb();
  h3.value = d3
    .hcl(newValue.H[0] + ((newValue.H[1] - newValue.H[0]) * 3) / 8, hC, hL)
    .formatRgb();
  h4.value = d3
    .hcl(newValue.H[0] + (newValue.H[1] - newValue.H[0]) / 2, hC, hL)
    .formatRgb();
  h5.value = d3
    .hcl(newValue.H[0] + ((newValue.H[1] - newValue.H[0]) * 5) / 8, hC, hL)
    .formatRgb();
  h6.value = d3
    .hcl(newValue.H[0] + ((newValue.H[1] - newValue.H[0]) * 3) / 4, hC, hL)
    .formatRgb();
  h7.value = d3
    .hcl(newValue.H[0] + ((newValue.H[1] - newValue.H[0]) * 7) / 8, hC, hL)
    .formatRgb();
  hMax.value = d3.hcl(newValue.H[1], hC, hL).formatRgb();
  cMin.value = d3.hcl(cH, newValue.C[0], cL).formatRgb();
  cMax.value = d3.hcl(cH, newValue.C[1], cL).formatRgb();
  lMin.value = d3.hcl(lH, lC, newValue.L[0]).formatRgb();
  lMax.value = d3.hcl(lH, lC, newValue.L[1]).formatRgb();
});

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
  console.log(d3.hcl(defaultValue[1], defaultValue[3], defaultValue[5]).rgb());
  hDefault.value = [defaultValue[0], defaultValue[1]];
  cDefault.value = [defaultValue[2], defaultValue[3]];
  lDefault.value = [defaultValue[4], defaultValue[5]];
};
</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  .el-header {
    height: 20%;

    .title {
      margin: 10px 0;
    }

    .el-row {
      height: 100%;
    }
    .input-slider {
      margin: 10px 0;
    }
  }
}

:deep(.slider-block) {
  #h {
    .el-slider__bar {
      background-image: linear-gradient(
        to right,
        v-bind(hMin),
        v-bind(h1),
        v-bind(h2),
        v-bind(h3),
        v-bind(h4),
        v-bind(h5),
        v-bind(h6),
        v-bind(h7),
        v-bind(hMax)
      );
    }
  }

  #c {
    .el-slider__bar {
      background-image: linear-gradient(to right, v-bind(cMin), v-bind(cMax));
    }
  }

  #l {
    .el-slider__bar {
      background-image: linear-gradient(to right, v-bind(lMin), v-bind(lMax));
    }
  }
}
</style>
