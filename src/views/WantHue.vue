<script setup>


</script>

<template>
  <div class="all">
    <div class="navbar">
      <a href="http://vis4.net/blog/posts/mastering-multi-hued-color-scales/" class="nav nav-home">I want hue</a>
      <a class="nav">Tutorials</a>
      <a class="nav">Examples</a>
      <a class="nav">Theory</a>
      <a class="nav">Experiment</a>
      <a class="nav">Old version</a>
      <a class="nav">Github</a>
      <a class="nav">Issues</a>
      <a class="nav">npm</a>
      <a class="nav">Medialab Tools</a>
    </div>
    <div class="middle">
      <div class="left">
        <img src="../pics/header.png">
        <div class="slogan">i want hue</div>
      </div>
      <div class="right">
        Colors for data scientists. Generate and refine palettes of optimally distinct colors.
      </div>

    </div>
    <div class="body">
      <div class="left half">
        <h3 class="title">Color space</h3>
        <hr>
        <div class="space-main">
          <div class="left">
            <select ref="type" @change="Change">
              <option value="default">Default present</option>
              <option value="all">All colors</option>
              <option value="colorblind">Colorblind friendly</option>
              <option value="fancy-light">Fancy(light background)</option>
              <option value="fancy-dark">Fancy(dark background)</option>
              <option value="shades">Shades</option>
              <option value="tarnish">Tarnish</option>
              <option value="pastel">Pastel</option>
              <option value="pimp">Pimp</option>
              <option value="intense">Intense</option>
              <option value="fluo">Fluo</option>
              <option value="red-roses">Red Roses</option>
              <option value="ochre-sand">Ochre Sand</option>
              <option value="yellow-lime">Yellow Lime</option>
              <option value="green-mint">Green Mint</option>
              <option value="ice-cube">Ice Cube</option>
              <option value="blue-ocean">Blue Ocean</option>
              <option value="indigo-night">Indigo Night</option>
              <option value="purple-wine">Purple Wine</option>


            </select>
            <div class="range">
              <div class="arg">
                <div class="key">H</div>
                <input class="first" :value="stateh.from">
                <div class="color-range" ref="canvash">
                  <input type="range" max="360" min="0" class="input1" id="rangeh1" v-model="stateh.to">
                  <input type="range" max="360" min="0" class="input2" id="rangeh2" v-model="stateh.from">
                </div>

                <input class="second" :value="stateh.to">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">C</div>
                <input class="first" :value="statec.from">
                <div class="color-range"  >
                  <input type="range" max="100" min="0" class="input1" id="rangec1" v-model="statec.to" >
                  <input type="range" max="100" min="0" class="input2" id="rangec2" v-model="statec.from">
                </div>

                <input class="second" :value="statec.to">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">L</div>
                <input class="first" :value="statel.from">
                <div class="color-range">
                  <input type="range" max="100" min="0" class="input1" id="rangel1" v-model="statel.to">
                  <input type="range" max="100" min="0" class="input2" id="rangel2" v-model="statel.from">
                </div>

                <input class="second" :value="statel.to">
              </div>

            </div>
          </div>

        </div>

      </div>
      <div class="right half">
        <h3 class="title">Palette</h3>
        <hr>
        <div class="choose">
          <input v-model="num">
          <div class="colors">colors</div>
          <select ref="cluster" >
            <option value="k-means">soft(k-Means)</option>
            <option value="force-vector">hard(Force vector)</option>
          </select>
        </div>
        <button @click="makePalette">Make a palette</button>
        <div class="vessel">
          <div v-for="index of num" :key="index" >
            <div ref="palettes" class="palettes"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch,watchEffect } from "vue";
import iwanthue from "iwanthue";
import { presets } from "@/stores/presets";
import chroma from "chroma-js";



const palettes=ref();
const num=ref(4);
const cluster=ref();
const type=ref();

const stateh = reactive({
  from:0,
  to:360
})
const statec=reactive({
  from:0,
  to:100
})
const statel=reactive({
  from:0,
  to:100
})
const canvash=ref();

// const valueRange=reactive({
//   hmin:0,
//   hmax:360,
//   cmin:0,
//   cmax:100,
//   lmin:0,
//   lmax:100
// })

// watch(type,(type,prevtype)=>{
//     console.log("YES");
//     const typeValue=type.value;
//     const present=presets[typeValue];
//     valueRange.hmin=present[0];
//   }
//   ,{
//   deep:true,
// })//watch失效

function Change(event){
  const present=presets[event.target.value];
  stateh.from=present[0];
  stateh.to=present[1];
  statec.from=present[2];
  statec.to=present[3];
  statel.from=present[4];
  statel.to=present[5];
}



onMounted(()=>{
  canvash.value.style.background="linear-gradient(to right, " + chroma.scale(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']).colors(10000).join(",")+")";
})

onMounted(()=>{
  const rangeh1=document.getElementById("rangeh1");
  const rangeh2=document.getElementById("rangeh2");
  const rangec1=document.getElementById("rangec1");
  const rangec2=document.getElementById("rangec2");
  const rangel1=document.getElementById("rangel1");
  const rangel2=document.getElementById("rangel2");
  setRange(rangeh1,rangeh2,stateh,360);
  setRange(rangec1,rangec2,statec,100);
  setRange(rangel1,rangel2,statel,100);
})
function setRange(range1,range2,state,max){

  range1.addEventListener('input', function () {
    state.to = parseInt(max * (this.value - this.min) / (this.max - this.min));
  });
  range2.addEventListener("input",function(){
    console.log(stateh.from);
    console.log(this.value);
    state.from = parseInt(max * (this.value - this.min)/(this.max - this.min));
  });
}




function makePalette(event){
  event.target.innerText="Roll Palette"
  const clustering=cluster.value.value;
  const colorSpace=type.value.value;
  const paletteColor=iwanthue(num.value,{
    clustering:clustering,
    colorSpace:colorSpace
  });
  for(const[index,item] of palettes.value.entries()){
    item.style.backgroundColor=paletteColor[index];
  }
}

</script>

<style scoped lang="scss">

@mixin input-focus{
  box-shadow: 0 0 8px 2px rgba(73,228,253,0.3);
  border-color: rgb(73,228,253);
  transition: 0.3s;
  outline: none;
}



.all{
  width: 100%;
  height: 100%;
  position: relative;
  .navbar{
    flex-wrap: nowrap;
    background-color: black;
    position: sticky;
    display: flex;
    justify-content: space-around;
    height: 50px;
    max-height: 50px;
    .nav{
      color: rgb(108,117,125);
      font-size: 15px;
      min-width: 50px;
      max-height: 40px;
      white-space: nowrap;
      text-decoration: none;

      &:hover{
        color: white;
      }
    }
    .nav:not(:first-child){
      @media (max-width: 1000px) {
        display: none;
      }
    }
    .nav-home{
      font-size: 20px;
    }
  }
  .middle{
    height: 200px;
    padding: 20px;
    width: 100%;

    display: flex;
    @media (max-width: 1000px) {
      flex-wrap: wrap;
    }
    justify-content: space-between;
    >.left{
      display: flex;
      align-items: center;
      >img{

      }
      >.slogan{
        font-size: 50px;
        margin-left: 20px;
        display: flex;
        align-items: center;
        min-width: 400px;
      }
    }
    >.right{
      color: rgb(153,153,153);
      font-size: 18px;
      height: 100%;
      display: flex;
      align-items: center;
      @media (max-width: 1000px) {
        height: 30%;
      }
    }

  }
  .body{
    background-color: rgb(244,244,244);
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1000px) {
      flex-wrap: wrap;
    }

    >.left{
      width: 67%;
      @media (max-width: 1000px) {
        width: 100%;
      }
    }
    >.right{
      width: 30%;
      @media (max-width: 1000px) {
        width: 100%;
      }
      >.choose{
        display: flex;
        width: 100%;
        height: 30px;
        line-height: 30px;
        >input{
          width: 30px;
          &:focus{
            @include input-focus();
          }

        }
        >.colors{
          border: solid 1px;
          height: 30px;
          width: 50px;
          margin-left: -2px;
          font-size: 12px;
          text-align: center;
        }
        >select{
          height: 30px;
        }
      }
      >button{
        margin-top: 10px;
        width: 100%;
        border-radius: 6px;
        border: 1px rgba(0,0,0,0.3) solid;
        &:hover{
          filter: brightness(97%);
          transition: 0.3s;
        }
      }
      >.vessel{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        >div{
          height: 80px;
          width: 50px;
          background-image: url("../pics/palette_hole.png");
          margin-right: 10px;
          margin-top: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          >.palettes{
            border-radius: 5px;
            height: 80%;
            width: 80%;
            transition-property: height;
            transition: 1s;
          }
        }
      }
    }
    >.half{

      >.space-main{
        width: 100%;
        height: 100%;
        padding: 15px;
        >.left{
          width: 300px;
          >select{
            width: 200px;
          }
          >.range{
            >.arg{
              width: 100%;
              height: 30px;
              margin-top: 10px;
              display: flex;
              >.key{
                background-color: transparent;
                border: solid 1px;
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 3px;
              }
              >input{
                width: 40px;
                outline: none;
                &:focus{
                  @include input-focus();
                }
              }
              >.first{
                margin-left: -3px;
              }
              >.color-range{
                width: 200px;
                position: relative;

                #rangeh2{
                  &::-webkit-slider-runnable-track{
                    background: linear-gradient(to right, rgb(244,244,244) calc(v-bind("stateh.from")/360 *100%), transparent calc(v-bind("stateh.from")/360 *100%) calc((v-bind("stateh.to")/360)*100%), rgb(244,244,244) 0%);

                  }
                }
                #rangec2{
                  &::-webkit-slider-runnable-track{
                    background: linear-gradient(to right, rgb(244,244,244) calc(1% * v-bind("statec.from")), transparent calc(1% * v-bind("statec.from")) calc(1% * (v-bind("statec.to"))), rgb(244,244,244) 0%);

                  }
                }
                #rangel2{
                  &::-webkit-slider-runnable-track{
                    background: linear-gradient(to right, rgb(244,244,244) calc(1% * v-bind("statel.from")), transparent calc(1% * v-bind("statel.from")) calc(1% * (v-bind("statel.to"))), rgb(244,244,244) 0%);
                  }
                }
                >input{
                  position: absolute;
                  height: 30px;
                  pointer-events: none;
                  width: 100%;
                  -webkit-appearance: none;
                  background: none;
                  &::-moz-range-track{
                    position: relative;
                    height: 30px;
                    z-index: -1;
                  }
                  &::-webkit-slider-thumb{
                    pointer-events: auto;
                    -webkit-appearance: none;
                    height: 30px;
                    position: relative;
                    width: 16px;
                    z-index: 1;

                  }
                }
                >.input2{
                  &::-webkit-slider-thumb{
                    background-color: black;
                    clip-path: polygon(0 0, 0% 100%, 100% 50%);
                  }
                }
                >.input1{
                  &::-webkit-slider-thumb{
                    background-color: black;
                    clip-path: polygon(0 50%, 100% 100%, 100% 0%);
                  }
                }
              }
            }
          }
        }
      }
    }

  }
}

</style>