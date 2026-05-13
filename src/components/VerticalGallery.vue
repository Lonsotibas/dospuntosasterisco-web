<script setup lang="ts">
import gsap from "gsap";
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";

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

// Clone the last 3 items at the front and first 3 at the back so the scroll
// can flow past either boundary and then silently teleport to real content.
const CLONE_COUNT = 3;

const clonedItems = computed(() => [
  ...props.items.slice(-CLONE_COUNT), // tail clones  (indices 0..2)
  ...props.items,                      // real items   (indices 3..N+2)
  ...props.items.slice(0, CLONE_COUNT),// head clones  (indices N+3..N+5)
]);

const container = ref<HTMLElement | null>(null);
const currentPage = ref(CLONE_COUNT); // start at the first real item, past the tail clones
const autoScrollTimer = ref<ReturnType<typeof setTimeout> | null>(null);
const loadedImages = ref(new Set<number>());
let observer: IntersectionObserver;
let scrollTween: gsap.core.Tween | null = null;

const itemHeight = () =>
  container.value ? container.value.offsetHeight / 3 : 0;

const maxPage = () => clonedItems.value.length - CLONE_COUNT;

// After any scroll animation, if we landed in a clone zone, jump instantly
// to the visually identical real position.
const checkAndLoop = () => {
  if (!container.value) return;
  const N = props.items.length;

  if (currentPage.value >= N + CLONE_COUNT) {
    // Landed in head clone zone → same content as real first page
    currentPage.value = CLONE_COUNT;
    container.value.scrollTop = currentPage.value * itemHeight();
  } else if (currentPage.value <= 0) {
    // Landed in tail clone zone → same content as real last page
    currentPage.value = N;
    container.value.scrollTop = currentPage.value * itemHeight();
  }
};

const scrollToPage = (page: number, duration = 1.2) => {
  if (!container.value) return;
  const target = Math.max(0, Math.min(Math.round(page), maxPage()));
  currentPage.value = target;
  scrollTween?.kill();
  scrollTween = gsap.to(container.value, {
    scrollTop: target * itemHeight(),
    duration,
    ease: "power2.inOut",
    onComplete: checkAndLoop,
  });
};

const autoScroll = () => {
  const direction = Math.random() < 0.5 ? 1 : -1;
  scrollToPage(currentPage.value + direction);
};

const randomDelay = () => 1000 + Math.random() * 4000; // 1 – 5 s

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
  event.preventDefault();
  if (scrollTween?.isActive()) return;
  scrollToPage(currentPage.value + Math.sign(event.deltaY), 0.5);
};

const setupLazyLoading = () => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target as HTMLImageElement;
        const idx = Number(img.dataset.index);
        if (!loadedImages.value.has(idx)) {
          img.src =
            img.dataset.src || img.dataset.fallback || "/images/no-image.png";
          loadedImages.value.add(idx);
        }
        observer.unobserve(img);
      });
    },
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

onMounted(async () => {
  await nextTick();
  setupLazyLoading();

  const total = clonedItems.value.length;
  container.value?.querySelectorAll<HTMLImageElement>(".lazy-load").forEach((img) => {
    const idx = Number(img.dataset.index);
    // Eagerly load the clone buffers + a few real items at both ends so
    // the wrap-around never shows unloaded images.
    const nearStart = idx < CLONE_COUNT * 2;
    const nearEnd = idx >= total - CLONE_COUNT * 2;
    if (nearStart || nearEnd) {
      img.src = img.dataset.src!;
      loadedImages.value.add(idx);
    } else {
      observer.observe(img);
    }
  });

  // Position scroll at real first item (past the tail clones).
  if (container.value) {
    container.value.scrollTop = CLONE_COUNT * itemHeight();
  }

  startAutoScroll();
});

const handleMouseEnter = () => {
  stopAutoScroll();
  scrollTween?.kill();
};

const handleMouseLeave = () => {
  if (container.value) {
    currentPage.value = Math.round(container.value.scrollTop / itemHeight());
  }
  startAutoScroll();
};

onBeforeUnmount(() => {
  stopAutoScroll();
  scrollTween?.kill();
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
        v-for="(item, index) in clonedItems"
        :key="index"
        class="gallery-item"
        @click="emit('open-modal', item)"
      >
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
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .items-container {
    .gallery-item {
      box-sizing: border-box;
      width: 100%;
      height: calc(95vh / 3);
      position: relative;
      overflow: hidden;

      & + & {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        inset: 0;

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
          background: linear-gradient(
            90deg,
            #1a1a1a 25%,
            #2a2a2a 50%,
            #1a1a1a 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      }
    }
  }
}
</style>
