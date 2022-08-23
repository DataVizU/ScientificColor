<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="20vw">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="16">
              <el-steps :active="state" simple>
                <el-step title="生成基色" @click="changeState(1)" />
                <el-step title="生成颜色梯度" @click="changeState(2)" />
                <el-step title="生成色板" @click="changeState(3)" />
              </el-steps>
            </el-col>
            <el-col :span="4">
              <el-button class="switch-btn" type="primary">理 论</el-button>
            </el-col>
            <el-col :span="4">
              <el-button class="switch-btn" type="primary">指 南</el-button>
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
import { ref } from "vue";
import router from "@/router";

const state = ref(1);
const changeState = (idx: number) => {
  state.value = idx;
  if (idx === 1) {
    router.push("/");
  } else if (idx === 2) {
    router.push("/palette");
  } else if (idx === 3) {
    router.push("/finalpalette");
  }
};
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;
}

.el-step {
  cursor: pointer;
}

.el-container {
  min-height: 96vh;
  padding: 1%;
}

el-main {
  height: 100%;
}

aside {
  margin-left: 24px;
}

.switch-btn {
  margin-left: 5%;
  width: 95%;
  height: 100%;
}
</style>
