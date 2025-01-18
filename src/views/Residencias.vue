<script setup lang="ts">
import VerticalGallery from "@/components/VerticalGallery.vue";
import image from "/images/no-image.png";
</script>

<template>
  <div class="image-gallery">
    <VerticalGallery :itemHeight="120">
      <div class="item" v-for="index in 10">
        <span>{{ index }}</span>
        <img class="img-item" :src="image" alt="" />
      </div>
    </VerticalGallery>
  </div>
</template>

<style scoped lang="less">
.image-gallery {
  width: 200px;
  height: 500px;
  margin: 0 auto;
}
.item {
  height: 120px;
  box-sizing: border-box;
  padding: 2px 0;
  text-align: center;
}
.img-item {
  height: 100%;
  max-width: 100%;
}
</style>
