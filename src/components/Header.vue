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
    </ol>
  </nav>
</template>

<style scoped>
#header {
  background-color: rgba(19, 19, 22, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  padding: 0 5vw;
  height: 5vh;
  font-family: electrolize, system-ui, sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  display: flex;
  justify-content: space-between;
}
#header-title {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-dim);
}
#header-menu {
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 2rem;
}
.header-menu-item {
  text-decoration: none;
  color: var(--color-text-dim);
  display: inline-flex;
  padding: 4px 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text);
  }
}
.menu-item-active {
  color: var(--accent);

  &:hover {
    color: var(--accent);
  }
}

@media (max-width: 768px) {
  #header {
    height: 6vh;
    padding: 0 4vw;
    font-size: 0.7rem;
  }
  #header-title {
    font-size: 0.7rem;
  }
  #header-menu {
    gap: 1.2rem;
  }
}
</style>
