<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface GalleryItem {
  image: string;
  alt: string;
}

const props = defineProps<{
  items: GalleryItem[];
}>();

const container = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;
let isScrolling = false;
const loadedImages = ref(new Set<number>());

const handleWheel = (event: WheelEvent) => {
  if (!container.value || isScrolling) return;

  isScrolling = true;
  const delta = Math.sign(event.deltaY);
  const itemHeight = container.value.offsetHeight / 3; // Height of one item

  if (delta > 0) {
    const maxScroll =
      container.value.scrollHeight - container.value.clientHeight;
    container.value.scrollTop = Math.min(
      container.value.scrollTop + itemHeight,
      maxScroll
    );
  } else {
    container.value.scrollTop = Math.max(
      container.value.scrollTop - itemHeight,
      0
    );
  }

  setTimeout(() => {
    isScrolling = false;
  }, 150);
};

// Image lazy loading with Intersection Observer
const setupLazyLoading = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const idx = Number(img.dataset.index);
          if (!loadedImages.value.has(idx)) {
            img.src = img.dataset.src!;
            loadedImages.value.add(idx);
          }
          observer.unobserve(img);
        }
      });
    },
    { root: container.value, rootMargin: "200px" }
  );
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/no-image.png";
};

onMounted(() => {
  setupLazyLoading();
  // Preload first 3 items immediately
  document
    .querySelectorAll('[data-index="0"], [data-index="1"], [data-index="2"]')
    .forEach((img) => {
      const target = img as HTMLImageElement;
      target.src = target.dataset.src!;
    });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
// Keep existing touch handlers and lifecycle hooks
</script>

<template>
  <div class="gallery-container" @wheel="handleWheel" ref="container">
    <div class="items-container">
      <div v-for="(item, index) in items" :key="index" class="gallery-item">
        <img
          :data-src="item.image"
          :data-index="index"
          :alt="item.alt"
          @error="handleImageError"
          class="gallery-image lazy-load"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.gallery-container {
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Edge */
  }

  .items-container {
    padding: 0;
    margin: 0;

    .gallery-item {
      width: 100%;
      height: 33.333vh; /* Show 3 items at a time */
      scroll-snap-align: start;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #ddd;

      .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;

        &.lazy-load {
          background: #f0f0f0;
          filter: blur(5px);
          transition: filter 0.3s ease;

          &[src] {
            filter: none;
          }
        }
      }

      .item-index {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        color: white;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        z-index: 1;
      }
    }
  }
}
</style>
