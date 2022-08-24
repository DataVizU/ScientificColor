<template>
  <div class="common-layout">
    <el-container id="main-app">
      <el-aside width="20vw">
        <SideBar></SideBar>
      </el-aside>
      <div id="split-line"></div>
      <el-container class="main-area">
        <el-header>
          <el-row id="navigation">
            <el-col :span="15">
              <el-steps :active="state" simple>
                <el-step title="生成基色" @click="changeState(1)" :icon="Aim" />
                <el-step
                  title="生成颜色梯度"
                  @click="changeState(2)"
                  :icon="Orange"
                />
                <el-step
                  title="生成色板"
                  @click="changeState(3)"
                  :icon="Memo"
                />
              </el-steps>
            </el-col>
            <el-col :span="1">
              <el-divider direction="vertical" />
            </el-col>
            <el-col :span="4">
              <el-button class="switch-btn" type="default" @click="gotoTheory">理论</el-button>
            </el-col>
            <el-col :span="4">
              <el-button class="switch-btn" type="default" @click="gotoGuild">指南</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/views/SideBar.vue";
import { Aim, Orange, Memo } from "@element-plus/icons-vue";
import { ref } from "vue";
import router from "@/router";

const state = ref(-1);
const changeState = (idx: number) => {
  state.value = idx;
  if (idx === 1) {
    router.push("/hue");
  } else if (idx === 2) {
    router.push("/palette");
  } else if (idx === 3) {
    router.push("/finalpalette");
  }
};

const gotoTheory = () => {
  // router.push("/");
};

const gotoGuild = () => {
  router.push("/");
};
</script>

<style scoped lang="less">
@font-face {
  font-family: "PingFang SC";
  src: url("./font/苹方黑体-准-简.ttf");
  font-weight: 400;
  font-style: normal;
}

.common-layout {
  height: 100%;
}

.el-step {
  cursor: pointer;
}

.el-steps--simple {
  background: rgba(0, 0, 0, 0);
}

.el-container {
  min-height: 96vh;
  padding: 1%;
}

#main-app {
  padding-right: 0;
  padding-top: 0;
}

#split-line {
  width: 3vw;
  border-right: 1px solid #ebeef5;
}

.main-area {
  width: 72vw;
  padding: 0;
}

.el-header {
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: flex-end;
}

#navigation {
  width: 100%;
}

main {
  height: 100%;
  padding: 36px 48px 0 0;
}

.el-divider {
  top: 20%;
  height: 60%;
}

aside {
  margin-left: 24px;
}

.switch-btn {
  margin-left: 5%;
  width: 95%;
  height: 100%;

  border: none;

  font-family: "PingFang SC", serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  color: #303133;
}

.switch-btn:hover {
  color: #303133;
  border-color: #ffffff;
  background-color: #ffffff;
  outline: 0;
}
</style>
