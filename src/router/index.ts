import { createRouter, createWebHistory } from "vue-router";
import InicioView from "@/views/Inicio.vue";
import ResidenciasView from "@/views/Residencias.vue";
import ContactoView from "@/views/Contacto.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: InicioView,
    },
    {
      path: "/residencias",
      name: "residencias",
      component: ResidenciasView,
    },
    {
      path: "/contacto",
      name: "contacto",
      component: ContactoView,
    },
  ],
});

export default router;
