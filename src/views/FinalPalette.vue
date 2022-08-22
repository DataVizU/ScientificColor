<template>
  <el-container>
    <el-col>
      <el-collapse>
        <el-collapse-item
          v-for="(palette, index1) in colorStore.palettes"
          v-bind:key="index1"
          :name="index1"
        >
          <template #title>
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
          </template>
          <el-row class="color-block">
            <el-col>{{ palette.toString().replace(/,/g, ", ") }}</el-col>
            <el-col>{{
              palette
                .map((hexColor: string) => colorChange.hexToRgb(hexColor).rgb)
                .toString()
                .replace(/,/g, ", ")
            }}</el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-container>
</template>

<script setup lang="ts">
import { uesColorStore } from "@/stores/color";

const colorStore = uesColorStore();

const colorChange = {
  rgbToHex: function (val: string) {
    //RGB(A)颜色转换为HEX十六进制的颜色值
    let r;
    let g;
    let b;
    let a;
    //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
    const regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/;
    const rsa = val.replace(/\s+/g, "").match(regRgba);
    if (rsa) {
      r = parseInt(rsa[1]).toString(16);
      r = r.length == 1 ? "0" + r : r;
      g = (+rsa[2]).toString(16);
      g = g.length == 1 ? "0" + g : g;
      b = (+rsa[3]).toString(16);
      b = b.length == 1 ? "0" + b : b;
      a = +(rsa[5] ? rsa[5] : 1) * 100;
      return {
        hex: "#" + r + g + b,
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
        alpha: Math.ceil(a),
      };
    } else {
      return { hex: "无效", alpha: 100 };
    }
  },
  hexToRgb: function (val: string) {
    //HEX十六进制颜色值转换为RGB(A)颜色值
    // 16进制颜色值的正则
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 把颜色值变成小写
    let color = val.toLowerCase();
    let result = "";
    if (reg.test(color)) {
      let i;
      // 如果只有三位的值，需变成六位，如：#fff => #ffffff
      if (color.length === 4) {
        let colorNew = "#";
        for (i = 1; i < 4; i += 1) {
          colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
        }
        color = colorNew;
      }
      // 处理六位的颜色值，转为RGB
      const colorChange = [];
      for (i = 1; i < 7; i += 2) {
        colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
      }
      result = "rgb(" + colorChange.join(",") + ")";
      return {
        rgb: result,
        r: colorChange[0],
        g: colorChange[1],
        b: colorChange[2],
      };
    } else {
      result = "无效";
      return { rgb: result };
    }
  },
};
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  width: 100%;
}

.color-block {
  border-radius: 4px;
  min-height: 36px;
  width: 100%;
  justify-content: space-between;
}
</style>
