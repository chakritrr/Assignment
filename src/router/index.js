import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/users/HomeView.vue";
import RegisterView from "@/views/users/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
