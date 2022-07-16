<template>
  <div class="items-center text-center q-my-sm">
    <h4 class="q-my-md">Karel Bug</h4>
    <img :src="images.img1" class="img-content2">
    <div class="text-justify">
      <p>{{parrafos.parrafo1}}</p>
      <img :src="images.img2" class="img-content">
      <p>{{parrafos.parrafo2}}</p>
      <a :href="parrafos.parrafo3">{{parrafos.parrafo3}}</a>
      <br>
      <p>{{parrafos.parrafo4}}</p>
      <img :src="images.img3" class="img-content">
      <p>{{parrafos.parrafo5}}</p>
      <img :src="images.img4" class="img-content3">
      <p>{{parrafos.parrafo6}}</p>
      <img :src="images.img5" class="img-content">
      <p>{{parrafos.parrafo7}}</p>
      <img :src="images.img6" class="img-content">
    </div>
    <h4 class="q-my-md">Sintaxis ¿Qué es?</h4>
    <img :src="images.img7" class="img-content3">
    <img :src="images.img8" class="img-content3">
    <div class="row">
      <img :src="images.img9" class="img-content2 col">
      <img :src="images.img9_2" class="img-content col">
    </div>
    <img :src="images.img10" class="img-content">
    <img :src="images.img11" class="img-content3">
    <img :src="images.img12" class="img-content3">
    <img :src="images.img13" class="img-content">
    <img :src="images.img14" class="img-content3">
    <img :src="images.img15" class="img-content3">
    <img :src="images.img15_2" class="img-content3">
    <img :src="images.img16" class="img-content3">
    <img :src="images.img16_2" class="img-content3">
    <img :src="images.img17" class="img-content2">
    <img :src="images.img18" class="img-content2">
  </div>
</template>

<script>
import { defineComponent } from "vue"
import textos from 'src/pages/Lessons/Karel/Seccion 3/Leccion 1/textLeccion1'
export default defineComponent({
  name: 'ks31',
  setup () {
    const images = {
        img1: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image001.png'),
        img2: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image002.png'),
        img3: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image003.png'),
        img4: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image004.png'),
        img5: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image005.png'),
        img6: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image006.png'),
        img7: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image007.png'),
        img8: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image008.png'),
        img9: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image009.png'),
        img9_2: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image009_2.png'),
        img10: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image010.png'),
        img11: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image011.png'),
        img12: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image012.png'),
        img13: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image013.png'),
        img14: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image014.png'),
        img15: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image015.png'),
        img15_2: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image015_2.png'),
        img16: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image016.png'),
        img16_2: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image016_2.png'),
        img17: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image017.png'),
        img18: require('src/pages/Lessons/Karel/Seccion 3/Leccion 1/Images/image018.png'),
    }
    const parrafos = textos()
    return { images, parrafos }
  }
})
</script>

<style scoped>
.img-content{
  height: 200px;
}
.img-content2 {
  height: 120px;
}
.img-content3 {
  height: 250px;
}
</style>