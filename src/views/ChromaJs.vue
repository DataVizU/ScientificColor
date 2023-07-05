<template>
    <div class="main">
        <div class="center">
          <div class="title">
                <div class="title1">Chroma.js Color Palette Helper</div>
                <div class="title2">This 
                    <a>chroma.js</a>
                    -powered tool is here to help us
                    <a>mastering multi-hued, multi-stops color scales.</a> 
                        
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
                        <input type="number" id="number"  v-model="state.number" />
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
                  <input class="form-check-input" type="checkbox" v-model="method.lightness" value="" id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    correct lightness

                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="method.bezier" id="flexCheckChecked" checked>
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
              <div class="pic" id="lightness">
                <h6>lightness</h6>

              </div>
              <div class="pic" id="saturation">
                <h6>saturation</h6>

              </div>
              <div class="pic" id="hue">
                <h6>hue</h6>

              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script setup >

import {reactive} from "vue";
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
const datal=[],datas=[],datah=[];
const range=ref([]);
watch([colors,method,state],([colors,method,state],[])=>{
  colors.value=state.init.split("，");
  let scale;
  if(method.bezier===true) scale=chroma.bezier(colors);
  else scale=chroma.scale(colors);
  // if(method.lightness===true) scale=scale.correctLightness();报错，没有这个函数
  const newRange=[];
  for(let i=0;i<state.number;i++){
    newRange.push(scale(i/state.number).hex());
    const tmparr=chroma(scale(i/state.number).hex()).hsl();
    datah.push(tmparr[0]),datas.push(tmparr[1]),datal.push(tmparr[2]);
  }
  range.value = newRange;
  // console.log(colors);
  // console.log("YES");
  // console.log(state);
})

// const chartl=echarts.init(document.getElementById("lightness"));
// chartl.setOption( {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name: 'Step Start',
//       type: 'line',
//       step: 'start',
//       data: [120, 132, 101, 134, 90, 230, 210]
//     },
//     {
//       name: 'Step Middle',
//       type: 'line',
//       step: 'middle',
//       data: [220, 282, 201, 234, 290, 430, 410]
//     },
//     {
//       name: 'Step End',
//       type: 'line',
//       step: 'end',
//       data: [450, 432, 401, 454, 590, 530, 510]
//     }
//   ]
// })

colors.value=state.init.split("，");


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
                  width: 33.3%;
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