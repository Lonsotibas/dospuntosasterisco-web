<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>
@font-face {
  font-family: geo;
  src: url(/fonts/Geo-Regular.ttf);
}
body {
  font-family: geo !important;
  font-size: 1.2em;
}
main {
  position: relative;
  max-height: 95vh;
}
#view {
  display: flex !important;
  justify-content: center;
}
</style>
