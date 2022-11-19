<template>
  <div class="items-center div-padding">
    <q-carousel
      animated
      v-model="slide"
      arrows
      class="carousel-content full-height"
      control-color="primary"
      v-model:fullscreen="fullscreen"
      >
      <q-carousel-slide v-for="image in images" :key="image.id" class="text-center bg-white" :name="image.id">
        <q-img :src="image.img"/>
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
import { defineComponent, onBeforeMount, ref } from "vue"
export default defineComponent({
  name: 'ks12',
  setup ( props, {emit}) {
    onBeforeMount(() => {
      emit('setTitle','Introducción a Karel')
    })
    const images = [
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/1.png'), id: 1},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/2.png'), id: 2},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/3.png'), id: 3},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/4.png'), id: 4},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/5.png'), id: 5},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/6.png'), id: 6},
        {img: require('src/pages/Lessons/Karel/Seccion 1/Leccion 2/Images/7.png'), id: 7}
    ]
    const slide = ref(1)
    const fullscreen = ref(false)
    return { images, slide, fullscreen}
  }
})
</script>
<style scoped>
.img-content {
}
</style>
