import {RouterLink} from 'vue-router';
<template>
  <nav id="header">
    <h1 id="header-title">:* (dospuntosasterisco)</h1>
    <ol id="header-menu">
      <RouterLink to="/" class="header-menu-item" activeClass="menu-item-active"
        >INICIO</RouterLink
      >
      <li class="header-menu-item">RESIDENCIAS</li>
      <li class="header-menu-item">INSUMOS</li>
      <!-- EXPERIMENTOS IA, FOTOGRAMETRIAS Y GRINDERMANIAS -->
      <li class="header-menu-item">CONTACTO</li>
    </ol>
  </nav>
</template>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
}
#header-title {
  display: inline-block;
}
#header-menu {
  display: inline-block;
}
.header-menu-item {
  text-decoration: none;
  color: var(--color-text);
  display: inline-flex;
  padding: 5px;
}
.menu-item-active {
  color: var(--tropical-indigo);
}
</style>
