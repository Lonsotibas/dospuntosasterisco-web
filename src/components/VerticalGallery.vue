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

const emit = defineEmits<{
  "open-modal": [item: GalleryItem];
}>();

const container = ref<HTMLElement | null>(null);
const autoScrollTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const scrollDirection = ref<"up" | "down">(Math.random() < 0.5 ? "up" : "down");
const loadedImages = ref(new Set<number>());
let observer: IntersectionObserver;

// Prevents auto-scroll from firing while a smooth scroll is still running
let isScrolling = false;
let scrollEndTimer: ReturnType<typeof setTimeout>;

const onScrollActivity = () => {
  isScrolling = true;
  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(() => {
    isScrolling = false;
  }, 200);
};

const itemHeight = () =>
  container.value ? container.value.offsetHeight / 3 : 0;

const autoScroll = () => {
  if (!container.value || isScrolling) return;

  const h = itemHeight();
  const currentScroll = container.value.scrollTop;
  const maxScroll = container.value.scrollHeight - container.value.clientHeight;

  // Step exactly one item so we always land on a snap point
  let nextScroll =
    currentScroll + (scrollDirection.value === "down" ? h : -h);

  if (nextScroll >= maxScroll) {
    nextScroll = maxScroll;
    scrollDirection.value = "up";
  } else if (nextScroll <= 0) {
    nextScroll = 0;
    scrollDirection.value = "down";
  }

  container.value.scrollTo({ top: nextScroll, behavior: "smooth" });
};

const randomDelay = () => Math.max(2500, 3500 + Math.random() * 1500);

const startAutoScroll = () => {
  if (autoScrollTimer.value) return;
  const tick = () => {
    autoScroll();
    autoScrollTimer.value = setTimeout(tick, randomDelay());
  };
  autoScrollTimer.value = setTimeout(tick, 500 + Math.random() * 500);
};

const stopAutoScroll = () => {
  if (!autoScrollTimer.value) return;
  clearTimeout(autoScrollTimer.value);
  autoScrollTimer.value = null;
};

const handleWheel = (event: WheelEvent) => {
  if (!container.value) return;
  event.preventDefault();

  const delta = Math.sign(event.deltaY);
  const h = itemHeight();
  const targetScroll = container.value.scrollTop + delta * h;

  container.value.scrollTo({
    top: Math.max(
      0,
      Math.min(targetScroll, container.value.scrollHeight - container.value.clientHeight)
    ),
    behavior: "smooth",
  });
};

const setupLazyLoading = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target as HTMLImageElement;
        const idx = Number(img.dataset.index);
        if (!loadedImages.value.has(idx)) {
          img.src = img.dataset.src || img.dataset.fallback || "/images/no-image.png";
          loadedImages.value.add(idx);
        }
        observer.unobserve(img);
      });
    },
    // 600px look-ahead so the next two items are loaded before they appear
    { root: container.value, rootMargin: "600px 0px", threshold: 0.01 }
  );
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  const fallback = img.dataset.fallback;
  img.src = fallback || "/images/no-image.png";
  if (fallback) {
    img.onerror = () => {
      img.src = "/images/no-image.png";
    };
  }
};

onMounted(() => {
  setupLazyLoading();

  // Eagerly load the first 5 images so they appear instantly
  container.value
    ?.querySelectorAll<HTMLImageElement>(".lazy-load")
    .forEach((img) => {
      const idx = Number(img.dataset.index);
      if (idx < 5) {
        img.src = img.dataset.src!;
        loadedImages.value.add(idx);
      } else {
        observer.observe(img);
      }
    });

  container.value?.addEventListener("scroll", onScrollActivity, { passive: true });
  startAutoScroll();
});

const handleMouseEnter = () => {
  stopAutoScroll();
};

const handleMouseLeave = () => {
  startAutoScroll();
};

onBeforeUnmount(() => {
  stopAutoScroll();
  clearTimeout(scrollEndTimer);
  container.value?.removeEventListener("scroll", onScrollActivity);
  observer?.disconnect();
});

defineExpose({ startAutoScroll, stopAutoScroll });
</script>

<template>
  <div
    class="gallery-container"
    @wheel.prevent="handleWheel"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="container"
  >
    <div class="items-container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="gallery-item"
        @click="emit('open-modal', item)"
      >
        <img
          :data-src="item.image"
          :data-fallback="item.fallback"
          :data-index="index"
          :alt="item.alt"
          decoding="async"
          @error="handleImageError"
          class="gallery-image lazy-load"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.gallery-container {
  will-change: scroll-position;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .items-container {
    backface-visibility: hidden;
    padding: 0;
    margin: 0;

    .gallery-item {
      width: 100%;
      height: 33.334vh;
      scroll-snap-align: start;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #ddd;

      .gallery-image {
        will-change: transform;
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        transition: filter 0.4s ease, opacity 0.4s ease;

        &:hover {
          cursor: pointer;
        }

        &.lazy-load:not([src]) {
          @keyframes shimmer {
            0% {
              background-position: -200% 0%;
            }
            100% {
              background-position: 200% 0%;
            }
          }
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
          filter: blur(4px);
          opacity: 0.6;
        }
      }
    }
  }
}
</style>
