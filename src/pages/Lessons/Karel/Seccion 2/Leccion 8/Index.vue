<template>
  <div class="items-center">
    <div class="text-justify">
      <p>{{parrafos.parrafo1}}</p>
      <img :src="images.img1" class="img-content">
      <p>{{parrafos.parrafo2}}</p>
      <img :src="images.img2" class="img-content">
      <p>{{parrafos.parrafo3}}</p>
      <img :src="images.img3" class="img-content">
      <p>{{parrafos.parrafo4}}</p>
      <img :src="images.img4" class="img-content">
      <p>{{parrafos.parrafo5}}</p>
      <img :src="images.img5" class="img-content">
      <p>{{parrafos.parrafo6}}</p>
      <div class="row">
        <img :src="images.img6" class="img-content col-md-auto">
        <img :src="images.img7" class="img-content col-md-auto">
        <img :src="images.img8" class="img-content col-md-auto">
      </div>
      <p>{{parrafos.parrafo7}}</p>
      <img :src="images.img9" class="img-content">
      <p>{{parrafos.parrafo8}}</p>
      <img :src="images.img10" class="img-content">
      <p>{{parrafos.parrafo9}}</p>
      <img :src="images.img11" class="img-content">
      <p>{{parrafos.parrafo10}}</p>
      <div class="row">
        <img :src="images.img12" class="img-content col-md-auto q-mx-md">
        <img :src="images.img13" class="img-content col-md-auto">
      </div>
      <p>{{parrafos.parrafo11}}</p>
      <h6 class="q-my-md">Karel Bug</h6>
      <img :src="images.img14" class="img-content2">
      <img :src="images.img15" class="img-content">
      <p>{{parrafos.parrafo12}}</p>
      <img :src="images.img16" class="img-content">
      <h6 class="q-my-md">Karel.js</h6>
      <img :src="images.img17" class="img-content">
      <h6 class="q-my-md">Karel.exe</h6>
      <img :src="images.img18" class="img-content">
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import textos from 'src/pages/Lessons/Karel/Seccion 2/Leccion 8/textLeccion8'
export default defineComponent({
  name: 'ks28',
  setup () {
    const images = {
        img1: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image001.png'),
        img2: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image002.png'),
        img3: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image003.png'),
        img4: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image004.png'),
        img5: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image005.png'),
        img6: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image006.jpg'),
        img7: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image007.png'),
        img8: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image008.jpg'),
        img9: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image009.png'),
        img10: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image010.png'),
        img11: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image011.png'),
        img12: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image012.png'),
        img13: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image013.png'),
        img14: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image014.jpg'),
        img15: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image015.png'),
        img16: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image016.png'),
        img17: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image017.png'),
        img18: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image018.jpg'),
    }
    const parrafos = textos()
    return { images, parrafos }
  }
})
</script>
<style scoped>
.img-content{
  height: 170px;
}
.img-content2{
  height: 100px;
}
</style>