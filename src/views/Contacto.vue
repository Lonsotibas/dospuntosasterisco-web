<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
</script>

<template>
  <div class="team-container">
    <div class="team-member">
      <img
        class="member-photo"
        src="@/assets/images/team/fito.png"
        alt="Fito Mellado"
      />
      <h3 class="member-name">Fito Mellado</h3>
      <p class="member-description">Descripción 1</p>
    </div>
    <div class="team-member">
      <img
        class="member-photo"
        src="@/assets/images/team/pancho.png"
        alt="Francisco Cancino"
      />
      <h3 class="member-name">Francisco Cancino</h3>
      <p class="member-description">
        Artista escénico, docente y creador de Concepción, con interés especial
        en el cruce entre la multimedia, la voz y las prácticas terapéuticas. MA
        en Estudios Avanzados de Teatro, con estudios en “Performance Vocal” y
        “Teatro Coreográfico”, bajo los lineamientos de la técnica Roy Hart
        (París), y la instrucción de Pantheatre -Linda Wise y Enrique Pardo-,
        con quienes continúa en formación hasta hoy. Certificado en Somatic
        Emotional Processing, certificado en Alba Emoting Nivel teacher,
        Diplomado en Docencia Universitaria UDD, Diplomado en Voz Profesional
        UPLA, Fonoaudiólogo USS. En paralelo, estudia constantemente bajo los
        lineamientos de las técnicas Fitzmaurice Voicework, Tai chi y Alexander
        a través de clases y seminarios. Actualmente, es docente de Voz en la
        escuela de Teatro de la U. de Concepción y en la escuela de
        Fonoaudiologia de la U. San Sebastián, dirige la plataforma de
        contemplación y experimentación en torno a la voz en las artes escénicas
        “Laboratorio Vocal Biobio”(LAVB), es miembro de la compañía de Danza
        Contemporánea Cuerpo Imaginario y pertenece a la plataforma
        de danza Conmover.
      </p>
      <Icon class="scroll-icon" icon="bi:chevron-double-down" />
    </div>
    <div class="team-member">
      <img
        class="member-photo"
        src="@/assets/images/team/matias.png"
        alt="Matias Gonzalez"
      />
      <h3 class="member-name">Matias Gonzalez</h3>
      <p class="member-description">
        Programador y artista audiovisual que explora entorno a la creación de
        experiencias inmersivas. Con estudios en Cine y TV (Universidad de
        Chile, 2017-2020), donde obtuvo experiencia desarrollando cortometrajes
        y videos musicales. Desde el 2020, se ha formado de manera autodidacta
        en el área de informatica, cumpliendo roles de Fullstack Developer y
        Data Analyst. Se ha especializado en las ciencias de datos, obteniendo
        una certificacion de Applied Data Science (MITx Professional Education,
        2024). Durante este proceso de aprendizaje, ha experimentado con
        tecnologías de livecoding, realidad aumentada, IA generativa y
        fotogrametria. Mezclando el arte y la tecnologia ha participado en
        diversos proyectos artísticos. Actualmente se encuentra desarrollando
        “moledor”, una aplicación clon de grindr (aplicación de citas gay) que
        busca explorar la simulación social en colaboración con Rodrigo Mellado
        (artista escénico) y Francisco Cancino (artista escénico). Ademas de
        “atmosphere”, un videojuego que mezcla el paisajismo con la simulación
        meteorológica, encargándose de la programación y desarrollando junto a
        Manuel Rivera (artista visual) y un equipo de artistas visuales, sonoros
        y programadores.
      </p>
      <Icon class="scroll-icon" icon="bi:chevron-double-down" />
    </div>
  </div>
  <div class="team-contact">
    <span>dospuntosasterisco.contacto@gmail.com </span>
  </div>
</template>

<style scoped lang="less">
.team-container {
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  .team-member {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1rem;
    width: 24rem;

    .member-photo {
      background-color: #fff;
      border-radius: 5%;
      width: 15rem;
      margin-bottom: 1rem;
    }

    .member-name {
      font-size: 2rem;
    }

    .member-description {
      height: 15rem;
      font-size: 1.2rem;
      text-align: justify;
      overflow-y: auto;
      scrollbar-width: none;
      font-size: 24px;
      line-height: 1.4;
      padding-right: 15px;
      margin-bottom: 0;
      color: fade(#ffffff, 80%);

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .scroll-icon {
      position: relative;
      margin-top: 1rem;
      font-size: 24px;
      color: fade(#ffffff, 80%);
      animation: bounce 2s infinite;
      background: rgba(var(--black), 0.7);
      border-radius: 50%;
      padding: 4px;
    }

    @keyframes bounce {
      0%,
      20%,
      50%,
      80%,
      100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-10px);
      }
      60% {
        transform: translateY(-5px);
      }
    }
  }

  .team-contact {
    width: 100vw;
    font-size: 1.5rem;
    color: fade(#ffffff, 80%);
  }
}
</style>
