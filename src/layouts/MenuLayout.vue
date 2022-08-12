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
      <router-view />
    </q-page-container>

    <q-footer class="footer">
      <q-toolbar class="justify-center">
        <div v-for="(item, i) in itemsFooter" :key="i" class="q-px-sm col horizontal-center">
          <q-btn class="ic-footer" flat stack>
            <q-icon size="1.5rem">
              <q-img :src="item.activeImage" />
            </q-icon>
            {{ item.title }}
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import 'src/css/menu.sass'

export default defineComponent({
  name: 'MenuLayout',
  setup () {
    return {
      itemsFooter: [
        { title: 'Profile', activeImage: require('assets/icons/out_profile.svg'), regularImage: '', to: '' },
        { title: 'Ranking', activeImage: require('assets/icons/out_ranking.svg'), regularImage: '', to: '' },
        { title: 'Calendar', activeImage: require('assets/icons/out_calendar.svg'), regularImage: '', to: '' }
      ]
    }
  }
})
</script>
