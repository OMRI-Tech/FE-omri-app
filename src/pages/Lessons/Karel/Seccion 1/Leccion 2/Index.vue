<template>
  <div class="first-content">
    <li v-for="(item,id) in lista" :key="id">
      {{ item }}
    </li>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from "vue"
import textos from 'src/pages/Lessons/Karel/Seccion 1/Leccion 2/textLeccion2'
export default defineComponent({
  name: 'ks12',
  setup (props,{emit}) {
    onBeforeMount(() => {
      emit('title','Reglamento OMRI')
    })
    const lista = textos()
    return {lista}
  }
})
</script>
<style scoped>
.first-content {
  padding-top: 20%;
}
</style>