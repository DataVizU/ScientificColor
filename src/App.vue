<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <SideBar></SideBar>
      </el-aside>
      <el-container>
        <el-header>
          <el-button-group class="ml-4">
            <el-button type="primary">
              <RouterLink to="/">Basic Hue</RouterLink>
            </el-button>
            <el-button type="primary">
              <RouterLink to="/palette">Palette</RouterLink>
            </el-button>
          </el-button-group>
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
</script>

<style scoped lang="less">
.common-layout {
  height: 100%;
}
.el-container {
  min-height: 96vh;
  padding: 1%;
}
el-main {
  height: 100%;
}
</style>
