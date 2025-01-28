<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  itemHeight: { type: Number, required: true },
});

const height = ref(0);
const contentHeight = ref(0);
const contentTop = ref(0);
const vertical = ref<HTMLElement | null>(null);
const verticalContainer = ref<HTMLElement | null>(null);

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  const delta = Math.sign(event.deltaY);
  delta > 0 ? nextFun() : prevFun();
};

const prevFun = () => {
  contentTop.value += props.itemHeight;
  if (contentTop.value > 0) {
    contentTop.value -= contentHeight.value;
  }
};

const nextFun = () => {
  contentTop.value -= props.itemHeight;
  const maxScroll = contentHeight.value - height.value;
  if (contentTop.value < -maxScroll) {
    contentTop.value += contentHeight.value;
  }
};

onMounted(() => {
  const parent = vertical.value?.parentNode as HTMLElement;
  if (parent) {
    height.value = parseInt(getComputedStyle(parent).height, 10);
  }
  if (verticalContainer.value) {
    contentHeight.value = parseInt(
      getComputedStyle(verticalContainer.value).height,
      10
    );
  }
});
</script>

<template>
  <div class="vertical-gallery" ref="vertical">
    <div
      class="vertical-content"
      :style="{ height: `${height}px` }"
      @wheel="handleWheel"
    >
      <div
        class="vertical-container"
        ref="vertical-container"
        :style="{ transform: `translateY(${contentTop}px)` }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.vertical-gallery {
  background-color: var(--white-soft);
  position: relative;
  height: 100%;
  .vertical-content {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .vertical-container {
    position: absolute;
    left: 0;
    width: 100%;
    transition: transform 0.3s linear;
  }
}
</style>
