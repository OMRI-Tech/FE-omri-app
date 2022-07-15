<template>
  <div>
    <h4>Esta es la sección 2</h4>
    <h5>lección 3</h5>
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: 'cs23',
  setup () {
    const images = {
        CPP_POO: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/C ++ POO.png'),
        LenguajeCPP: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C ++.png'),
        LenguajeCUsos: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C usos.gif'),
        LenguajeC: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C.jpg')
    }
  }
})
</script>