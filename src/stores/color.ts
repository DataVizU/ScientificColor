import { defineStore } from "pinia";

export const uesColorStore = defineStore({
  id: "color",
  state: () => ({
    basicColor: [] as string[],
    nowColor: "#00429d",
    palettes: [['#000e5b', '#001d6e', '#002b81', '#003a93', '#1048a4', '#2f55b4', '#4363c4', '#5571d4', '#677fe4', '#788ef5', '#8a9efe', '#9dafff', '#b0c1ff', '#c3d3ff', '#d5e4ff'],['#000e5b', '#001d6e', '#002b81', '#003a93', '#1048a4', '#2f55b4', '#4363c4', '#5571d4', '#677fe4', '#788ef5', '#8a9efe', '#9dafff', '#b0c1ff', '#c3d3ff', '#d5e4ff']] as string[][],
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
