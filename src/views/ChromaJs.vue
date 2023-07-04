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
              <div class="mb-3">
                <input type="" class="form-control" id="exampleFormControlInput1" />
                <!-- <button type="button" class="btn btn-primary position-relative">
                    Profile
                    </button> -->
           
                
            </div>

            </div>
          <div class="box">
            <div class="head">
              <div class="head-title">Check and configure the resulting palette</div>
            </div>
            <div class="middle">
              <div class="middle-left">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked>
                  <label class="form-check-label" for="flexCheckDefault">
                    correct lightness

                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
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
                    <button>normal</button>
                    <button>debut.</button>
                    <button>prot.</button>
                    <button>trit.</button>
                  </div>


                </div>
              </div>

            </div>
            <div class="palette">
              <div v-for="(color, index) in colors"  class="palette-colors" :style="{backgroundColor:colors[index]}" :key="index">
              </div>


            </div>
          </div>
        </div>
    </div>
</template>

<script>
import chroma from "chroma-js";
import {reactive} from "vue";

export default{
    setup(){
        const state = reactive({
            number:9,
            init:"#00429d",

        });
        const colors=["red","blue","yellow"];
        // const initColor = chroma(state.init);
        // for(let i = 0; i < state.number;i++){
        //     // colors.push(initColor.brighten(0.2).hex());
        // }
        return{
            state,
            colors
        }
    }
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
            }
        }

        }
.form-check-label{
    font-size: 15px;
    font-weight:400;
}
</style>