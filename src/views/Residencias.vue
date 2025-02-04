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
    items: generateGallery(1, 3),
    title: "CiberAfecciones, tecnopoéticas para un hackeo identitario - NAVE",
    description: `
        Durante la residencia compartimos con la comunidad
        circundante a NAVE el laboratorio Ciber-Afecciones: tecnopoéticas para un
        hackeo identitario, espacio en el que revisamos conceptos y referencias de la
        cibernética, la ciencia ficción y la programación.
   `,
  },
  {
    items: generateGallery(2, 9),
    title: "Residencia de creación NAVE - Apertura de proceso ",
    description: `
        Colaboración junto a Matías González en el
        marco de la residencia de creación e investigación :* (dospuntos asterisco)
        de Centro NAVE (2023). Allí se desarrolla de un clon de la app de citas Grindr
        -que nombramos Moledor- , se recopila la data para la investigación teórica
        y la puesta en escena. Al finalizar la residencia tuvimos una apertura de proceso abierta al público en la que pudimos compartir algunos aspectos de la
        investigación teórica.
      `,
  },
  {
    items: generateGallery(3, 6),
    title: "Registro Lab dispositivos especuativos",
    description: `

      `,
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
    title: "Residencia ténica NAVE - Apertura ",
    description: "",
  },
]);
const modal = ref<InstanceType<typeof GalleryModal> | null>(null);
const galleryRef = ref<InstanceType<typeof VerticalGallery> | null>(null);
const selectedImage = ref("");
const selectedTitle = ref("");
const selectedDescription = ref("");

const openModal = (item: GalleryItem) => {
  selectedImage.value = item.image;
  galleryRef.value?.stopAutoScroll();
  modal.value?.openModal();
};

const selectGallery = (gallery: Gallery) => {
  selectedTitle.value = gallery.title;
  selectedDescription.value = gallery.description;
};
</script>

<template>
  <div class="residencias-container">
    <VerticalGallery
      v-for="(gallery, index) in galleries"
      :key="index"
      :items="gallery.items"
      :openModal="openModal"
      @click="selectGallery(gallery)"
    />
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
  will-change: contents;
  backface-visibility: hidden;
  display: flex;
  overflow: hidden;
  height: 95vh;

  > * {
    flex: 1;
    width: 20%;
    border-right: 2px solid #000;

    &:last-child {
      border-right: none;
    }
  }
}
</style>
