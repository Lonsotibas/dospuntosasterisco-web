<script setup lang="ts">
import Grindermanias from "@/components/Grindermanias.vue";
</script>

<template>
  <div class="info">
    <span
      >Para mas informacion sobre el proyecto, accede a esta pagina a traves de
      tu computador/notebook</span
    >
  </div>
  <Grindermanias />
</template>

<style lang="less">
#view {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}
.info {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 1rem;
}
</style>
