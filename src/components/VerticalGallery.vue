<script setup lang="ts">
import { useTemplateRef, onMounted, ref } from "vue";
let itemHeight: any = defineProps(["itemHeight"]);
let height: any = ref("auto");
let verticalContentHeight = ref(0);
let verticalContentTop = ref(0);
let actionHeight = ref(0);
let contentHeight = ref(0);
let contentTop = ref(0);
let nextShow = true;
let prevShow = true;
let nextEnd = false;
const vertical: any = useTemplateRef("vertical");
const action: any = useTemplateRef("action");
const verticalContainer: any = useTemplateRef("vertical-container");

const prevFun = () => {
  if (contentTop.value < 0 && contentTop + itemHeight < 0) {
    contentTop += itemHeight;
    nextShow = true;
  } else {
    contentTop.value = 0;
    prevShow = false;
  }
};

const nextFun = () => {
  let isItemHeight =
    contentHeight.value + contentTop.value - height.value + actionHeight.value;
  if (isItemHeight > 0 && isItemHeight > itemHeight) {
    contentTop.value -= itemHeight;
    prevShow = true;
  } else {
    contentTop.value -= isItemHeight;
    nextShow = true;
    nextEnd = true;
  }
};

onMounted(() => {
  const parentStyle = getComputedStyle(vertical.value.parentNode);
  height.value = parseInt(parentStyle.height, 10);
  const actionStyle = getComputedStyle(action.value);
  actionHeight.value = parseInt(actionStyle.height, 10) * 2;
  const contentStyle = getComputedStyle(verticalContainer.value);
  contentHeight.value = parseInt(contentStyle.height, 10);
  if (contentHeight.value > height.value - actionHeight.value) {
    nextShow = true;
  }

  verticalContentHeight.value = height.value - actionHeight.value;
  verticalContentTop.value = actionHeight.value / 2;
});
</script>

<template>
  <div class="vertical-gallery" ref="vertical">
    <div @click="prevFun" class="vertical-prev" ref="action" v-show="prevShow">
      <div class="prev-span"></div>
    </div>
    <div
      class="vertical-content"
      :style="{
        height: `${height - actionHeight}px`,
        top: `${actionHeight / 2}px`,
      }"
    >
      <div
        class="vertical-container"
        ref="vertical-container"
        :style="{ top: `${contentTop}px` }"
      >
        <slot></slot>
      </div>
    </div>
    <div @click="nextFun" class="vertical-next" v-show="nextShow">
      <div class="next-span"></div>
    </div>
  </div>
</template>

<style lang="less">
.vertical-gallery {
  background-color: var(--white-soft);
  position: relative;
  height: 100%;
  .vertical-next,
  .vertical-prev {
    position: absolute;
    left: 0;
    width: 100%;
    height: 15px;
    background: #000;
    opacity: 0.5;
    cursor: pointer;
    z-index: 9;
    &:hover {
      opacity: 1;
    }
  }
  .vertical-next {
    bottom: 0;
  }
  .vertical-prev {
    top: 0;
  }
  .next-span,
  .prev-span {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10px;
    height: 5px;
    /* background: url("../assets/arrow.png") no-repeat; */
    background-size: 100%;
  }
  .next-span {
    transform: translate(-50%, -50%);
  }
  .prev-span {
    transform: translate(-50%, -50%) rotate(-180deg);
  }
  .vertical-content {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
  }
  .vertical-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition: all 0.3s linear;
  }
}
</style>
