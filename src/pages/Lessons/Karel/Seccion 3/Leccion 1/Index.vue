<template>
  <div class="items-center text-center first-content">
    <img :src="images.img1" class="img-content2">
    <div>
      <p class="text-justify">{{parrafos.parrafo1}}</p>
      <img :src="images.img2" class="img-content">
      <p class="text-justify">{{parrafos.parrafo2}}</p>
      <a class="text-justify" :href="parrafos.parrafo3">{{parrafos.parrafo3}}</a>
      <br>
      <p class="text-justify">{{parrafos.parrafo4}}</p>
      <img :src="images.img3" class="full-width">
      <p class="text-justify">{{parrafos.parrafo5}}</p>
      <img :src="images.img4" class="full-width">
      <p class="text-justify">{{parrafos.parrafo6}}</p>
      <img :src="images.img5" class="full-width">
      <p class="text-justify">{{parrafos.parrafo7}}</p>
      <img :src="images.img6" class="full-width">
    </div>
    <h4 class="q-my-md">Sintaxis ¿Qué es?</h4>
    <q-carousel 
      animated 
      v-model="slide"
      arrows
      class="carousel-content"
      control-color="primary"
      v-model:fullscreen="fullscreen"
      >
      <q-carousel-slide :name="1" >
        <q-img :src="images.img7"/>
      </q-carousel-slide>
      <q-carousel-slide :name="2" >
        <q-img :src="images.img8"/>
      </q-carousel-slide>
      <q-carousel-slide :name="3" >
        <div>
          <q-img :src="images.img9"/>
          <q-img :src="images.img9_2" />
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="4" >
        <q-img :src="images.img11"/>
      </q-carousel-slide>
      <q-carousel-slide :name="5" >
        <q-img :src="images.img12"/>
      </q-carousel-slide>
      <q-carousel-slide :name="6" >
        <q-img :src="images.img13"/>
      </q-carousel-slide>
      <q-carousel-slide :name="7" >
        <q-img :src="images.img14"/>
      </q-carousel-slide>
      <q-carousel-slide :name="8" >
        <q-img :src="images.img15"/>
        <q-img :src="images.img15_2"/>
      </q-carousel-slide>
      <q-carousel-slide :name="9" >
        <q-img :src="images.img16"/>
        <q-img :src="images.img16_2"/>
      </q-carousel-slide>
      <q-carousel-slide :name="10" >
        <q-img :src="images.img17"/>
      </q-carousel-slide>
      <q-carousel-slide :name="11" >
        <q-img :src="images.img18"/>
      </q-carousel-slide>
        <template v-slot:control>
          <q-carousel-control
            position="bottom-right"
            :offset="[18, 18]"
          >
            <q-btn
              push round dense color="primary" text-color="white"
              :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="fullscreen = !fullscreen"
            />
          </q-carousel-control>
        </template>
    </q-carousel>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue"
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
    const slide = ref(1)
    const fullscreen = ref(false)
    return { images, parrafos, slide, fullscreen }
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
.first-content {
  padding-top: 20%;
}
</style>