<script setup>


</script>

<template>
  <div class="all">
    <div class="navbar">
      <div class="nav nav-home">I want hue</div>
      <div class="nav">Tutorials</div>
      <div class="nav">Examples</div>
      <div class="nav">Theory</div>
      <div class="nav">Experiment</div>
      <div class="nav">Old version</div>
      <div class="nav">Github</div>
      <div class="nav">Issues</div>
      <div class="nav">npm</div>
      <div class="nav">Medialab Tools</div>
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
                <input class="first">
                <canvas></canvas>
                <input class="second">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">c</div>
                <input class="first">
                <canvas></canvas>
                <input class="second">
              </div>

            </div>
            <div class="range">
              <div class="arg">
                <div class="key">L</div>
                <input class="first">
                <canvas></canvas>
                <input class="second">
              </div>

            </div>
          </div>

        </div>

      </div>
      <div class="right half">
        <h3 class="title">Palette</h3>
        <hr>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap";
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
    >.left{
      width: 67%;
    }
    >.right{
      width: 30%;
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
                  box-shadow: 0 0 8px 2px rgba(73,228,253,0.3);
                  border-color: rgb(73,228,253);
                  transition: 0.3s;
                }
              }
              >.first{
                margin-left: -3px;
              }
              >canvas{
                width: 200px;
              }
            }
          }
        }
      }
    }
  }
}

</style>