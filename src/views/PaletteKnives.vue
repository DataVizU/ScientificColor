<template>
  <div class="common-layout">
    <el-container>
      <ChromaJs :key="key"></ChromaJs>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ChromaJs from "./ChromaJs.vue";
import {useKeyStore} from "@/stores/key";
import {ref, watch} from "vue";
const keyStore = useKeyStore();
const key = ref<string>();

watch(() => keyStore.key, (val) => {
  key.value = val;
});

</script>

<style scoped lang="less">
.el-container {
  height: 100%;

  iframe {
    border: 0;
  }
}
</style>
