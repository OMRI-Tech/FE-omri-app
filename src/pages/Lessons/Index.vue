<template lang="pug">
q-page.flex.flex-center
  Lesson
</template>

<script>
import { computed, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PageLesson',
  components: { Lesson: () => useStore().getters['lessons/lessonByRoute'](useRoute().params).component.render() },
  setup (props, { emit }) {
    const title = computed(() => useStore().getters['lessons/lessonByRoute'](useRoute().params).title)
    // Very rarely enter this watch, but it is better to have it Xd
    watch(() => title, newTitle => emit('changeTitleOfLesson', title)) // 
    emit('changeTitleOfLesson', title)
  }
})
</script>
