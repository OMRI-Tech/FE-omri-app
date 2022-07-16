<template>
  <div>
    <h4>Esta es la sección 2</h4>
    <h5>lección 7</h5>
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: 'ks27',
  setup () {
    const images = {
        img1: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image001.jpg'),
        img2: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image002.jpg'),
        img3: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image003.jpg'),
    }
  }
})
</script>