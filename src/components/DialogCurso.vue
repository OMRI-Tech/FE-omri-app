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
            El entrenamiento de la XX OMRI está programado para iniciar
            <strong v-if="trainingStartLabel">el {{ trainingStartLabel }}</strong>
            <strong v-else-if="editionLoading">la fecha de inicio de la convocatoria (cargando)</strong>
            <strong v-else>la fecha de inicio indicada en la convocatoria vigente</strong>.
            La modalidad y el calendario de sesiones se publicarán conforme a la convocatoria vigente.
            <br/><br/>Los contenidos y lenguajes de programación por categoría se publicarán cuando esté disponible la información académica de esta edición.
          </p>
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
import { defineComponent, ref, watch, computed, onMounted } from "vue";
import * as API from "src/store/Api";
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
    const trainingStartLabel = ref("");
    const editionLoading = ref(false);

    const loadTrainingStart = () => {
      editionLoading.value = true;
      trainingStartLabel.value = "";
      API.Request.Get(
        null,
        API.Model("Auth").getCurrentEdition,
        {},
        (edition) => {
          const date = edition && new Date(edition.training_starts_at);
          if (date && !Number.isNaN(date.getTime())) {
            trainingStartLabel.value = new Intl.DateTimeFormat("es-MX", {
              dateStyle: "long",
              timeZone: edition.timezone || "America/Mexico_City",
            }).format(date);
          }
          editionLoading.value = false;
        },
        () => {
          editionLoading.value = false;
        }
      );
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        internalVisible.value = newValue;
        if (newValue) loadTrainingStart();
      }
    );

    onMounted(() => {
      if (props.modelValue) loadTrainingStart();
    });

    watch(internalVisible, (newValue) => {
      if (newValue !== props.modelValue) {
        emit("update:modelValue", newValue);
      }
    });

    return {
      images,
      internalVisible,
      isMobile,
      trainingStartLabel,
      editionLoading,
    };
  },
});
</script>
