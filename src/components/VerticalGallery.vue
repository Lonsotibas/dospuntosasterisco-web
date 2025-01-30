<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

interface GalleryItem {
  image: string;
  fallback: string;
  alt: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
}

const props = defineProps<{
  items: GalleryItem[];
  openModal: (item: GalleryItem) => void;
}>();

const container = ref<HTMLElement | null>(null);
const autoScrollInterval = ref<NodeJS.Timeout | null>(null);
const scrollDirection = ref<"up" | "down">(Math.random() < 0.5 ? "up" : "down");
const scrollDelay = ref(2000 + Math.random() * 1000);
let observer: IntersectionObserver;
const loadedImages = ref(new Set<number>());

const autoScroll = () => {
  if (!container.value) return;

  const itemHeight = container.value.offsetHeight / 3;
  const currentScroll = container.value.scrollTop;
  const maxScroll = container.value.scrollHeight - container.value.clientHeight;

  let nextScroll =
    currentScroll +
    (scrollDirection.value === "down" ? itemHeight * 0.8 : -itemHeight * 0.8);
  let newDirection = scrollDirection.value;

  if (nextScroll >= maxScroll) {
    nextScroll = maxScroll;
    newDirection = "up";
  } else if (nextScroll <= 0) {
    nextScroll = 0;
    newDirection = "down";
  }

  const variation = Math.random() * 2000 - 250;
  const efectiveDelay = Math.max(2500, 4000 + variation);

  container.value.scrollTo({
    top: nextScroll,
    behavior: "smooth",
  });

  scrollDirection.value = newDirection;
  scrollDelay.value = efectiveDelay;
};

const startAutoScroll = () => {
  if (autoScrollInterval.value) return;
  const scrollWithDelay = () => {
    autoScroll();
    autoScrollInterval.value = setTimeout(scrollWithDelay, scrollDelay.value);
  };
  autoScrollInterval.value = setTimeout(
    scrollWithDelay,
    1500 + Math.random() * 1000
  );
};

const stopAutoScroll = () => {
  if (!autoScrollInterval.value) return;
  clearTimeout(autoScrollInterval.value);
  autoScrollInterval.value = null;
};

const handleWheel = (event: WheelEvent) => {
  if (!container.value) return;

  event.preventDefault();
  const delta = Math.sign(event.deltaY);
  const itemHeight = container.value.offsetHeight / 3;
  const targetScroll = container.value.scrollTop + delta * itemHeight;

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

const setupLazyLoading = () => {
  // Change IntersectionObserver configuration
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
<<<<<<< HEAD
          // Add 100ms delay to ensure scroll position is stable
          setTimeout(() => loadImage(img), 100);
=======
          const idx = Number(img.dataset.index);
          if (!loadedImages.value.has(idx)) {
            img.src =
              img.dataset.src || img.dataset.fallback || "/images/no-image.png";
            loadedImages.value.add(idx);
          }
          observer.unobserve(img);
>>>>>>> b64f4ef (Residencia)
        }
      });
    },
    {
      root: container.value,
      rootMargin: "500px 0px",
      threshold: 0.01,
    }
  );

  const loadImage = (img: HTMLImageElement) => {
    const idx = Number(img.dataset.index);
    if (!loadedImages.value.has(idx)) {
      img.src =
        img.dataset.src || img.dataset.fallback || "/images/no-image.png";
      loadedImages.value.add(idx);
      observer.unobserve(img);
    }
  };
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error("Image load error:", img.dataset.src);

  if (img.dataset.fallback) {
    img.src = img.dataset.fallback;
    img.onerror = () => {
      img.src = "/images/no-image.png";
      img.onerror = null;
    };
  } else {
    img.src = "/images/no-image.png";
  }
};

onMounted(() => {
  setupLazyLoading();
<<<<<<< HEAD
  // Preload first 3 items in THIS gallery
=======
  startAutoScroll();

>>>>>>> b64f4ef (Residencia)
  const firstThree = container.value?.querySelectorAll(
    '[data-index="0"], [data-index="1"], [data-index="2"]'
  );
  firstThree?.forEach((img) => {
    const target = img as HTMLImageElement;
    target.src = target.dataset.src!;
    loadedImages.value.add(Number(target.dataset.index));
  });

  const images = container.value?.querySelectorAll(".lazy-load");
  images?.forEach((img) => observer.observe(img));
});

<<<<<<< HEAD
// Add cleanup in onBeforeUnmount
=======
const handleMouseEnter = () => {
  stopAutoScroll();
  if (!container.value) return;
  container.value.dataset.lastScrollTop = container.value.scrollTop.toString();
};

const handleMouseLeave = () => {
  setTimeout(() => {
    if (!container.value || !container.value.dataset.lastScroll) return;
    container.value.scrollTop = Number(container.value.dataset.lastScrollTop);
    startAutoScroll();
  });
};

>>>>>>> b64f4ef (Residencia)
onBeforeUnmount(() => {
  stopAutoScroll();
  observer?.disconnect();
  loadedImages.value.clear();
  container.value = null;
});
<<<<<<< HEAD
</script>

<template>
  <div class="gallery-container" @wheel.passive="handleWheel" ref="container">
=======

defineExpose({ startAutoScroll, stopAutoScroll });
</script>

<template>
  <div
    class="gallery-container"
    @wheel="handleWheel"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="container"
  >
>>>>>>> b64f4ef (Residencia)
    <div class="items-container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="gallery-item"
        @click="openModal(item)"
      >
        <img
          :data-src="item.image"
          :data-fallback="item.fallback"
          :data-srcset="item.srcset"
          :data-sizes="item.sizes"
          :width="item.width"
          :height="item.height"
          :alt="item.alt"
          :data-index="index"
          @error="handleImageError"
          class="gallery-image lazy-load"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.gallery-container {
  will-change: scroll-position;
  contain: layout paint style;
  content-visibility: auto;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  transition: scroll-top 3s ease-in-out;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;

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
      transition: transform 1.5s ease-in-out;
      image-rendering: -webkit-optimize-contrast;
<<<<<<< HEAD
      content-visibility: auto;
      contain-intrinsic-height: 30vh;
      width: 100%;
      height: 30vh; /* Show 3 items at a time */
=======
      width: 100%;
      height: 33.334vh; /* Show 3 items at a time */
>>>>>>> b64f4ef (Residencia)
      scroll-snap-align: start;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border-bottom: 1px solid #ddd;

      .gallery-title {
        font-size: 0.7rem;
        text-align: center;
        height: 5vh;
      }

      .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;

        &:hover {
          cursor: pointer;
        }

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

          &:not([src]) {
            background: #f0f0f0
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="%23ccc" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"/></svg>')
              no-repeat center;
            background-size: 40px;
          }
        }

        &:nth-child(-n + 3) {
          content-visibility: visible;
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
