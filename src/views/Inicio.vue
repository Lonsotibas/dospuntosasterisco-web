<script setup lang="ts">
import TypeText from "@/components/TypeText.vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { onMounted } from "vue";

let width = 1440;
let height = 1080;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x131316, 1);
//document.body.appendChild(renderer.domElement);

let model: THREE.Scene;
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco");
loader.load(
  "/models/grindermanias.glb",
  (gltf) => {
    model = scene.add(gltf.scene);
  },
  undefined,
  (err) => {
    console.error(err);
  }
);

const light = new THREE.DirectionalLight(0xffffff, 4);
light.castShadow = true;
light.position.set(4, 2, 3);
light.target.position.set(0, 0, 0);
scene.add(light);

camera.position.z = 10;

const animate = () => {
  renderer.render(scene, camera);
  renderer.setSize(width, height);
  width = document.getElementById("ar")?.offsetWidth || 0;
  height = document.getElementById("ar")?.offsetHeight || 0;
  document.body.addEventListener("mousemove", (e: MouseEvent) => {
    let mouseX = e.x * 0.001;
    let mouseY = e.y * 0.001;

    const elapsedTime = new THREE.Clock().getElapsedTime();
    model.rotation.x = 0 * elapsedTime;
    model.rotation.y = 0 * elapsedTime;

    model.rotation.x -= 3 * (-mouseY - model.rotation.x);
    model.rotation.y -= 4 * (-mouseX - model.rotation.y);
  });
};

onMounted(() => {
  document.getElementById("ar")?.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
});
</script>

<template>
  <div id="view">
    <div id="ar"></div>
    <TypeText />
  </div>
</template>

<style scoped lang="less">
#view {
  display: flex !important;
  justify-content: center;
}
#ar {
  max-width: 100%;
  height: 90vh;
}
</style>
