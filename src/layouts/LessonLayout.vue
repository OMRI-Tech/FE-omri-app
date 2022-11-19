<template>
  <q-layout class="bg-general">
    <q-header class="header-style">
      <div class="q-py-xs">
        <span v-text="titleOfLesson"/>
      </div>
    </q-header>
    <q-page-container class="bg-squares">
      <q-img class="entrenator-top" width="12vh" :src="images.entrenator" />
      <div class="lesson-text">
        <router-view @changeTitleOfLesson="changeTitleOfLesson" ref="Lesson" />
      </div>
    </q-page-container>
    <q-footer class="bg-transparent q-pb-md horizontal-center">
      <div class="horizontal-center" style="width: 90%">
        <q-btn @click="finishLesson" no-caps class="full-width finish-btn" label="Marcar como lectura finalizada" />
        <q-btn  :to="{ name: 'Home' }" no-caps class="q-mt-sm full-width finish-btn bg-red" label="Salir" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'LessonLayout',
  setup () {
    const store = useStore()
    const router = useRouter()
    const user = store.getters['auth/user']
    const images = {
      entrenator: require('assets/entrenator/leyendo.png')
    }
    const finishLesson = () => {
      console.log('quieren acabar la lección')
      store.dispatch('auth/marcaProgreso', {
        step: store.getters['auth/dameStepActual'],
        nivel_id: user.id_nivel,
        user_id: user.id
      }).then(() =>{
        router.push({ name: 'Home' })
      })
    }
    return {
      images, finishLesson
    }
  },
  data: () => ({
    titleOfLesson: 'Lessons'
  }),
  methods: {
    changeTitleOfLesson (title) {
      this.titleOfLesson = title
      console.log(title)
    }
  }
}
</script>

<style lang="sass" scoped>
body
  font-family: 'Poppins'
.bg-general
  background: linear-gradient(180.06deg, #FFF7E6 17.25%, #F0FFFC 64.55%)
  box-shadow: 0px 4px 31px rgba(227, 227, 227, 0.25)

.header-style
  background: #003F54
  font-style: normal
  font-weight: 700
  font-size: 20px
  line-height: 30px
  text-align: center
.entrenator-top
  position: absolute
  right: 0
  opacity: 0.4
.finish-btn
  font-style: normal
  font-weight: 700
  font-size: 15px
  line-height: 22px
  text-align: center
  background: #008FD1
  box-shadow: 4px 4px 12px #CCCCCC
  border-radius: 11px
.lesson-text
  padding: 10px 25px
  font-size: 22px
  z-index: 1000
</style>
