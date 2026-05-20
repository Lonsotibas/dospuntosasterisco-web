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
dracoLoader.setDecoderPath("/draco/");
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

const isMobile = () => window.innerWidth <= 768;
const getRenderHeight = () =>
  isMobile() ? Math.round(window.innerHeight * 0.45) : window.innerHeight;

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
  renderer.render(scene, camera);
};

const onResize = () => {
  const h = getRenderHeight();
  camera.aspect = window.innerWidth / h;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, h);
};

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x131316, 1);

  const container = document.getElementById("ar");
  container?.appendChild(renderer.domElement);

  onResize();
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

@media (max-width: 768px) {
  #ar {
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
}
</style>
