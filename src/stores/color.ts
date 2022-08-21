import { defineStore } from "pinia";

export const uesColorStore = defineStore({
  id: "color",
  state: () => ({
    basicColor: [] as string[],
    nowColor: "#00429d",
  }),
  getters: {
    getBasicColor(state) {
      return state.basicColor;
    },
    getNowColor(state) {
      return state.nowColor;
    },
  },
  actions: {
    setBasicColor(color: string[]) {
      this.basicColor = color;
    },
    setNowColor(color: string) {
      this.nowColor = color;
    },
  },
});
