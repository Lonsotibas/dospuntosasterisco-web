<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface GalleryItem {
  image: string;
  fallback: string;
  alt: string;
}

const props = defineProps<{
  items: GalleryItem[];
}>();

const container = ref<HTMLElement | null>(null);
let observer: IntersectionObserver;
let isScrolling = false;
const loadedImages = ref(new Set<number>());

// Updated handleWheel with proper throttling
const handleWheel = (event: WheelEvent) => {
  if (!container.value) return;

  event.preventDefault();
  const delta = Math.sign(event.deltaY);
  const itemHeight = container.value.offsetHeight / 3;
  const targetScroll = container.value.scrollTop + delta * itemHeight;

  // Use smooth scroll behavior with boundary checks
  container.value.scrollTo({
    top: Math.max(
      0,
      Math.min(
        targetScroll,
        container.value.scrollHeight - container.value.clientHeight
      )
    ),
    behavior: "smooth",
  });
};

// Optimized IntersectionObserver setup
const setupLazyLoading = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const idx = Number(img.dataset.index);
          if (!loadedImages.value.has(idx)) {
            // Load image with fallback handling
            img.src =
              img.dataset.src || img.dataset.fallback || "/images/no-image.png";
            loadedImages.value.add(idx);
          }
          observer.unobserve(img);
        }
      });
    },
    { root: container.value, rootMargin: "300px 0px", threshold: 0.01 }
  );
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const fallback = img.dataset.fallback;
  if (fallback) {
    img.src = fallback;
    img.onerror = () => {
      img.src = "/images/no-image.png";
    };
  } else {
    img.src = "/images/no-image.png";
  }
};

onMounted(() => {
  setupLazyLoading();

  // Preload first 3 items in THIS gallery
  const firstThree = container.value?.querySelectorAll(
    '[data-index="0"], [data-index="1"], [data-index="2"]'
  );
  firstThree?.forEach((img) => {
    const target = img as HTMLImageElement;
    target.src = target.dataset.src!;
    loadedImages.value.add(Number(target.dataset.index));
  });

  // Observe all images in THIS gallery
  const images = container.value?.querySelectorAll(".lazy-load");
  images?.forEach((img) => observer.observe(img));
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
          :data-fallback="item.fallback"
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
  transform: translate3d(0, 0, 0); /* Force GPU acceleration */
  will-change: scroll-position;
  contain: strict;
  content-visibility: auto;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overscroll-behavior: contain;
  -webkit0overflow-scrolling: touch;

  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Edge */
  }

  .items-container {
    backface-visibility: hidden;
    padding: 0;
    margin: 0;

    .gallery-item {
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0); /* Force GPU acceleration */
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
          @keyframes shimmer {
            0% {
              background-position: -200% 0%;
            }
            100% {
              background-position: -200% 0%;
            }
          }
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 200%;
          animation: shimmer 1.2s infinite;
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
