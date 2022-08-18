import { defineStore } from "pinia";

export const uesColorStore = defineStore({
  id: "color",
  state: () => ({
    basicColor: [] as string[],
  }),
  getters: {
    getBasicColor(state) {
      return state.basicColor;
    },
  },
  actions: {
    setBasicColor(color: string[]) {
      this.basicColor = color;
    },
  },
});
