<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-button type="primary" @click="getContent">Primary</el-button>
      </el-aside>
      <el-container>
        <el-header>
          <el-button-group class="ml-4">
            <el-button type="primary">
              <RouterLink to="/">Basic Hue</RouterLink>
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
const getContent = () => {
  // const node = document.createElement("div");
  const _iframe = document.getElementById("iwanthue").contentWindow;
  // node.append(_iframe.cloneNode(true));
  // console.log(node.innerHTML);
  console.log(_iframe.document);
  // console.log(_iframe.outerHTML);
};
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
