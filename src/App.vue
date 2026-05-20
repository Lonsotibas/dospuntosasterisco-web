<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped>
main {
  position: relative;
  max-height: 95vh;
}
#view {
  display: flex !important;
  justify-content: center;
}
</style>
