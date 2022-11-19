<template>
  <div class="first-content">
    <p>Lee atentamente las reglas de la OMRI</p>
    <ul>
      <li v-for="(item,id) in lista" :key="id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount } from "vue"
import textos from 'src/pages/Lessons/C/Seccion 1/Leccion 1/textLesson'
export default defineComponent({
  name: 'cs11',
  setup (props,{emit}) {
    onBeforeMount(() => {
      emit('setTitle','Reglamento OMRI')
    })
    const lista = textos()
    return {lista}
  }
})
</script>
