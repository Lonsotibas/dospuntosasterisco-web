<script setup lang="ts">
import { ref, onMounted } from "vue";

const text = [
  "El proyecto se configura como una acción performática en proceso que ahonda en los modos de uso de los dispositivos de interacción digital, y la emergencia de violencia en ellos.",
  "La acción invita a reflexionar en torno al uso del teléfono inteligente y las RRSS, específicamente, indaga en los flujos cibernéticos de la app de citas Grindr empleando un ejercicio especultativo como herramienta de producción de realidad, entendiendo esta plataforma como un ciberespacio de violencias sistemáticas expresadas en forma de acoso, abuso, discriminación, entre otras.",
  "La aplicación aparece como un espacio donde se da rienda suelta al anonimato, en el que se cruzan formas de deseo basadas en el consumo y tráfico de cuerpos humanos, datos y sustancias.",
  "Buscamos visibilizar algunos efectos que emergen en la socialización virtual, tales como ansiedad, agotamiento, trastornos en la autopercepción y la autoestima, y en el peor de los casos, conductas autodestructivas, abuso de sustancias, suicidios o crímenes de odio.",
];

const rightText = ref("");
const leftText = ref("");
const currentTextIndex = ref(0);
const currentCharIndex = ref(0);
const previousCharIndex = ref(0);
const currentText = ref("");
const previousText = ref("");
const isLeft = ref(false);

const typeWriter = () => {
  currentText.value = text[currentTextIndex.value];
  const typeSpeed = 50;

  if (isLeft.value) {
    leftText.value = currentText.value.substring(0, currentCharIndex.value);
  } else {
    rightText.value = currentText.value.substring(0, currentCharIndex.value);
  }
  currentCharIndex.value++;

  if (
    leftText.value === currentText.value ||
    rightText.value === currentText.value
  ) {
    previousCharIndex.value = currentCharIndex.value;
    previousText.value = currentText.value;
    deteleText();
    isLeft.value = !isLeft.value;
    currentTextIndex.value++;
    currentCharIndex.value = 0;
  }
  if (currentTextIndex.value === text.length) {
    currentTextIndex.value = 0;
  }
  setTimeout(typeWriter, typeSpeed);
};

const deteleText = () => {
  const deleteSpeed = 200;
  if (!isLeft.value) {
    leftText.value = previousText.value.substring(
      0,
      previousCharIndex.value - 1
    );
  } else {
    rightText.value = previousText.value.substring(
      0,
      previousCharIndex.value - 1
    );
  }
  previousCharIndex.value--;
  if (previousCharIndex.value === 0) {
    return;
  }
  setTimeout(deteleText, deleteSpeed);
};

onMounted(() => {
  setTimeout(typeWriter, 1000);
});
</script>

<template>
  <div class="typewriter left">
    <span>
      {{ leftText }}
    </span>
    <span class="cursor"></span>
  </div>
  <div class="typewriter right">
    <span>
      {{ rightText }}
    </span>
    <span class="cursor"></span>
  </div>
</template>

<style scoped lang="less">
.typewriter {
  position: absolute;
  width: 20vw;
  font-size: 1.4rem;

  .cursor {
    border-right: 0.1em solid #fff;
    animation: blink 1s step-end infinite;
  }

  &.left {
    left: 5vw;
    top: 10vh;
  }

  &.right {
    right: 5vw;
    top: 65vh;
  }

  @keyframes blink {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #000;
    }
  }
}
</style>
