
<template>
  <div class="all">
    <div class="navbar">
      <a href="http://vis4.net/blog/posts/mastering-multi-hued-color-scales/" class="nav nav-home">I want hue</a>
      <a href="https://iwanthue.datavizu.app/tutorial/" class="nav">Tutorials</a>
      <a href="https://iwanthue.datavizu.app/examples/" class="nav">Examples</a>
      <a href="https://iwanthue.datavizu.app/theory/" class="nav">Theory</a>
      <a href="https://iwanthue.datavizu.app/experiment/" class="nav">Experiment</a>
      <a class="nav">Old version</a>
      <a href="https://github.com/medialab/iwanthue" class="nav">Github</a>
      <a href="https://github.com/medialab/iwanthue/issues" class="nav">Issues</a>
      <a href="https://www.npmjs.com/package/iwanthue" class="nav">npm</a>
      <a href="http://tools.medialab.sciences-po.fr/" class="nav">Medialab Tools</a>
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
                <div class="color-range" ref="canvasc" >
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
                <div class="color-range" ref="canvasl">
                  <input type="range" max="100" min="0" class="input1" id="rangel1" v-model="statel.to">
                  <input type="range" max="100" min="0" class="input2" id="rangel2" v-model="statel.from">
                </div>

                <input class="second" :value="statel.to">
              </div>

            </div>
            <br>
            <div class="form-check">
              <input class="form-check-input" type="checkbox"  value="" id="flexCheckDefault" @click="ChangeBlind">
              <label class="form-check-label" for="flexCheckDefault" >
                improve for the colorblind(slow)

              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox"  id="flexCheckChecked" @change="ChangeTheme">
              <label class="form-check-label" for="flexCheckChecked" >
                Dark background
              </label>
            </div>
          </div>
          <div class="right">
            <ColorspacePalette class="picture" :hfrom="stateh.from" :hto="stateh.to" :cfrom="statec.from" :cto="statec.to" :lfrom="statel.from" :lto="statel.to"></ColorspacePalette>

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
          <div v-for="(index) in arr" :key="index" >
            <div ref="palettes" class="palettes"></div>
          </div>
        </div>
        <div class="sort" v-if="bottom===true">
          Sort by
          <span @click="paletteColor.sort(SortbyHue)">hue</span>
          <span @click="paletteColor.sort(SortbyChroma)">chroma</span>
          <span @click="paletteColor.sort(SortbyLightness)">lightness</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="bottom===true">
      <div class="colors">
        <h4>Colors</h4>
        <div class="color">
          <div v-for="(item,index) in paletteColor" :key="index">
            <div class="color-color" :style="{backgroundColor:item}"></div>
            <div class="describe">
              <div class="arg">
                <div class="number">{{item}}</div>
                <div class="key">HEX</div>
              </div>
              <div class="arg">
                <div class="number">{{chroma(item).rgb().toString()}}</div>
                <div class="key">RGB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="json">
        <h4>JSON</h4>
        <div>
          <h5>HEX json</h5>
          <div class="pre" >
            <div v-for="(item,index) in paletteColor" :key="index">"{{item}}",</div>
          </div>
        </div>
        <div>
          <h5>RGB json</h5>
          <div class="pre">
            <div v-for="(item,index) in paletteColor" :key="index">{{chroma(item).rgb()}},</div>
          </div>
        </div>
        <div>
          <h5>HCL json</h5>
            <div class="pre">
              <div v-for="(item,index) in paletteColor" :key="index">{{chroma(item).hcl().map((item)=>item.toFixed(3))}},</div>
            </div>
        </div>
        <div>
          <h5>LAB json</h5>
          <div class="pre">
            <div v-for="(item,index) in paletteColor" :key="index">{{chroma(item).lab().map((item)=>item.toFixed(3))}},</div>
          </div>
        </div>
      </div>
      <div class="json">
        <h4>CSS</h4>
        <div>
          <h5>HEX list for CSS</h5>
          <div class="pre" id="resultColors_hexlist">
            <div v-for="(item,index) in paletteColor" :key="index">{{item}}</div>
          </div>
        </div>
        <div>
          <h5>RGB list for CSS</h5>
          <div class="pre">
            <div v-for="(item,index) in paletteColor" :key="index">rgb({{chroma(item).rgb().toString()}})</div>
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
import ColorspacePalette from "./ColorspacePalette.vue"



const palettes=ref();
const num=ref(4);
const arr=ref([])
arr.value.length=num.value;

watch(num,(newnum)=>{
  arr.value.length=newnum;
})

const cluster=ref();
const bottom=ref(false);
const type=ref();
const theme=ref("white");

const stateh = reactive({
  from:0,
  to:360
})
const statec=reactive({
  from:30,
  to:80
})
const statel=reactive({
  from:35,
  to:80
})

const canvash=ref();
const canvasc=ref();
const canvasl=ref();

function Change(event){
  const present=presets[event.target.value];
  stateh.from=present[0];
  stateh.to=present[1];
  statec.from=present[2];
  statec.to=present[3];
  statel.from=present[4];
  statel.to=present[5];
}


//不太清楚背景颜色是根据什么渲染出来的
onMounted(()=>{
  canvash.value.style.background="linear-gradient(to right, " + chroma.scale(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']).colors(10000).join(",")+")";
  canvasc.value.style.background="linear-gradient(to right, " + chroma.scale(["white","violet"]).colors(10000).join(",")+")";
  canvasl.value.style.background="linear-gradient(to right, " + chroma.scale(['black',"white"]).colors(10000).join(",")+")";
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
    state.from = parseInt(max * (this.value - this.min)/(this.max - this.min));
  });
}

const paletteColor=ref();
const isBlind=ref("euclidean");

function makePalette(event){
  bottom.value=true;
  event.target.innerText="Roll Palette"
  const clustering=cluster.value.value;
  console.log(num.value);
  paletteColor.value=iwanthue(Number(num.value),{
    clustering:clustering,
    colorSpace:[stateh.from,stateh.to,statec.from,statec.to,statel.from,statel.to],
    distance:isBlind.value,
  });
  for(const[index,item] of palettes.value.entries()){
    item.style.backgroundColor=paletteColor.value[index];
  }
}

function ChangeBlind(){
  isBlind.value=isBlind.value==="euclidean"?"compromise":"euclidean";
}

function ChangeTheme(){
  theme.value=theme.value==="white"?"black":"white";
  document.documentElement.setAttribute("data-theme",theme.value);
}

function SortbyHue(a, b){
  if(chroma(a).hcl()[0] > chroma(b).hcl()[0]) return 1;
  else return -1;
}
function SortbyChroma(a, b){
  if(chroma(a).hcl()[1] > chroma(b).hcl()[1]) return 1;
  else return -1;
}
function SortbyLightness(a, b){
  if(chroma(a).hcl()[2] > chroma(b).hcl()[2]) return 1;
  else return -1;
}

watch(stateh,(stateh)=>{
  if(stateh.from > stateh.to){
    document.documentElement.setAttribute("hue-reverse",true);
    console.log(stateh.to, stateh.from);
  }
  else{
    document.documentElement.setAttribute("hue-reverse",false);
  }
})



defineProps({
  hfrom:Number,
  hto:Number,
  cfrom:Number,
  cto:Number,
  lfrom:Number,
  lto:Number
})

</script>

<style scoped lang="scss">
$w-bg-color:rgb(244,244,244);
$b-bg-color:rgb(51,51,51);
$w-font-color:rgb(238,238,238);
$b-font-color:rgb(85,85,85);
$hue-track-bg:linear-gradient(to right, rgb(244,244,244) calc(v-bind("stateh.from")/360 *100%), transparent calc(v-bind("stateh.from")/360 *100%) calc((v-bind("stateh.to")/360)*100%), rgb(244,244,244) 0%);
$hue-reverse-track-bg:linear-gradient(to right, transparent calc(v-bind("stateh.to")/360 *100%), rgb(244,244,244) calc(v-bind("stateh.to")/360 *100%) calc((v-bind("stateh.from")/360)*100%), transparent 0%);

@mixin bg-color(){
  [data-theme="white"] & {
    background-color: $w-bg-color;
    color: $b-font-color;
  }
  [data-theme="black"] & {
    background-color: $b-bg-color;
    color: $w-font-color;
  }
}

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
    top: 0;
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
    @include bg-color;
    transition: 0.3s;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1000px) {
      flex-wrap: wrap;
    }

    >.left{
      width: 77%;
      @media (max-width: 1000px) {
        width: 100%;
      }
    }
    >.right{
      width: 20%;
      @media (max-width: 1000px) {
        width: 100%;
      }
      >.choose{
        display: flex;
        width: 90%;
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
          width: 130px;
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
          [data-theme="black"] & {
            background-image: url("../pics/palette_hole_dark.png");
          }
          [data-theme="white"] & {
            background-image: url("../pics/palette_hole.png");
          }
          transition: 0.5s;
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
      >.sort{
        font-size: 12px;
        margin-top: 20px;

        >span{
          color: #08c;
          cursor: pointer;
          margin-right: 10px;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
    >.half{

      >.space-main{
        width: 100%;
        height: 100%;
        padding: 15px;
        display: flex;
        @media (max-width: 1000px) {
          flex-wrap: wrap;
        }
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
                  &::-webkit-slider-runnable-track {
                    [hue-reverse=true] & {
                      background: $hue-reverse-track-bg;
                    }

                    [hue-reverse=false] & {
                      background: $hue-track-bg;
                    }

                    //background: $hue-track-bg;
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
                    background-color: transparent;
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
        >.right{
          width: 100%;
          margin-left: 10px;
          height: 300px;
          margin-bottom: 20px;
          >.picture{
            position: relative;
            z-index: 1;
          }
        }
      }
    }

  }
  .bottom{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    @media (max-width: 1000px) {
      flex-wrap: wrap;
    }
    padding: 10px;
    >.colors{
      width: 47%;
      @media (max-width: 1000px) {
        width: 100%;
      }
      >.color{
        width: 100%;
        >div{
          width: 100%;
          height: 125px;
          margin-bottom: 20px;
          //background-color: red;
          >.color-color{
            width: 100%;
            height: 80px;
          }
          >.describe{
            display: flex;
            background-color: rgb(238,238,238);
            align-items: center;
            box-sizing: border-box;
            padding: 0 10px;
            >.arg{
              height: 38px;
              width: 80px;
              margin-right: 15px;
              >.number{
                font-size: 16px;
                font-weight: bold;
                color: #888;
              }
              >.key{
                font-size: 10px;
                color: #AAA;
                line-height: 8px;
              }
            }
          }
        }
      }

    }
    >.json{
      width: 23%;
      @media (max-width: 1000px) {
        width: 100%;
      }
      >div{
        margin-bottom: 10px;
        >h5{
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
        }
        >.pre{
          font-size: 13px;
          background-color: #f5f5f5;;
          border-radius: 5px;
          border: solid 1px rgba(0,0,0,0.3);
          box-sizing: border-box;
          padding: 10px;
        }
      }
    }
  }
}

</style>