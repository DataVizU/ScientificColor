import { createRouter, createWebHistory } from "vue-router";
import BasicHue from "@/views/BasicHue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "basicHue",
      component: BasicHue,
    },
  ],
});

export default router;
