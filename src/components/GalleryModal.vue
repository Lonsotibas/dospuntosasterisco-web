<script setup lang="ts">
import { ref, nextTick, onUnmounted, onBeforeUnmount, onMounted } from "vue";
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const isOpen = ref(false);
const showScrollIcon = ref(false);
const descriptionElement = ref<HTMLElement | null>(null);
const resizeObserver = ref<ResizeObserver | null>(null);

const checkScrollStatus = () => {
  if (!descriptionElement.value) return;
  const { scrollHeight, clientHeight } = descriptionElement.value;
  showScrollIcon.value = scrollHeight > clientHeight;
};

const handleScroll = () => {
  if (!descriptionElement.value) return;
  const { scrollTop, scrollHeight, clientHeight } = descriptionElement.value;
  showScrollIcon.value = scrollTop + clientHeight < scrollHeight;
};

const isActive = ref(false);
const isTapped = ref(false);

const handleTap = () => {
  isActive.value = !isActive.value;
  isTapped.value = !isTapped.value;
  setTimeout(() => {
    isTapped.value = false;
  }, 500);
};

const openModal = () => {
  isOpen.value = true;
  nextTick(() => {
    if (descriptionElement.value) {
      resizeObserver.value?.observe(descriptionElement.value);
    }
    checkScrollStatus();
    setTimeout(checkScrollStatus, 100);
  });
};
const closeModal = () => {
  emit("close");
  isOpen.value = false;
  isActive.value = false;
  window.removeEventListener("resize", checkScrollStatus);
};

onMounted(() => {
  resizeObserver.value = new ResizeObserver(checkScrollStatus);
  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
  };
  window.addEventListener("keydown", handleKey);
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKey);
  });
});

onUnmounted(() => {
  resizeObserver.value?.disconnect();
});

defineExpose({ openModal, closeModal });
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <Icon class="back-button" icon="bi:arrow-left" @click="closeModal" />
        <Icon
          class="tap-icon"
          icon="fluent-emoji-flat:fire"
          :class="{ jump: isTapped, active: isActive }"
          @click="handleTap"
        />
      </div>
      <div class="image-container">
        <img :src="image" alt="Profile image" class="modal-image" />
      </div>
      <div class="modal-body">
        <span class="modal-title">{{ title }}</span>
        <div class="modal-content">
          <p
            ref="descriptionElement"
            class="modal-description"
            @scroll="handleScroll"
          >
            {{ description }}
          </p>
          <Icon
            v-if="showScrollIcon"
            class="scroll-icon"
            icon="bi:chevron-double-down"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@primary-color: var(--tropical-indigo); // Grindr's blue accent color
@dark-bg: var(--black); // Dark background
@text-color: #ffffff; // White text

.modal-overlay {
  user-select: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-container {
    position: relative;
    background: @dark-bg;
    border-radius: 15px;
    width: 90%;
    height: 90vh;
    max-width: 30vw;
    box-shadow: 0 5px 7px rgba(0, 0, 0, 0.75);

    .scroll-icon {
      position: absolute;
      bottom: 20px;
      right: 20px;
      font-size: 24px;
      color: fade(@text-color, 80%);
      animation: bounce 2s infinite;
      background: rgba(@dark-bg, 0.7);
      border-radius: 50%;
      padding: 4px;
    }

    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }

    .tap-icon {
      filter: grayscale(100%);
      transition: filter 0.3s ease;

      &.jump {
        animation: jump 0.5s ease-in-out;
        filter: none !important;
      }

      &:hover {
        cursor: pointer;
        filter: none;
      }

      &.active {
        filter: none !important;
      }
    }

    @keyframes jump {
      0% {
        transform: translateY(0) scale(1);
      }
      50% {
        transform: translateY(-20px) scale(1.2);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }

    .modal-header {
      padding: 10px 15px;
      height: 5vh;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .back-button {
        font-size: 34px;
        cursor: pointer;
        z-index: 1;
        transition: color 0.3s ease;

        &:hover {
          color: @primary-color;
        }
      }
      .tap-icon {
        filter: grayscale(100%);
        font-size: 34px;
        color: @primary-color;

        &:hover {
          cursor: pointer;
          filter: none;
        }
      }
    }

    .image-container {
      width: 100%;
      height: 40vh;
      position: relative;

      .modal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .modal-body {
      padding: 20px;
      height: 36vh;

      .scroll-icon {
        font-size: 32px;
        right: 5px;
      }

      .modal-title {
        font-size: 26px;
        color: @primary-color;
      }

      .modal-content {
        height: 100%;
        margin-top: 10px;

        .modal-description {
          height: 100%;
          overflow-y: auto;
          scrollbar-width: none;
          font-size: 24px;
          line-height: 1.4;
          padding-right: 15px;
          margin-bottom: 0;
          color: fade(@text-color, 80%);

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}
</style>
