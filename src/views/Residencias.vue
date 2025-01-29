<script setup lang="ts">
import { ref } from "vue";
import VerticalGallery from "@/components/VerticalGallery.vue";
import { useImageLoader } from "@/composables/useImageLoader";
import { useHead } from "unhead";

const { generateGallery } = useImageLoader();
const galleries = ref([
  { items: generateGallery(1, 3) },
  { items: generateGallery(2, 9) },
  { items: generateGallery(3, 6) },
  { items: generateGallery(4, 16) },
  { items: generateGallery(5, 13) },
]);

// Add this after galleries initialization

useHead({
  link: galleries.value.flatMap((gallery, index) =>
    gallery.items.slice(0, 3).map((item) => ({
      rel: "preload",
      as: "image",
      href: item.image,
      imagesrcset: item.srcset,
      imagesizes: item.sizes,
      type: "image/webp",
    }))
  ),
});
</script>

<template>
  <div class="residencias-container">
    <VerticalGallery
      v-for="(gallery, index) in galleries"
      :key="index"
      :items="gallery.items"
    />
  </div>
</template>

<style lang="less" scoped>
.residencias-container {
  will-change: contents;
  backface-visibility: hidden;
  display: flex;
  overflow: hidden;
  height: 95vh;

  > * {
    flex: 1;
    width: 20%;
    border-right: 2px solid #000;

    &:last-child {
      border-right: none;
    }
  }
}
</style>
