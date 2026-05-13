<script setup lang="ts">
import gsap from "gsap";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { onMounted, onUnmounted } from "vue";

THREE.Cache.enabled = true;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);
dracoLoader.preload();

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load(
  "/models/grindermanias.glb",
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  console.error
);

const light = new THREE.DirectionalLight(0xffffff, 5);
light.position.set(4, 3, 5);
scene.add(light);

camera.position.set(0, 1.5, 10);

const orbitRadius = 6;
let currentOrbitAngle = Math.PI * 1.5;
let renderer: THREE.WebGLRenderer;

const startOrbitAnimation = () => {
  const angleTarget = { angle: currentOrbitAngle };
  const targetAngle = currentOrbitAngle + Math.PI * 2;
  camera.position.y = 8;

  gsap.to(angleTarget, {
    angle: targetAngle,
    duration: 12,
    ease: "none",
    onUpdate: () => {
      camera.position.x = orbitRadius * Math.cos(angleTarget.angle);
      camera.position.z = orbitRadius * Math.sin(angleTarget.angle);
    },
    onComplete: () => {
      currentOrbitAngle = Math.PI * 1.5;
      startOrbitAnimation();
    },
  });
};

const animate = () => {
  camera.lookAt(0, 0, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

const onResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x131316, 1);

  const container = document.getElementById("ar");
  container?.appendChild(renderer.domElement);

  renderer.setAnimationLoop(animate);
  window.addEventListener("resize", onResize);
  startOrbitAnimation();
});

onUnmounted(() => {
  renderer?.setAnimationLoop(null);
  window.removeEventListener("resize", onResize);
  renderer?.dispose();
});
</script>

<template>
  <div id="ar"></div>
</template>

<style scoped lang="less">
#ar {
  position: absolute;
  top: 0;
  z-index: -2;
}
</style>
