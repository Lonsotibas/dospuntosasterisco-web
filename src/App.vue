<script setup lang="ts">
import Header from "./components/Header.vue";
import Mobile from "./views/Mobile.vue";
const isMobile = () => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
};
</script>

<template>
  <Header v-if="!isMobile" />
  <RouterView v-if="!isMobile" />
  <Mobile v-else />
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
