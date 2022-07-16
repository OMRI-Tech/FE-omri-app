<template>
  <div class="items-center text-center ">
    <h4>Introducción a Karel Secundaria</h4>
    <div class="text-justify">
      <p>{{parrafos.parrafo1}}</p>
      <p>{{parrafos.parrafo2}}</p>
      <img :src="images.img1" class="img-content">
      <p>{{parrafos.parrafo3}}</p>
      <img :src="images.img2" class="img-content">
      <p>{{parrafos.parrafo4}}</p>
      <img :src="images.img3" class="img-content img-content2">
      <p>{{parrafos.parrafo5}}</p>
    </div>
  </div>
</template>

<script>
import textos from 'src/pages/Lessons/Karel/Seccion 2/Leccion 7/textLeccion7'
import { defineComponent } from "vue"
export default defineComponent({
  name: 'ks27',
  setup () {
    const images = {
        img1: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image001.jpg'),
        img2: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image002.jpg'),
        img3: require('src/pages/Lessons/Karel/Seccion 2/Leccion 7/Images/image003.jpg'),
    }
    const parrafos = textos()
    return { images, parrafos }
  }
})
</script>

<style scoped>
.img-content {
  max-height: 200px;
}
.img-content2 {
  min-width: 200px;
}
</style>