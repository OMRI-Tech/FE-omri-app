<template>
  <q-layout class="bg-general">
    <q-header class="header-style">
      <div class="q-py-xs">
        <span v-text="titleOfLesson"/>
      </div>
    </q-header>
    <q-page-container class="bg-squares">
      <q-img class="entrenator-top" width="12vh" :src="images.entrenator" />
      <router-view @changeTitleOfLesson="changeTitleOfLesson" ref="Lesson" />
    </q-page-container>
    <q-footer class="bg-transparent q-pb-md horizontal-center">
      <div class="horizontal-center" style="width: 90%">
        <q-btn @click="finishLesson" no-caps class="full-width finish-btn" label="Finish" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'LessonLayout',
  setup () {
    const images = {
      entrenator: require('assets/img/entrenator.png')
    }
    return {
      images
    }
  },
  data: () => ({
    titleOfLesson: 'Lessons'
  }),
  methods: {
    changeTitleOfLesson (title) {
      this.titleOfLesson = title
      console.log(title)
    },

    finishLesson () {
      console.log('quieren acabar la lección')
      // this.$refs['Lesson'].finish()
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
  transform: rotate(-90deg)
.finish-btn
  font-style: normal
  font-weight: 700
  font-size: 15px
  line-height: 22px
  text-align: center
  background: #008FD1
  box-shadow: 4px 4px 12px #CCCCCC
  border-radius: 11px

</style>
