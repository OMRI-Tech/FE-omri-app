<template>
  <q-page>
    <div class="main-rectangle row">
      <div class="info-rectangle col">
        <p class="txt-title">Bienvenido olímpico</p>
        <p class="txt-progress">Progreso</p>
        <q-linear-progress rounded :value="0.3" size="8px" class="q-my-sm" />
        <p class="txt-level">Intermedio</p>
      </div>
      <div class="info-image column inline justify-end">
        <q-img class="q-mx-auto squares" :src="images.squares" spinner-color="white" />
        <q-img class="q-mx-auto entrenator" :src="images.entrenator" spinner-color="white" />
      </div>
    </div>
    <div class="relative-position">
        <div class="example-area q-pa-lg scroll">
        <div class="example-filler" />

        <q-list>
            <q-item
            v-for="n in 30"
            :key="n"
            :data-id="n"
            class="q-my-md q-pa-sm bg-grey-3"
            v-intersection="onIntersection"
            >
            <q-item-section class="text-center" style="background: #eee">
                Item #{{ n }}
            </q-item-section>
            </q-item>
        </q-list>

        <div class="example-filler" />
        </div>

        <div class="example-state bg-primary text-white overflow-hidden rounded-borders text-center absolute-top-left q-ma-md q-pa-sm">
        <transition-group v-if="inView.length > 0" name="in-view" tag="ul">
            <li v-for="i in inView" :key="i" class="in-view-item">
            {{i}}
            </li>
        </transition-group>
        </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainMenu',
  setup () {
    const images = {
      squares: require('assets/img/squares.png'),
      entrenator: require('assets/img/entrenator.png')
    }
    const inView = ref([])

    function onIntersection (entry) {
      if (entry.isIntersecting === true) {
        add(entry.target.dataset.id)
      }
      else {
        remove(entry.target.dataset.id)
      }
    }

    function add (i) {
      remove(i)
      inView.value.push(i)
      inView.value.sort(sortAtoi)
    }

    function remove (i) {
      let index
      while ((index = inView.value.indexOf(i)) > -1) {
        inView.value.splice(index, 1)
        inView.value.sort(sortAtoi)
      }
    }

    function sortAtoi (a, b) {
      return Number(a) - Number(b)
    }
    return {
      images,
      inView,
      onIntersection
    }
  }
})
</script>
<style lang="sass" scoped>
.example-state
  width: 50px
  height: 226px
  opacity: 0.85

  ul
    list-style: none
    margin: 0
    padding: 0

  li
    padding: 0.5em

.example-area
  height: 300px

.example-filler
  height: 350px

.in-view-item
  transition: all 0.3s
  display: block

.in-view-enter, .in-view-leave-to
  opacity: 0
  transform: translateX(-30px)

.in-view-leave-active
  position: absolute
</style>