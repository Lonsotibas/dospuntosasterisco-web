<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav id="header">
    <h1 id="header-title">:* (dospuntosasterisco)</h1>
    <ol id="header-menu">
      <RouterLink to="/" class="header-menu-item" activeClass="menu-item-active"
        >INICIO</RouterLink
      >
      <RouterLink
        to="/residencias"
        class="header-menu-item"
        activeClass="menu-item-active"
        >RESIDENCIAS</RouterLink
      >
      <li class="header-menu-item">INSUMOS</li>
      <!-- EXPERIMENTOS IA, FOTOGRAMETRIAS Y GRINDERMANIAS -->
      <li class="header-menu-item">CONTACTO</li>
    </ol>
  </nav>
</template>

<style scoped>
@font-face {
  font-family: electrolize;
  src: url(/fonts/Electrolize-Regular.ttf);
}
#header {
  font-family: electrolize;
  display: flex;
  justify-content: space-between;
}
#header-title {
  display: inline-block;
}
#header-menu {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
}
.header-menu-item {
  padding: 0 2px !important;
  text-decoration: none;
  color: var(--color-text);
  display: inline-flex;
  padding: 5px;
}
.menu-item-active {
  color: var(--tropical-indigo);
}
</style>
