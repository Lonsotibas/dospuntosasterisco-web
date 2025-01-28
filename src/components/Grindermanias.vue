<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import { onMounted, onUnmounted } from "vue";

// Configuration
const width = 1440;
const height = 1080;
const initialCameraPosition = new THREE.Vector3(0, 1.5, 5);
THREE.Cache.enabled = true;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setClearColor(0x131316, 1);

// Loaders setup
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
dracoLoader.preload();

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

// Model loading
loader.load(
  "/models/grindermanias.glb",
  (gltf) => {
    scene.add(gltf.scene);
  },
  undefined,
  (err) => {
    console.error(err);
  }
);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(6, 3, 5);
scene.add(light);

// Camera setup
const initialPosition = new THREE.Vector3(0,1.5,5);
camera.position.copy(initialCameraPosition);


// Animation parameters
const orbitRadius = 5;
let currentOrbitAngle = Math.PI * 1.5; // Initial angle for through animation end position

// Animation functions
const startThroughAnimation = () => {
  // Reset to initial position before starting through animation
  camera.position.set(0, 1.5, 5);

  gsap.to(camera.position, {
    z: -5,
    duration: 3,
    ease: "power1.inOut",
    onComplete: startOrbitAnimation
  });
};

const startOrbitAnimation = () => {
  const angleTarget = { angle: currentOrbitAngle };
  const targetAngle = currentOrbitAngle + Math.PI; // 180 degree rotation
  const orbitDuration = 4;

  gsap.to(angleTarget, {
    angle: targetAngle,
    duration: orbitDuration,
    ease: "power1.inOut",
    onUpdate: () => {
      camera.position.x = orbitRadius * Math.cos(angleTarget.angle);
      camera.position.z = orbitRadius * Math.sin(angleTarget.angle);
    },
    onComplete: () => {
      currentOrbitAngle = targetAngle % (Math.PI * 2);
      startThroughAnimation();
    }
  });
};

// Rendering loop
const animate = () => {
  camera.lookAt(0, 0, 0);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  renderer.render(scene, camera);
};

// Lifecycle hooks
onMounted(() => {
  const container = document.getElementById("ar");
  container?.appendChild(renderer.domElement);

  renderer.setAnimationLoop(animate);

  window.addEventListener("resize", () => {
    camera.aspect = (window.innerWidth/2) /  (window.innerHeight/2);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  });

  startThroughAnimation();
});

onUnmounted(() => {
    renderer.setAnimationLoop(null);
})
</script>

<template>
  <div id="ar"></div>
</template>

<style scoped lang="less">
#ar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  height: 70vh;
}
</style>
