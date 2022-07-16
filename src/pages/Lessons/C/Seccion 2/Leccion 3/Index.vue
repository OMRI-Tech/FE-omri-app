<template>
  <div>
    <div class="items-center text-center ">
      <br>
      <h4>¿Qué es el lenguaje C y C ++?</h4>
      <h5 class="q-ma-md">OMRI - Olimpiada Morelense de Informática</h5>
      <h6 class="q-mb-sm">Josué Romero Rodríguez</h6>
      <p>07 de Julio del 2022</p>
      <br>
      <div class="text-justify">
        <p>{{parrafos.parrafo1}}</p>
        <img :src="images.LenguajeCUsos" class="content-images">
        <br>
        <p>{{parrafos.parrafo2}}</p>
        <img :src="images.LenguajeC" class="content-images">
        <br>
        <p>{{parrafos.parrafo3}}</p>
        <img :src="images.LenguajeCPP" class="content-images">
        <br>
        <p>{{parrafos.parrafo4}}</p>
        <p>{{parrafos.parrafo5}}</p>
        <p>{{parrafos.parrafo6}}</p>
        <img :src="images.CPP_POO" class="content-images">
        <p>{{parrafos.parrafo7}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import textos from 'src/pages/Lessons/C/Seccion 2/Leccion 3/textLeccion3'
export default defineComponent({
  name: 'cs23',
  setup () {
    const images = {
        CPP_POO: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/C ++ POO.png'),
        LenguajeCPP: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C ++.png'),
        LenguajeCUsos: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C usos.gif'),
        LenguajeC: require('src/pages/Lessons/C/Seccion 2/Leccion 3/Images/Lenguaje C.jpg')
    }
    const parrafos = textos()
    return {images, parrafos}
  }
})
</script>
<style scoped>
.content-images {
  max-height: 150px;
}
</style>