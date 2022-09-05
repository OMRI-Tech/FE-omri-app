<template>
  <q-layout>
    <q-header class="header">
      <q-toolbar class="justify-center">
        <div class="q-px-md ic-trophy">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/trophy.svg" />
          </q-icon>
          22
        </div>
        <div class="q-px-md ic-triangle">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/triangle.svg" />
          </q-icon>
          13
        </div>
        <div class="q-px-md ic-heart">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/heart.svg" />
          </q-icon>
          5
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="contenedor-movil">
      <router-view @activeTitle="activeTitle" />
    </q-page-container>

    <q-footer class="footer">
      <q-toolbar class="justify-center">
        <div v-for="(item, i) in itemsFooter" :key="i" class="q-px-sm col horizontal-center">
          <q-btn :class="item.title === actualTitle ? 'ic-footer active' : 'ic-footer'" @click="item.to" flat stack>
            <q-icon size="1.5rem" v-if="item.activeImage !== null">
              <q-img :src="item.activeImage" />
            </q-icon>
            <q-icon size="1.5rem" v-else :name="item.icon"/>
            {{ item.title }}
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import 'src/css/menu.sass'

export default defineComponent({
  name: 'MenuLayout',
  setup () {
    const actualTitle = ref()
    const activeTitle = (title) => {
      actualTitle.value = title
    }
    return {
      activeTitle,
      actualTitle,
      itemsFooter: [
        { title: 'Profile', activeImage: require('assets/icons/out_profile.svg'), regularImage: '', to: null },
        { title: 'Ranking', activeImage: require('assets/icons/out_ranking.svg'), regularImage: '', to: null },
        { title: 'Calendar', activeImage: require('assets/icons/out_calendar.svg'), regularImage: '', to: null },
        { title: 'Salir', activeImage: null, icon: "logout", regularImage: '', to: null }
      ]
    }
  }
})
</script>
