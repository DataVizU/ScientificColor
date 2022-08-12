import { defineStore } from "pinia";
import type { hclType } from "@/type/type";

export const useHCLStore = defineStore({
  id: "HCL",
  state: () => ({
    H: [0, 360],
    C: [0.0, 100.0],
    L: [0.0, 100.0],
  }),
  getters: {
    getDataById: (state) => {
      return (id: hclType) => {
        return state[id];
      };
    },
  },
  actions: {
    setData(id: hclType, newValue: Array<number>) {
      this[id] = newValue;
    },
  },
});
