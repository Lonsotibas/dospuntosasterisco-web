<script setup lang="ts">
import { ref } from "vue";
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
  <div class="residencias-container">
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
  <GalleryModal
    ref="modal"
    :image="selectedImage"
    :title="selectedTitle"
    :description="selectedDescription"
  />
</template>

<style lang="less" scoped>
.residencias-container {
  display: flex;
  overflow: hidden;
  height: 95vh;
  /* width = 95vh makes each cell exactly square (95vh/3 wide × 95vh/3 tall) */
  width: 95vh;
  max-width: 100%;
  margin: 0 auto;

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
</style>
