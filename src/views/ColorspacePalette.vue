<template>
<div class="container"></div>

</template>

<script setup>
import * as d3 from "d3"
import * as chroma from "chroma-js"
import { onMounted } from "vue";
import { select } from "d3";

const data=[];
// for(let l=0; l <= 100; l+= 10){
//   for(let h=0;h<=360;h+=15){
//     for(let c=100;c>=0;c -=15){
//
//       data.push(chroma.hcl(h,c,l));
//
//     }
//   }
//
// }

for(let l = 0; l <= 100; l += 10){
  for (let a =127;a >= -128;a -=10) {
    for(let b = 127;b >= -128;b -= 13) {

        data.push(chroma.lab(l, a, b));
      }
    }
}


onMounted(()=>{
  init();

})

function init(){
  const svg =d3.select(".container").append("svg").attr("width","100%").attr("height","100%");
  const node = svg.append("g")
    .attr("width",300)
    .attr("height",150)
    .selectAll("circle")
    .data(data)
    .join("circle")
    .attr("fill",(d)=>{
       return d;
    })
    .attr("r",5)
    .attr("cx",(d)=>{
      let x= (10 - 10 * (chroma(d).lab()[1] - 0.2 * chroma(d).lab()[0] - 0.2 * chroma(d).lab()[2]))/6+150;
      console.log(x);
      return x;
    })
    .attr("cy",(d)=>{
      let y=(9 * (chroma(d).lab()[2] - 1.1 * chroma(d).lab()[0] + 0.1 * chroma(d).lab()[1]))/6+220;
      console.log(y);
      return y;
    })
  return svg.node();
}

</script>

<style>
.container{
  height: 100%;
  width: 100%;
}
</style>