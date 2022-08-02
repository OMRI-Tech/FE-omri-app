<template>
  <div class="items-center text-center">
    <div>
      <p class="text-justify first-text">{{parrafos.parrafo1}}</p>
      <img :src="images.img1" class="img-content">
      <p class="text-justify">{{parrafos.parrafo2}}</p>
      <img :src="images.img2" class="img-content">
      <p class="text-justify">{{parrafos.parrafo3}}</p>
      <img :src="images.img3" class="full-width">
      <p class="text-justify">{{parrafos.parrafo4}}</p>
      <img :src="images.img4" class="full-width">
      <p class="text-justify">{{parrafos.parrafo5}}</p>
      <img :src="images.img5" class="full-width">
      <p class="text-justify">{{parrafos.parrafo6}}</p>
      <q-carousel
        animated
        v-model="slide_1"
        arrows
        infinite
        control-type="push"
        class="carousel-content"
        control-color="primary"
      >
        <q-carousel-slide :name="1" :img-src="images.img6">
        </q-carousel-slide>
        <q-carousel-slide :name="2" :img-src="images.img7" />
        <q-carousel-slide :name="3" :img-src="images.img8" />
      </q-carousel>
      <q-btn-toggle flat v-model="slide_1" :options="slide_options_1">
      </q-btn-toggle>
      <p class="text-justify">{{parrafos.parrafo7}}</p>
      <img :src="images.img9" class="img-content">
      <p class="text-justify">{{parrafos.parrafo8}}</p>
      <img :src="images.img10" class="img-content">
      <p class="text-justify">{{parrafos.parrafo9}}</p>
      <img :src="images.img11" class="img-content">
      <p class="text-justify">{{parrafos.parrafo10}}</p>
      <div class="row full-width bg-white">
        <img :src="images.img12" class="img-content col q-mx-md">
        <img :src="images.img13" class="img-content col">
      </div>
      <p class="text-justify">{{parrafos.parrafo11}}</p>
      <q-carousel
        animated
        v-model="slide_2"
        arrows
        infinite
        control-type="push"
        class="carousel-content"
        control-color="primary"
        v-model:fullscreen="fullscreen"
      >
        <q-carousel-slide :name="'Karel Bug'" :img-src="fullscreen ? images.img15_rot : images.img15">
        </q-carousel-slide>
        <q-carousel-slide :name="'Karel.js'" :img-src="fullscreen ? images.img17_rot : images.img17 ">
        </q-carousel-slide>
        <q-carousel-slide :name="'Karel.exe'" :img-src="fullscreen ? images.img18_rot : images.img18" >
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
      <q-btn-toggle flat v-model="slide_2" :options="slide_options_2">
      </q-btn-toggle>
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from "vue"
import textos from 'src/pages/Lessons/Karel/Seccion 2/Leccion 8/textLeccion8'
import { useQuasar } from "quasar"
export default defineComponent({
  name: 'ks28',
  setup (props,{emit}) {
    const $q = useQuasar()
    onBeforeMount(() => {
      emit('title', 'Introducción a Karel')
    })
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
        img15_rot: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image015_rot.png'),
        img16: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image016.png'),
        img17: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image017.png'),
        img17_rot: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image017_rot.png'),
        img18: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image018.jpg'),
        img18_rot: require('src/pages/Lessons/Karel/Seccion 2/Leccion 8/Images/image018_rot.jpg')
    }
    const parrafos = textos()
    const slide_1 = ref(1)
    const slide_2 = ref('Karel Bug')
    const slide_options_2 = [
      {label: 'Karel Bug', value: 'Karel Bug'},
      {label: 'Karel.js', value: 'Karel.js'},
      {label: 'Karel.exe',value: 'Karel.exe'}
    ]
    const slide_options_1 = [
      {label: 'Aplicacion',value: 1},
      {label: 'Web', value: 2},
      {label: 'Móviles', value: 3}
    ]
    const fullscreen = ref(false)
    return { images, parrafos, fullscreen, slide_1, slide_2, slide_options_2, slide_options_1 }
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
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
.first-text {
  padding-right: 27%;
}
</style>