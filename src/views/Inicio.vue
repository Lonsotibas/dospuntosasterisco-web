<script setup lang="ts">
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
  "/models/Mounstro69_textured_mesh_medpoly_glb.glb",
  (gltf) => {
    model = scene.add(gltf.scene);
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
  renderer.setSize(width, height);
  width = document.getElementById("ar")?.offsetWidth || 0;
  height = document.getElementById("ar")?.offsetHeight || 0;
  document.body.addEventListener("mousemove", (e: MouseEvent) => {
    let mouseX = e.x * 0.001;
    let mouseY = e.y * 0.001;

    const elapsedTime = new THREE.Clock().getElapsedTime();
    model.rotation.x = 0 * elapsedTime;
    model.rotation.y = 0 * elapsedTime;

    model.rotation.x += 3 * (mouseY - model.rotation.x);
    model.rotation.y -= 0.9 * (mouseX - model.rotation.y);
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
    <div id="text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque dolorem,
      dolor accusantium atque dolore, deserunt voluptate, amet veritatis dicta
      eligendi repudiandae aliquam? Esse, libero dignissimos ad minima animi,
      eligendi error placeat porro debitis ea, laudantium nulla! Quis
      consequuntur necessitatibus aperiam illum et ab quos aut ipsum dolorem
      blanditiis, sint optio rem voluptate debitis quod perspiciatis dolore
      repellat tempore unde voluptatibus similique illo! Quas unde fugit tempora
      illo sit minima soluta? Explicabo culpa aperiam earum obcaecati,
      laboriosam ullam dignissimos accusamus necessitatibus!
    </div>
    <div id="text-2">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum sed possimus
      molestias obcaecati distinctio! Corporis consequatur deleniti et pariatur
      culpa temporibus magni perferendis ex! Aspernatur reprehenderit debitis,
      amet accusamus laboriosam nobis tenetur! Eaque, placeat. Ipsum molestias
      voluptate libero odio nesciunt, animi obcaecati dolorum? Tempora, ipsum
      mollitia! Amet culpa quasi aspernatur ex omnis reprehenderit adipisci.
      Ipsam facilis possimus repellat vero ut? Quis in magnam incidunt odit
      dolorem nostrum cumque illo ipsum beatae consequatur placeat delectus
      minima, suscipit error? Laboriosam, quasi cupiditate.
    </div>
  </div>
</template>

<style scoped>
#view {
  display: flex !important;
  justify-content: center;
}
#ar {
  max-width: 100%;
  height: 90vh;
}
#text {
  position: absolute;
  left: 20vw;
  top: 20vh;
  width: 15vw;
}
#text-2 {
  text-align: right;
  position: absolute;
  right: 20vw;
  top: 20vh;
  width: 15vw;
}
</style>
