<template>
  <div class="items-center">
    <div v-for="(image,index) in images" :key="index" class="text-center">
      <img :src="image" class="img-content">
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  name: 'ks26',
  setup () {
    const images = {
        img1: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image001.png'),
        img2: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image002.png'),
        img3: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image003.png'),
        img4: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image004.png'),
        img5: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image005.png'),
        img6: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image006.png'),
        img7: require('src/pages/Lessons/Karel/Seccion 2/Leccion 6/Images/image007.png')
    }
    return { images } 
  }
})
</script>
<style scoped>
.img-content { 
  max-height: 250px;
  max-width: 320px;
}
</style>