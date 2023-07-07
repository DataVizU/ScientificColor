<template>
    <div class="main">
        <div class="center">
          <div class="title">
                <div class="title1">Chroma.js Color Palette Helper</div>
                <div class="title2">This 
                    <a href="https://github.com/gka/chroma.js">chroma.js</a>
                    -powered tool is here to help us
                    <a href="http://vis4.net/blog/posts/mastering-multi-hued-color-scales/">mastering multi-hued, multi-stops color scales.</a>
                        
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
                        <div class="key">Palette type: </div>
                        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                            <label class="btn btn-outline-primary" for="btnradio1">sequential</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                            <label class="btn btn-outline-primary" for="btnradio2">diverging</label>


                        </div>
                    </div>
                    <div class="left">
                        <div class="key">Number of colors</div>
                        <input type="number" id="number" v-bind:min="colors.length" v-model="state.number" />

                    </div>
                </div>
            </div>
          <div class="box">
              <div class="head">
                <div class="head-title">Select and arrange input colors</div>
              </div>
              <div class="color-input"  tabindex="0">
                <div>
                  <input type="text" v-model="state.init" class="form-control" id="exampleFormControlInput1" />
<!--                  <div class="colors" v-if="isFocus===false">-->
<!--                    <div v-for="color in state.init" :key="color" :style="{backgroundColor:color}">{{color}}</div>-->
<!--                  </div>-->
                </div>
              </div>

            </div>
          <div class="box">
            <div class="head">
              <div class="head-title">Check and configure the resulting palette</div>
            </div>
            <div class="middle">
              <div class="middle-left">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"  v-model="method.lightness" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    correct lightness

                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="method.bezier" id="flexCheckChecked" >
                  <label class="form-check-label" for="flexCheckChecked">
                    bezier interpolation
                  </label>
                </div>
              </div>
              <div class="middle-right">
                <div class="reminder"> This palette is colorblind-safe.</div>
                <div class="simulate">
                  <div class="key">simulate:</div>
                  <div class="btn-group2">
                    <button >normal</button>
                    <button>debut.</button>
                    <button>prot.</button>
                    <button>trit.</button>
                  </div>


                </div>
              </div>

            </div>
            <div class="palette">
              <div v-for="(color, index) in range"  class="palette-colors" :style="{backgroundColor:range[index]}" :key="index"></div>
            </div>
            <div class="pics">
              <div class="pic" id="lightness" >


              </div>
              <div class="pic" id="saturation">


              </div>
              <div class="pic" id="hue" >


              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup >

import { onMounted, reactive } from "vue";
import {ref} from "vue";
import * as echarts from "echarts";
import { watch } from "vue";
import chroma from "chroma-js"

const colors=ref([]);
const state=reactive({
  init:"#00429d，#ffffff",
  number:9

})
const method=reactive({
  lightness:true,
  bezier:true
})

const datah=ref([]),datas=ref([]),datal=ref([]);
const range=ref([]);
const reg=/#([a-fA-F0-9]{6})/g;

watch([colors,method,state],([colors,method,state],[])=>{
  colors.value=state.init.match(reg);
  let scale;
  if(method.bezier===true && colors.value.length > 1) scale=chroma.bezier(colors.value).scale();
  else  scale=chroma.scale(colors.value);
  if(method.lightness===true) scale=scale.correctLightness();
  range.value=scale.colors(state.number);
  const newh=[],news=[],newl=[];
  for(let i=0;i<state.number;i++){
    const tmparr=chroma(range.value[i]).hsl();
    newh.push(tmparr[0]),news.push(tmparr[1]*100),newl.push(tmparr[2]*100);

  }
  datal.value=newl,datas.value=news,datah.value=newh;
  // console.log(datal);
},)

let charth,charts,chartl;
let optionl,options,optionh;

onMounted(()=> {
  chartl = echarts.init(document.getElementById("lightness"));
  charts = echarts.init(document.getElementById("saturation"));
  charth = echarts.init(document.getElementById("hue"))

  drawChart();
  window.addEventListener("resize", () => {
    chartl.resize();
    charts.resize();
    charth.resize();
  })
})


watch([datal,datas,datah],([datal,datas,datah],[])=>{
  if(chartl!==undefined){
    drawChart();
  }
})


function drawChart(){
  optionl = addOption(datal,"lightness")
  options = addOption(datas,"saturation");
  optionh = addOption(datah,"hue");
  chartl.setOption(optionl,);
  charts.setOption(options,);
  charth.setOption(optionh,)
}

colors.value=state.init.match(reg)
function addOption(data,title){
  return{
    title: {
      text: title
    },
    xAxis: {
      show: false,
      boundryGap: false,
      type:"category"

    },
    grid:{
      left:40
    },
    yAxis: {
      type: 'value',
      boundryGap: false,
    },
    series: [
      {
        data: data.value,
        step: "middle",
        type: "line",
        symbol: "none",
        lineStyle: {
          color: "black"
        }
      }
    ]

  };
}

</script>


<style lang="scss">
$theme-colors:(
    "primary":rgb(108,117,125)
);
$btn-color:rgb(108,117,125);
@import "../node_modules/bootstrap/scss/bootstrap";
    .main{
        width: 100%;
        background-color: rgb(244,244,244);
        display: flex;
        justify-content: center;
        .center{
            width: 70%;
            .title{
                margin-top: 20px;
                margin-bottom: 20px;
                .title1{
                    font-size: 30px;
                    margin-bottom: 10px;
                }
                .title2{
                  font-size: 14px;
                }
                a{
                    color: rgb(0,120,215);
                    &:hover{
                        text-decoration: underline;
                    }
                }
            }
            .box{
                margin-bottom: 20px;
                background-color: white;
                box-shadow: 0 0 2px 2px rgba(0,0,0,0.1);
                padding: 20px;
                box-sizing: border-box;
              >.color-input{
                position: relative;

                >div{
                  >.colors{
                    position: absolute;
                    top: 8px;
                    display: flex;
                    left: 10px;
                    >div{
                      border-radius: 5px;
                      margin-right: 10px;
                      box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);
                      width: 75px;
                      height: 23px;
                      display: flex;
                      justify-content: center;
                      align-items: center;

                    }
                  }
                }


              }
                .head{
                    .head-title{
                        font-size: 20px;
                        font-weight: 300;
                        margin-bottom: 10px;
                    }
                }
                .middle{
                    display: flex;
                    justify-content: space-between;
                  @media (max-width: 1000px) {
                    flex-wrap: wrap;
                  }
                    .middle-right{
                      margin-top: -10px;
                      margin-bottom: 20px;
                      .reminder{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 16px;
                      }
                        .simulate{
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          width: 300px;
                          font-size: 12px;
                            .key{
                                margin-right: 10px;
                            }
                          .btn-group2{
                            width: 240px;
                            max-height: 30px;
                            display: flex;
                            >button{
                              width: 60px;
                              height: 30px;
                              background-color: transparent;
                              color: $btn-color;
                              border: $btn-color solid 1px;
                              &:focus,&:hover{
                                background-color: $btn-color;
                                color: white;
                              }
                            }
                            >button:nth-child(2){
                              border-right: none;
                            }
                            >button:nth-child(1){
                              border-right: none;
                              border-radius: 3px;
                              margin-right: -2px;
                            }
                            >button:nth-child(4){
                              border-radius: 3px;
                              margin-left: -2px;
                              border-left: none;
                            }

                          }

                        }
                    }
                }
                .palette{
                    width: 100%;
                    height: 100px;
                    border: solid 10px rgb(238,238,238);
                    display: flex;
                    .palette-colors{
                        height: 100%;
                        width: calc(100%/(v-bind("state.number")));
                        // background-color: v-bind("state.color");
                    }
                }

                #color{
                    height: 30px;
                    width: 100%;
                    outline: none;
                    &:focus{
                        box-shadow: 0 0 9px 3px rgb(191,222,255);
                        outline: none;
                    }
                }
                .box-main{
                  display: flex;

                  @media (max-width: 1000px) {
                    flex-wrap: wrap;
                  }
                  max-width: 100%;
                    .left{
                        width: 500px;
                        display: flex;
                        align-items: center;
                        .key{
                            font-weight: 300;
                            margin-right: 10px;
                            min-width: 90px;
                        }

                        
                        #number{
                          width: 50px;
                          height: 36px;
                          font-size: 17px;
                          text-align: center;
                          
                        }
                    }
                }
              .pics{
                display: flex;
                margin-top: 20px;
                @media (max-width: 1000px) {
                  flex-wrap: wrap;
                }
                width: 100%;
                >.pic{
                  width: calc(100%/3);
                  height: 250px;
                  @media (max-width: 1000px) {
                    width: 100%;
                  }
                }
              }

            }
        }

        }
.form-check-label{
    font-size: 15px;
    font-weight:400;
}
</style>