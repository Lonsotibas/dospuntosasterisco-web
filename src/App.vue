<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <main>
    <RouterView />
  </main>
</template>

<style>
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
</style>
