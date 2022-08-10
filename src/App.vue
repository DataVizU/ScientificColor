<script setup lang="ts"></script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
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

<style scoped></style>
