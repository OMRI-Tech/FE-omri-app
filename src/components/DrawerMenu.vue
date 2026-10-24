<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    elevated
    :width="250"
    :breakpoint="5000"
    bordered
  >
    <q-list>

      <q-item clickable @click="muestradialogRequisitos" v-ripple>
        <q-item-section avatar>
          <q-icon name="assignment" />
        </q-item-section>
        <q-item-section>Requisitos y condiciones</q-item-section>
      </q-item>
      <q-item clickable @click="muestradialog" v-ripple>
        <q-item-section avatar>
          <q-icon name="redeem" />
        </q-item-section>
        <q-item-section>¿Por qué tiene costo?</q-item-section>
      </q-item>
      <q-item clickable @click="muestradialogCurso" v-ripple>
        <q-item-section avatar>
          <q-icon name="library_books" />
        </q-item-section>
        <q-item-section>Sobre el curso</q-item-section>
      </q-item>
      <q-separator />
      <q-item
        clickable
        v-ripple
        href="https://www.facebook.com/omrioficial"
        target="_blank"
      >
        <q-item-section avatar>
          <q-icon name="facebook" color="blue" />
        </q-item-section>
        <q-item-section>Facebook</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        href="https://instagram.com/omrioficial"
        target="_blank"
      >
        <q-item-section avatar>
          <q-icon name="instagram" color="pink" />
        </q-item-section>
        <q-item-section>Instagram</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        href="https://www.tiktok.com/@omrioficial"
        target="_blank"
      >
        <q-item-section avatar>
          <q-icon name="tiktok" color="black" />
        </q-item-section>
        <q-item-section>Tiktok</q-item-section>
      </q-item>
    </q-list>
    <dialog-explicacion
      :model-value="dialogExplicacion"
      @update:modelValue="dialogExplicacion = $event"
    />
    <dialog-curso
      :model-value="dialogCurso"
      @update:modelValue="dialogCurso = $event"
    />
    <dialog-requisitos
      :model-value="dialogRequisitos"
      @update:modelValue="dialogRequisitos = $event"
    />
  </q-drawer>
</template>
<script>
import { defineComponent, ref } from "vue";
import DialogExplicacion from "components/DialogExplicacion.vue";
import DialogCurso from "components/DialogCurso.vue";
import DialogRequisitos from "components/DialogRequisitos.vue";

export default defineComponent({
  components: {
    DialogExplicacion,
    DialogCurso,
    DialogRequisitos
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const dialogExplicacion = ref(false);
    const dialogCurso = ref(false);
    const dialogRequisitos = ref(false);
    const muestradialog = () => {
      dialogExplicacion.value = true;
    };
    const muestradialogCurso = () => {
      dialogCurso.value = true;
    };
    const muestradialogRequisitos = () => {
      dialogRequisitos.value = true;
    };
    return {
      leftDrawerOpen,
      dialogExplicacion,
      dialogCurso,
      dialogRequisitos,
      muestradialog,
      muestradialogCurso,
      muestradialogRequisitos,
    };
  },
});
</script>
