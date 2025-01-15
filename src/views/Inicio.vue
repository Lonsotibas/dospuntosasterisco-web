<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { onMounted } from "vue";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0.6);
//document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco");
loader.load(
  "/public/models/Mounstro69_textured_mesh_medpoly_glb.glb",
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (err) => {
    console.error(err);
  }
);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 5;

const animate = () => {
  renderer.render(scene, camera);
  renderer.domElement.addEventListener("mousemove", (e: MouseEvent) => {
    scene.rotation.x += e.x * 0.0000001;
    scene.rotation.y -= e.y * 0.0000001;
  });
};

onMounted(() => {
  document.getElementById("ar")?.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
});
</script>

<template>
  <div id="ar"></div>
</template>

<style scoped>
#ar {
}
canvas {
  width: 1440px;
}
</style>
