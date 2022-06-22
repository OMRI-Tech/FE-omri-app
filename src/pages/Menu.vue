<template>
  <q-page>
    <div class="main-rectangle row">
      <div class="col-8">
        <p class="txt-title">Bienvenido olímpico</p>
        <p class="txt-progress">Progreso</p>
        <q-linear-progress rounded :value="0.3" size="8px" class="q-my-sm" />
        <p class="txt-level">Intermedio</p>
      </div>
      <div class="col-4 column inline">
        <q-img class="q-mx-auto" src="~assets/img/squares.png" style="max-height: 50px; max-width: 61px;" spinner-color="white" width="60%" />
        <q-img class="q-mx-auto" src="~assets/img/entrenator.png" style="-webkit-transform: scaleX(-1); transform: scaleX(-1); max-height: 83px; max-width: 71px;" spinner-color="white" width="70%" />
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
