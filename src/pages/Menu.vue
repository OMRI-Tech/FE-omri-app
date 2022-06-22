<template>
  <q-page>
    <div class="main-rectangle row">
      <div class="info-rectangle col-9">
        <p class="txt-title">Bienvenido olímpico</p>
        <p class="txt-progress">Progreso</p>
        <q-linear-progress rounded :value="0.3" size="8px" class="q-my-sm" />
        <p class="txt-level">Intermedio</p>
      </div>
      <div class="info-image col-3 column inline justify-end">
        <q-img class="q-mx-auto" src="~assets/img/squares.png" style="max-height: 70px; max-width: 75px;" spinner-color="white" />
        <q-img class="q-mx-auto" src="~assets/img/entrenator.png" style="-webkit-transform: scaleX(-1); transform: scaleX(-1); max-height: 100px; max-width: 75px;" spinner-color="white" />
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
