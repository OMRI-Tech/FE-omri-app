<template>
  <div>
    <div class="items-center text-center ">
      <div>
        <p class="first-text text-justify">{{parrafos.parrafo1}}</p>
        <img :src="images.LenguajeCUsos" class="content-images">
        <br>
        <p class="text-justify">{{parrafos.parrafo2}}</p>
        <img :src="images.LenguajeC" class="content-images">
        <br>
        <p class="text-justify">{{parrafos.parrafo3}}</p>
        <img :src="images.LenguajeCPP" class="content-images">
        <br>
        <p class="text-justify">{{parrafos.parrafo4}}</p>
        <p class="text-justify">{{parrafos.parrafo5}}</p>
        <p class="text-justify">{{parrafos.parrafo6}}</p>
        <img :src="images.CPP_POO" class=" full-width">
        <p class="text-justify">{{parrafos.parrafo7}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from "vue"
import textos from 'src/pages/Lessons/C/Seccion 2/Leccion 3/textLeccion3'
export default defineComponent({
  name: 'cs23',
  setup (props,{emit}) {
    onBeforeMount(() => {
      emit('title','¿Qué es el lenguaje C y C++?')
    })
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
.first-text {
  padding-right: 27%;
}
</style>