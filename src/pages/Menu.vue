<template>
  <q-page>
    <div class="main-rectangle row">
      <div class="info-rectangle col">
        <p class="txt-title">Bienvenido olímpico</p>
        <p class="txt-progress">Progreso</p>
        <q-linear-progress rounded :value="0.3" size="8px" class="q-my-sm" />
        <p class="txt-level">Intermedio</p>
      </div>
      <div class="info-image column inline justify-end">
        <q-img class="q-mx-auto squares" src="~assets/img/squares.png" spinner-color="white" />
        <q-img class="q-mx-auto entrenator" src="~assets/img/entrenator.png" spinner-color="white" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainMenu",
});
</script>
