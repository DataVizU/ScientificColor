<template>
<div class="container"></div>

</template>

<script setup>
import * as d3 from "d3"
import * as chroma from "chroma-js"
import { onMounted } from "vue";
import { select } from "d3";

const data=[];

for(let h=0;h<=360;h+=5){
  for(let c=100;c>=0;c -=5){
    for(let l=100;l>=0;l-=5){
      data.push(chroma.hcl(h,c,l));
    }
  }
}


// console.log(colorSamples);

// const data=["red","orange","blue","green","yellow","#ffffff","#000000"];
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
      let x= (10 - 10 * (chroma(d).lab()[1] - 0.25 * chroma(d).lab()[0] - 0.3 * chroma(d).lab()[2]))/10+120;
      console.log(x);
      return x;
    })
    .attr("cy",(d)=>{
      let y=(8 * (chroma(d).lab()[2] - 1.1 * chroma(d).lab()[0] + 0.1 * chroma(d).lab()[1]))/10+200;
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