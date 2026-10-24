<template>
  <q-dialog v-model="internalVisible" :maximized="isMobile">
    <q-card>
      <q-bar class="bg-blue">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-h6">Sobre el curso de programación competitiva</div>
      </q-card-section>

      <q-separator />

      <q-card-section >
        <div>
          <p class="text-justify">
            El entrenamiento será en línea, impartido por miembros de la OMRI a través de Zoom y de nuestra plataforma Entrenator
            <strong>todos los sábados</strong> desde el <strong>28 de febrero de 2026</strong>.
            <br/><br/>Cada categoría participará con el lenguaje de programación respectivo:
          </p>
          <ul>
            <li><strong>Primaria y secundaria:</strong> Karel Java</li>
            <li><strong>Preparatoria:</strong> C y C++</li>
          </ul>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Cerrar ventana" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, watch, computed } from "vue";
import olimpicosPng from "assets/img/olimpicos2022.png";
import olimpicosWebp from "assets/img/webp/olimpicos2022.png.webp";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const isMobile = computed(() => {
      return $q.screen.lt.sm
    })
    const images = {
      olimpicosPng,
      olimpicosWebp,
    };
    const internalVisible = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        internalVisible.value = newValue;
      }
    );

    watch(internalVisible, (newValue) => {
      if (newValue !== props.modelValue) {
        emit("update:modelValue", newValue);
      }
    });

    return {
      images,
      internalVisible,
      isMobile,
    };
  },
});
</script>
