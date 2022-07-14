<template>
  <div class="q-pa-md">
    <component :is="currentComponent" />
  </div>
</template>

<script>
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import ks11 from 'pages/Lessons/Karel/Seccion 1/Leccion 1/Index.vue'
import ks12 from 'pages/Lessons/Karel/Seccion 1/Leccion 2/index.vue'
import cs23 from 'pages/Lessons/C/Seccion 2/Leccion 3/Index.vue'
/**
 * TODO: Añade aquí las lecciones en formato "Lenguaje", "Seccion #", "Leccion #"
 * Respeta el prefijo "ks" para lecciones de karel y "cs" para lecciones de c
 * El primer número representa el número de seccion, el segundo el número de lección
 */

export default defineComponent({
  name: 'Lesson',
  components: {
    ks11,
    ks12
    /**
     * TODO: Añade aqui el componente
     * Prueba visitando /lessons/LANG/X/Y donde "LANG" es karel o c, X es el número de seccion y Y el número de lección
     * BUG: Si el contenido parece no actualizarse, cierra y abre el quasar dev
     */
  },
  setup (props, { emit }) {
    const title = "hol"; // computed(() => useStore().getters['lessons/lessonByRoute'](useRoute().params).title)
    // Very rarely enter this watch, but it is better to have it Xd
    //watch(() => title, newTitle => emit('changeTitleOfLesson', title)) // 
    //emit('changeTitleOfLesson', title)

    const currentComponent = ref("")
    const route = useRoute()
    onBeforeMount(() => {
      let str = ''
      if (route.params.topic === 'karel') {
        str = 'ks'
        str += route.params.section
        str += route.params.lesson
      } else {
        if (route.params.topic === 'c') {
          str = 'cs'
          str += route.params.section
          str += route.params.lesson
        }
      }
      currentComponent.value = str
    });

    return {
      title, currentComponent
    }
  }
})
</script>
