<script setup lang="ts">
import { ref } from "vue";

const activeGallery = ref(0);
let touchStartX = 0;
let touchStartY = 0;

const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
};

const onTouchEnd = (e: TouchEvent) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) activeGallery.value = Math.min(2, activeGallery.value + 1);
    else activeGallery.value = Math.max(0, activeGallery.value - 1);
  }
};
import VerticalGallery from "@/components/VerticalGallery.vue";
import { useImageLoader } from "@/composables/useImageLoader";
import GalleryModal from "@/components/GalleryModal.vue";

interface GalleryItem {
  image: string;
  fallback: string;
  alt: string;
}

interface Gallery {
  title: string;
  description: string;
}

const { generateGallery } = useImageLoader();
const galleries = ref([
  {
    items: generateGallery(3, 6),
    title: "Registro Lab dispositivos especuativos",
    description: ``,
  },
  {
    items: generateGallery(4, 16),
    title: "Residencia técnica NAVE - proceso",
    description: `
        En la necesidad por atender el potencial de :* (dospuntos asterisco) en cuanto
        al desarrollo de la app, la dramaturgia, el aspecto coreográfico y el aspecto visual, decidimos postular a la residencia técnica de NAVE 2024, con la colaboración del artista escénico Francisco Cancino como performer y director
        coreográfico.

        En esta instancia llevamos a cabo una residencia técnica con la asistencia del equipo del espacio y el uso de algunas de sus salas. Durante la residencia se continúa el desarrollo de Moledor y se retoma la fotogrametría como insumo de trabajo. Decidimos escanear nuestros cuerpos y ampliar el
        problema de la especulación de realidades mediante el diseño de un entorno 3D y el empleo de Realidad Aumentada (AR). Lo coreográfico se vio reforzado tras la participación de Francisco con quien pusimos en valor el cruce de la AR con la puesta en escena viva. Al estar en una etapa de desarrollo más
        avanzada, la app Moledor fue usada para especular en el encuentro de los
        perfomers en escena como usuarios de apps de citas, pudiendo visualizar las
        descripciones de los perfiles, con su función de mensajería instantánea activa,
        de tal forma que el chat revelaba la dramaturgia de la propuesta.
      `,
  },
  {
    items: generateGallery(5, 13),
    title: "Residencia ténica NAVE - Apertura ",
    description: "",
  },
]);

const modal = ref<InstanceType<typeof GalleryModal> | null>(null);
const selectedImage = ref("");
const selectedTitle = ref("");
const selectedDescription = ref("");

const openModal = (item: GalleryItem) => {
  selectedImage.value = item.image;
  modal.value?.openModal();
};

const selectGallery = (gallery: Gallery) => {
  selectedTitle.value = gallery.title;
  selectedDescription.value = gallery.description;
};
</script>

<template>
  <div
    class="residencias-container"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="galleries-track" :style="{ '--ag': activeGallery }">
      <div
        v-for="(gallery, index) in galleries"
        :key="index"
        class="gallery-column"
        @click="selectGallery(gallery)"
      >
        <VerticalGallery
          :items="gallery.items"
          @open-modal="openModal"
        />
        <div class="gallery-label">{{ gallery.title }}</div>
      </div>
    </div>
    <button
      v-if="activeGallery > 0"
      class="gallery-arrow gallery-arrow--left"
      @click="activeGallery--"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button
      v-if="activeGallery < galleries.length - 1"
      class="gallery-arrow gallery-arrow--right"
      @click="activeGallery++"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
  </div>
  <GalleryModal
    ref="modal"
    :image="selectedImage"
    :title="selectedTitle"
    :description="selectedDescription"
  />
</template>

<style lang="less" scoped>
.residencias-container {
  position: relative;
  display: flex;
  overflow: hidden;
  height: 95vh;
  /* width = 95vh makes each cell exactly square (95vh/3 wide × 95vh/3 tall) */
  width: 95vh;
  max-width: 100%;
  margin: 0 auto;
}

.galleries-track {
  display: flex;
  flex: 1;
  height: 100%;

  .gallery-column {
    flex: 1;
    position: relative;
    border-right: 1px solid rgba(255, 255, 255, 0.12);

    &:last-child {
      border-right: none;
    }

    &:hover .gallery-label {
      color: var(--color-text);
      border-top-color: var(--color-border-hover);
      background: rgba(19, 19, 22, 0.85);
    }
  }

  .gallery-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.6rem 0.75rem;
    font-family: electrolize, system-ui, sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: var(--color-text-dim);
    background: rgba(19, 19, 22, 0.6);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border-top: 1px solid var(--color-border);
    transition: color 0.25s ease, border-top-color 0.25s ease, background 0.25s ease;
    pointer-events: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.gallery-arrow {
  display: none;
}

@media (max-width: 768px) {
  .gallery-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(19, 19, 22, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid var(--color-border);
    color: var(--color-text);
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    cursor: pointer;
    padding: 0;

    svg {
      width: 1.1rem;
      height: 1.1rem;
      display: block;
    }

    &--left  { left: 0.6rem; }
    &--right { right: 0.6rem; }
  }

  .residencias-container {
    width: 100%;
    height: 94vh;
  }

  .galleries-track {
    flex: none;
    width: 300vw;
    transform: translateX(calc(var(--ag, 0) * -100vw));
    transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    .gallery-column {
      flex: none;
      width: 100vw;
      height: 94vh;
      border-right: 1px solid rgba(255, 255, 255, 0.12);
      border-bottom: none;

      &:last-child {
        border-right: none;
      }
    }

    .gallery-label {
      font-size: 0.8rem;
      white-space: normal;
    }
  }
}
</style>
