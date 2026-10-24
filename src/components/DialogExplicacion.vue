<template>
  <q-dialog v-model="internalVisible" :maximized="isMobile">
    <q-card>
      <q-bar class="bg-blue">
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Cerrar</q-tooltip>
        </q-btn>
      </q-bar>
      <picture>
        <source :srcset="images.olimpicosWebp" type="image/webp" />
        <img :src="images.olimpicosPng" alt="Selección 2022" class="full-width" />
      </picture>
      <q-card-section>
        <div class="text-h6">¿Por qué tiene costo?</div>
      </q-card-section>

      <q-separator />

      <q-card-section >
        <div>
          <p class="text-justify">
            La <strong>XIX OMRI</strong> busca preparar a los talentos de Morelos para la OMI 2026,
            la competencia de programación más importante de México.
          </p>
          <p>
            No recibimos fondos gubernamentales.
            El costo de $350 MXN cubre aspectos clave para la alta calidad del curso.
          </p>
          <ul>
            <li>Instructores calificados</li>
            <li>Plataforma y tecnología</li>
            <li>Materiales y ejercicios</li>
            <li>Operativos y publicidad</li>
          </ul>
          <p>
            Cada peso invertido tiene como meta llevar a nuestros estudiantes al siguiente nivel.
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
