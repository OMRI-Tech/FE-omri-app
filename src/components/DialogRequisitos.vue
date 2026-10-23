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
        <div class="text-h6">Requisitos y Condiciones</div>
      </q-card-section>

      <q-separator />

      <q-card-section >
        <div>
          <p class="text-justify">
            Para participar en el curso y en la OMRI, es necesario cumplir con los siguientes requisitos y condiciones:
          </p>
          <ul>
            <li>Completar el pago de inscripción de $350 pesos mexicanos (único pago)</li>
            <li>Tener menos de 18 años.</li>
            <li>Nacionalidad mexicana o radicar en México, dispuesto a representar a México internacionalmente.</li>
            <li>Inscrito en una institución de nivel básico o medio superior en México.</li>
            <li>Cursar como máximo el cuarto semestre de nivel medio superior; consulta la convocatoria vigente para conocer el periodo de referencia.</li>
            <li><a href="https://registro.omri.org.mx/" target="_blank">Registrarse en la página oficial</a></li>
            <li>Presentar exámenes estatales en línea siguiendo instrucciones de entrenadores.</li>
            <li>Responsabilidad para trabajar en línea.</li>
            <li>Gusto por resolver problemas y enfrentar retos.</li>
            <li><a href="https://www.omri.org.mx/reglamento" target="_blank">Leer y cumplir con el reglamento oficial</a></li>
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
