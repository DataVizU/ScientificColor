<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input class="slider-input" v-model="minValue">
          <template #prepend>{{ id }}</template>
        </el-input>
      </el-col>
      <el-col :span="16">
        <el-slider
          class="slider"
          v-model="value"
          :min="lowerLimit"
          :max="upperLimit"
          :step="step"
          range
        />
      </el-col>
      <el-col :span="4">
        <el-input class="slider-input" v-model="maxValue" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useHCLStore } from "@/stores/HCL";
import type { hclType } from "@/type/type";

const props = defineProps<{
  id: hclType;
  lowerLimit: number;
  upperLimit: number;
  step: number;
  defaultValue: [number, number];
}>();

const hcl = useHCLStore();

const minValue = ref(props.defaultValue[0]);

const maxValue = ref(props.defaultValue[1]);

const value = computed({
  get() {
    if (
      minValue.value > props.upperLimit ||
      minValue.value < props.lowerLimit ||
      maxValue.value > props.upperLimit ||
      maxValue.value < props.lowerLimit
    ) {
      return [props.lowerLimit, props.upperLimit];
    }
    if (minValue.value > maxValue.value) {
      return [maxValue.value, minValue.value];
    } else {
      return [minValue.value, maxValue.value];
    }
  },

  set(newValue) {
    [minValue.value, maxValue.value] = newValue;
    hcl.setData(props.id, newValue);
  },
});

watch(props, (newValue) => {
  value.value = newValue.defaultValue;
});
</script>

<style scoped></style>
