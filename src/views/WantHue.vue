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
            <select>
              <option value="">Default present</option>
              <option value="All colors">All colors</option>
              <option value="Colorblind friendly">Colorblind friendly</option>
              <option value="Fancy">Fancy</option>
              <option value="Shades">Shades</option>


            </select>
            <div class="range">
              <div class="arg">
                <div class="key">H</div>
                <input class="first" :value="stateh.from">
                <div class="color-range">
                  <input type="range" max="360" min="0" id="rangeh1" value="360">
                  <input type="range" max="360" min="0" id="rangeh2" value="0">
                </div>

                <input class="second" :value="stateh.to*3.6">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">C</div>
                <input class="first" :value="statec.from">
                <div class="color-range">
                  <input type="range" max="360" min="0" id="rangec1" value="360">
                  <input type="range" max="360" min="0" id="rangec2" value="0">
                </div>

                <input class="second" :value="statec.to">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">L</div>
                <input class="first" :value="statel.from">
                <div class="color-range">
                  <input type="range" max="360" min="0" id="rangel1" value="360">
                  <input type="range" max="360" min="0" id="rangel2" value="0">
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
          <select>
            <option value="">soft(k-Means)</option>
            <option value="hard(Force vector)">hard(Force vector)</option>
          </select>
        </div>
        <button>Make a palette</button>
        <div class="vessel">
          <div v-for="index of num" :key="index"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";

const num=ref(4)
const stateh = reactive({
  from:0,
  to:100
})
const statec=reactive({
  from:0,
  to:100
})
const statel=reactive({
  from:0,
  to:100
})
onMounted(()=>{
  const rangeh1=document.getElementById("rangeh1");
  const rangeh2=document.getElementById("rangeh2");
  const rangec1=document.getElementById("rangec1");
  const rangec2=document.getElementById("rangec2");
  const rangel1=document.getElementById("rangel1");
  const rangel2=document.getElementById("rangel2");
  setRange(rangeh1,rangeh2,stateh);
  setRange(rangec1,rangec2,statec);
  setRange(rangel1,rangel2,statel);

})

function setRange(range1,range2,state){
  range1.addEventListener('input', function () {
    state.to = parseInt(100 * (this.value - this.min) / (this.max - this.min));
    // if(this.value<stateh.from) this.value=stateh.from;
  });
  range2.addEventListener("input",function(){
    state.from = parseInt(100 * (this.value - this.min)/(this.max - this.min));
    // if(this.value>stateh.to) this.value=stateh.to;
  });
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
        &:hover,&:focus{
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
          // background-color: red;
          background-image: url("../pics/palette_hole.png");
          margin-right: 10px;
          margin-top: 10px;
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
                    background: linear-gradient(to right, transparent calc(1% * v-bind("stateh.from")), blue calc(1% * v-bind("stateh.from")) calc(1% * (v-bind("stateh.to"))), transparent 0%);

                  }
                }
                #rangec2{
                  &::-webkit-slider-runnable-track{
                    background: linear-gradient(to right, transparent calc(1% * v-bind("statec.from")), blue calc(1% * v-bind("statec.from")) calc(1% * (v-bind("statec.to"))), transparent 0%);

                  }
                }
                #rangel2{
                &::-webkit-slider-runnable-track{
                  background: linear-gradient(to right, transparent calc(1% * v-bind("statel.from")), blue calc(1% * v-bind("statel.from")) calc(1% * (v-bind("statel.to"))), transparent 0%);
                }
                }
                >input{
                  position: absolute;
                  height: 30px;
                  pointer-events: none;
                  width: 100%;
                  -webkit-appearance: none;

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
                    width: 10px;
                    border-left: 10px black solid;
                    z-index: 1;
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