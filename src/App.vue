<script setup lang="ts"></script>

<template>
  <main>
    <nav id="header">
      <h1 id="header-title">:* (dospuntosasterisco)</h1>
      <ol id="header-menu">
        <li class="header-menu-item">INICIO</li>
        <li class="header-menu-item">RESIDENCIAS</li>
        <li class="header-menu-item">INSUMOS</li>
        <!-- EXPERIMENTOS IA, FOTOGRAMETRIAS Y GRINDERMANIAS -->
        <li class="header-menu-item">CONTACTO</li>
      </ol>
    </nav>
  </main>
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
  display: inline-flex;
  padding: 5px;
}
</style>
