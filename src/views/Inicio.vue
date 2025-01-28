<script setup lang="ts">
import TypeText from "@/components/TypeText.vue";
import Grindermanias from "@/components/Grindermanias.vue";
</script>

<template>
  <TypeText />
  <Grindermanias />
  <div id="background"></div>
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
</style>
