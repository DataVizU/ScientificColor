import { defineStore } from "pinia";

export const uesColorStore = defineStore({
  id: "color",
  state: () => ({
    basicColor: [] as string[],
    nowColor: "",
    palettes: [] as string[][],
    colorsNumber: 9,
  }),
  getters: {
    getBasicColor(state) {
      return state.basicColor;
    },
    getNowColor(state) {
      return state.nowColor;
    },
    getPalette(state) {
      return state.palettes;
    },
  },
  actions: {
    setBasicColor(color: string[]) {
      this.basicColor = color;
    },
    setNowColor(color: string) {
      this.nowColor = color;
    },
    addPalette(palette: string[]) {
      this.palettes.push(palette);
    },
    deletePalette(index: number) {
      this.palettes.splice(index, 1);
    },
  },
});
