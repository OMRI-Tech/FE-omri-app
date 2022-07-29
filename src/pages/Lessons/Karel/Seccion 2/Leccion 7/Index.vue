<template>
  <div class="items-center text-center ">
    <div>
      <p class="first-text text-justify">{{parrafos.parrafo1}}</p>
      <p class="text-justify">{{parrafos.parrafo2}}</p>
      <img :src="images.img1" class="img-content">
      <p class="text-justify">{{parrafos.parrafo3}}</p>
      <img :src="images.img2" class="img-content">
      <p class="text-justify">{{parrafos.parrafo4}}</p>
      <img :src="images.img3" class="img-content2 img-content">
      <p class="text-justify">{{parrafos.parrafo5}}</p>
    </div>
  </div>
</template>

<script>
import textos from 'src/pages/Lessons/Karel/Seccion 2/Leccion 7/textLeccion7'
import { defineComponent, onBeforeMount } from "vue"
export default defineComponent({
  name: 'ks27',
  setup (props,{emit}) {
    onBeforeMount(() => {
      emit('title','Introducción a Karel')
    })
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
.first-text {
  padding-right: 27%;
}
</style>