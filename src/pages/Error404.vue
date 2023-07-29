<template>
  <div class="fullscreen flex flex-center relative-position no-scroll">
    <div class="absolute-full-width-height">
      <picture>
        <source :srcset="errorImageWebp" type="image/webp">
        <img class="full-size-image" :src="errorImage" alt="Error 404" />
      </picture>
    </div>
    <div class="overlay-content q-pa-md" style="background-color: rgba(0, 0, 0, 0.5); border-radius: 15px;">
      <div class="text-h2 q-mb-sm">¡Uy! Parece que un alien se llevó esta página 🛸</div>
      <q-btn color="white" text-color="black" unelevated to="/" label="Volver a la Tierra" no-caps />
    </div>
  </div>
</template>

<script>
import errorImagePath from '../assets/background/404.png';
import errorImageWebpPath from '../assets/background/webp/404.png.webp';
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
  setup() {
    return {
      errorImage: errorImagePath,
      errorImageWebp: errorImageWebpPath
    }
  }
});
</script>

<style scoped>
.fullscreen {
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}
.no-scroll {
  overflow: hidden;
}

.full-size-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.relative-position {
  position: relative;
}

.absolute-full-width-height {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay-content {
  z-index: 1;
  text-align: center;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  font-weight: bold;
}

.q-btn {
  background-color: white;
  color: black;
}
</style>
