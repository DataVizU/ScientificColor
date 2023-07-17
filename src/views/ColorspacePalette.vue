<template>
  <div class="container"></div>
</template>

<script setup>
import * as d3 from "d3";
import chroma from "chroma-js";
import { onMounted, watch } from "vue";

const props = defineProps({
  hfrom: [Number, String],
  hto: [Number, String],
  cfrom: [Number, String],
  cto: [Number, String],
  lfrom: [Number, String],
  lto: [Number, String],
});
const data = [];
function CreateData() {
  for (let l = 0; l <= 100; l += 10) {
    for (let a = 127; a >= -128; a -= 10) {
      for (let b = 127; b >= -128; b -= 13) {
        const color = chroma.lab(l, a, b);
        const hue = chroma(color).hcl()[0],
          c = chroma(color).hcl()[1],
          lightness = chroma(color).hcl()[2];
        if (props.hfrom > props.hto) {
          if (hue < props.hfrom && hue > props.hto) continue;
        } else if (
          hue > props.hto ||
          hue < props.hfrom ||
          c > props.cto ||
          c < props.cfrom ||
          lightness > props.lto ||
          lightness < props.lfrom
        )
          continue;
        data.push(color);
      }
    }
  }
}
CreateData();

let svg;
watch(
  props,
  () => {
    if (svg !== undefined) {
      svg.selectAll("circle").remove();
      data.length = 0;
      CreateData();
      init();
    }
  },
  { immediate: true }
);

onMounted(() => {
  svg = d3
    .select(".container")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");
  init();
});

function init() {
  svg
    .append("g")
    .attr("width", "100%")
    .attr("height", 150)
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("fill", (d) => {
      return d;
    })
    .attr("r", 5)
    .attr("cx", (d) => {
      const x =
        (10 -
          10 *
            (chroma(d).lab()[1] -
              0.2 * chroma(d).lab()[0] -
              0.2 * chroma(d).lab()[2])) /
          6 +
        150;
      return x;
    })
    .attr("cy", (d) => {
      const y =
        (9 *
          (chroma(d).lab()[2] -
            1.1 * chroma(d).lab()[0] +
            0.1 * chroma(d).lab()[1])) /
          6 +
        220;
      return y;
    });
}
</script>

<style>
.container {
  height: 100%;
  width: 100%;
}
</style>
