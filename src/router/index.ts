import { createRouter, createWebHashHistory } from "vue-router";
import BasicHue from "@/views/BasicHue.vue";
import PaletteKnives from "@/views/PaletteKnives.vue";
import FinalPalette from "@/views/FinalPalette.vue";
import HandBook from "@/views/HandBook.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "handBank",
      component: HandBook,
    },
    {
      path: "/hue",
      name: "basicHue",
      component: BasicHue,
    },
    {
      path: "/palette",
      name: "palette",
      component: PaletteKnives,
    },
    {
      path: "/finalpalette",
      name: "finalpalette",
      component: FinalPalette,
    },
  ],
});

export default router;
