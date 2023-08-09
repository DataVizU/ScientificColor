<template>
  <div class="main">
    <div class="center">
      <div class="title">
        <div class="title1">Chroma.js Color Palette Helper</div>
        <div class="title2">
          This
          <a href="https://github.com/gka/chroma.js">chroma.js</a>
          -powered tool is here to help us
          <a
            href="http://vis4.net/blog/posts/mastering-multi-hued-color-scales/"
            >mastering multi-hued, multi-stops color scales.</a
          >
        </div>
      </div>
      <div class="box">
        <div class="head">
          <div class="head-title">
            What kind of palette do you want to create?
          </div>
        </div>
        <div class="box-main">
          <div class="left">
            <div class="key">Palette type:</div>
            <div
              class="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio1"
                autocomplete="off"
                @click="diverging = false"
                checked
              />
              <label class="btn btn-outline-primary" for="btnradio1"
                >sequential</label
              >

              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="btnradio2"
                autocomplete="off"
                @click="diverging = true"
              />
              <label class="btn btn-outline-primary" for="btnradio2"
                >diverging</label
              >
            </div>
          </div>
          <div class="left">
            <div class="key">Number of colors</div>
            <input
              type="number"
              id="number"
              v-bind:min="colors.length"
              v-model="colorStore.colorsNumber"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="head">
          <div class="head-title">Select and arrange input colors</div>
        </div>
        <div class="color-input" v-if="diverging === false">
          <div>
            <input
              type="text"
              v-model="colorStore.nowColor"
              class="form-control"
              id="exampleFormControlInput1"
            />
            <!--                  <div class="colors" v-if="isFocus===false">-->
            <!--                    <div v-for="color in state.init" :key="color" :style="{backgroundColor:color}">{{color}}</div>-->
            <!--                  </div>-->
          </div>
        </div>
        <div class="input-diverging" v-else>
          <div class="color-input">
            <input
              type="text"
              v-model="colorStore.nowColor"
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
          <div class="color-input">
            <input
              type="text"
              v-model="colorStore.nowColor2"
              class="form-control"
              id="exampleFormControlInput1"
            />
          </div>
        </div>
      </div>
      <div class="box">
        <div class="head">
          <div class="head-title">
            Check and configure the resulting palette
          </div>
        </div>
        <div class="middle">
          <div class="middle-left">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="method.lightness"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                correct lightness
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="method.bezier"
                id="flexCheckChecked"
              />
              <label class="form-check-label" for="flexCheckChecked">
                bezier interpolation
              </label>
            </div>
          </div>
          <div class="middle-right">
            <div class="reminder">This palette is colorblind-safe.</div>
            <div class="simulate">
              <div class="key">simulate:</div>
              <div class="btn-group2">
                <button>normal</button>
                <button>debut.</button>
                <button>prot.</button>
                <button>trit.</button>
              </div>
            </div>
          </div>
        </div>
        <div class="palette">
          <div
            v-for="(color, index) in range"
            class="palette-colors"
            :style="{ backgroundColor: range[index] }"
            :key="index"
          ></div>
        </div>
        <div class="pics">
          <div class="pic" id="lightness"></div>
          <div class="pic" id="saturation"></div>
          <div class="pic" id="hue"></div>
        </div>
      </div>
      <div class="box">
        <div class="head">
          <div class="head-title">Export the color codes</div>
        </div>
        <div id="palette">{{ range.toString() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { ref } from "vue";
import * as echarts from "echarts";
import { watch } from "vue";
import chroma from "chroma-js";
import _range from "lodash-es/range";
import { uesColorStore } from "@/stores/color";

const colors = ref([]);
const colorStore = uesColorStore();
const colors_diverging = reactive({
  colors1: [],
  colors2: [],
});
// const state = reactive({
//   init: colorStore.nowColor,
//   init1: colorStore.nowColor,
//   init2: colorStore.nowColor,
//   number: colorStore.colorsNumber,
// });
// watch(colorStore, () => {
//   state.init = state.init1 = state.init2 = colorStore.nowColor;
//   state.number = colorStore.colorsNumber;
// });

const method = reactive({
  lightness: true,
  bezier: true,
});
const diverging = ref(false);

const dataH = ref([]),
  dataS = ref([]),
  dataL = ref([]);
const range = ref([]);
const reg = /#([a-fA-F0-9]{6})/g;

watch(
  [colors, method, colorStore, diverging],
  ([colors, method, colorStore, diverging]) => {
    if (diverging === false) {
      colors.value = colorStore.nowColor.match(reg);
      if (colors.value !== null) {
        if (colors.value.length === 1)
          colors.value = autoColors(colors.value[0], colorStore.colorsNumber);
        let scale;
        if (method.bezier === true && colors.value.length > 1)
          scale = chroma.bezier(colors.value).scale();
        else scale = chroma.scale(colors.value);
        range.value = scale.colors(colorStore.colorsNumber);
        const newH = [],
          newS = [],
          newL = [];
        for (let i = 0; i < colorStore.colorsNumber; i++) {
          const tmparr = chroma(range.value[i]).hsl();
          newH.push(tmparr[0]),
            newS.push(tmparr[1] * 100),
            newL.push(tmparr[2] * 100);
        }
        (dataL.value = newL), (dataS.value = newS), (dataH.value = newH);
      }
    }

    if (diverging === true) {
      colors_diverging.colors1 = colorStore.nowColor.match(reg);
      colors_diverging.colors2 = colorStore.nowColor2.match(reg);
      if (
        colors_diverging.colors1 !== null &&
        colors_diverging.colors2 !== null
      ) {
        if (colors_diverging.colors1.length === 1)
          colors_diverging.colors1 = autoColors(
            colors_diverging.colors1[0],
            Math.ceil(colorStore.colorsNumber / 2)
          );
        if (colors_diverging.colors2.length === 1)
          colors_diverging.colors2 = autoColors(
            colors_diverging.colors2[0],
            Math.ceil(colorStore.colorsNumber / 2)
          );
        let scale1, scale2;
        if (method.bezier === true) {
          scale1 = chroma.bezier(colors_diverging.colors1).scale();
          scale2 = chroma.bezier(colors_diverging.colors2).scale();
        } else {
          scale1 = chroma.scale(colors_diverging.colors1);
          scale2 = chroma.scale(colors_diverging.colors2);
        }
        const num = Math.ceil(colorStore.colorsNumber / 2);
        if (colorStore.colorsNumber % 2) {
          const left = scale1.colors(num);
          range.value = left
            .slice(0, num - 1)
            .concat("#ffffff")
            .concat(scale2.colors(num).reverse().slice(1));
        } else {
          range.value = scale1
            .colors(num + 1)
            .slice(0, num)
            .concat(
              scale2
                .colors(num + 1)
                .reverse()
                .slice(1)
            );
        }
      }
    }
    const newH = [],
      newS = [],
      newL = [];
    for (let i = 0; i < colorStore.colorsNumber; i++) {
      const tmparr = chroma(range.value[i]).hsl();
      newH.push(tmparr[0]),
        newS.push(tmparr[1] * 100),
        newL.push(tmparr[2] * 100);
    }
    (dataL.value = newL), (dataS.value = newS), (dataH.value = newH);
  }
);

let chartH, chartS, chartL;
let optionL, optionS, optionH;

onMounted(() => {
  chartL = echarts.init(document.getElementById("lightness"));
  chartS = echarts.init(document.getElementById("saturation"));
  chartH = echarts.init(document.getElementById("hue"));

  drawChart();
  window.addEventListener("resize", () => {
    chartL.resize();
    chartS.resize();
    chartH.resize();
  });
});

watch([dataL, dataS, dataH], () => {
  if (chartL !== undefined) {
    drawChart();
  }
});

function autoGradient(color, numColors) {
  const lab = chroma(color).lab();
  const lRange = 100 * (0.95 - 1 / numColors);
  const lStep = lRange / (numColors - 1);
  const lStart = (100 - lRange) * 0.5;
  const range = _range(lStart, lStart + numColors * lStep, lStep);
  let offset = 0;
  if (!diverging.value) {
    offset = 9999;
    for (let i = 0; i < numColors; i++) {
      const diff = lab[0] - range[i];
      if (Math.abs(diff) < Math.abs(offset)) {
        offset = diff;
      }
    }
  }
  return range.map((l) => chroma.lab([l + offset, lab[1], lab[2]]));
}

function autoColors(color, numColors, reverse = false) {
  if (diverging.value) {
    const colors = autoGradient(color, 3).concat(chroma("#f5f5f5"));
    if (reverse) colors.reverse();
    return colors;
  } else {
    return autoGradient(color, numColors);
  }
}

function drawChart() {
  optionL = addOption(dataL, "lightness");
  optionS = addOption(dataS, "saturation");
  optionH = addOption(dataH, "hue");
  chartL.setOption(optionL);
  chartS.setOption(optionS);
  chartH.setOption(optionH);
}

colors.value = colorStore.nowColor.match(reg);
function addOption(data, title) {
  return {
    title: {
      text: title,
    },
    xAxis: {
      show: false,
      boundryGap: false,
      type: "category",
    },
    grid: {
      left: 40,
    },
    yAxis: {
      type: "value",
      boundryGap: false,
    },
    series: [
      {
        data: data.value,
        step: "middle",
        type: "line",
        symbol: "none",
        lineStyle: {
          color: "black",
        },
      },
    ],
  };
}
</script>

<style lang="scss">
$theme-colors: (
  "primary": rgb(108, 117, 125),
);
$btn-color: rgb(108, 117, 125);
@import "../node_modules/bootstrap/scss/bootstrap";
.main {
  width: 100%;
  background-color: rgb(244, 244, 244);
  display: flex;
  justify-content: center;
  .center {
    width: 70%;
    .title {
      margin-top: 20px;
      margin-bottom: 20px;
      .title1 {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .title2 {
        font-size: 14px;
      }
      a {
        color: rgb(0, 120, 215);
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .box {
      margin-bottom: 20px;
      background-color: white;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box;
      > .input-diverging {
        display: flex;
        justify-content: space-between;
        > .color-input {
          width: 48%;
        }
      }
      > .head {
        .head-title {
          font-size: 20px;
          font-weight: 300;
          margin-bottom: 10px;
        }
      }

      .middle {
        display: flex;
        justify-content: space-between;
        @media (max-width: 1000px) {
          flex-wrap: wrap;
        }
        .middle-right {
          margin-top: -10px;
          margin-bottom: 20px;
          @media (max-width: 1000px) {
            margin-top: 10px;
          }
          .reminder {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          }
          .simulate {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 300px;
            font-size: 12px;
            @media (max-width: 1000px) {
              flex-wrap: wrap;
            }
            .key {
              margin-right: 10px;
            }
            .btn-group2 {
              width: 240px;
              max-height: 30px;
              display: flex;
              > button {
                width: 60px;
                height: 30px;
                background-color: transparent;
                color: $btn-color;
                border: $btn-color solid 1px;
                &:focus,
                &:hover {
                  background-color: $btn-color;
                  color: white;
                }
              }
              > button:nth-child(2) {
                border-right: none;
              }
              > button:nth-child(1) {
                border-right: none;
                border-radius: 3px;
                margin-right: -2px;
              }
              > button:nth-child(4) {
                border-radius: 3px;
                margin-left: -2px;
                border-left: none;
              }
            }
          }
        }
      }
      .palette {
        width: 100%;
        height: 100px;
        border: solid 10px rgb(238, 238, 238);
        display: flex;
        .palette-colors {
          height: 100%;
          width: calc(100% / (v-bind("colorStore.colorsNumber")));
        }
      }
      #palette {
        background-color: rgb(244, 244, 244);
        padding: 10px;
        word-wrap: break-word;
      }
      #color {
        height: 30px;
        width: 100%;
        outline: none;
        &:focus {
          box-shadow: 0 0 9px 3px rgb(191, 222, 255);
          outline: none;
        }
      }
      .box-main {
        display: flex;

        @media (max-width: 1000px) {
          flex-wrap: wrap;
        }
        max-width: 100%;
        .left {
          width: 500px;
          display: flex;
          align-items: center;
          @media (max-width: 1000px) {
            flex-wrap: wrap;
            margin-bottom: 10px;
          }
          .key {
            font-weight: 300;
            margin-right: 10px;
            min-width: 90px;
          }

          #number {
            width: 50px;
            height: 36px;
            font-size: 17px;
            text-align: center;
          }
        }
      }
      .pics {
        display: flex;
        margin-top: 20px;
        @media (max-width: 1000px) {
          flex-wrap: wrap;
        }
        width: 100%;
        > .pic {
          width: calc(100% / 3);
          height: 250px;
          @media (max-width: 1000px) {
            width: 100%;
          }
        }
      }
    }
  }
}
.form-check-label {
  font-size: 15px;
  font-weight: 400;
}
</style>
