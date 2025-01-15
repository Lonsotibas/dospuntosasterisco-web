import { createRouter, createWebHistory } from "vue-router";
import InicioView from "../views/Inicio.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
    },
  ],
});

export default router;
