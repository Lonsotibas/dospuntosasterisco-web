<script setup lang="ts">
import VerticalGallery from "@/components/VerticalGallery.vue";
import image from "/images/no-image.png";
</script>

<template>
  <div class="image-gallery">
    <VerticalGallery :itemHeight="120">
      <div class="item" v-for="index in 15">
        <span>{{ index }}</span>
        <img class="img-item" :src="image" alt="" />
      </div>
    </VerticalGallery>
  </div>
</template>

<style scoped lang="less">
.image-gallery {
  width: 50vw;
  height: 95vh;
}
.item {
  height: 20%;
  z-index: 2;
  font-size: 2em;
  box-sizing: border-box;
  text-align: center;
  color: black;
}
.img-item {
  height: 100%;
  max-width: 100%;
}
</style>
