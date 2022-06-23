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

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="footer">
      <q-toolbar class="justify-center">
        <div v-for="(section, i) in sections" :key="i" class="col q-px-sm horizontal-center">
          <q-btn :to="{ name: section.to }" class="ic-footer" flat stack>
            <q-icon size="1.5rem">
              <q-img :src="isActiveSection(section) ? section.activeIcon : section.inactiveIcon" />
            </q-icon>
            {{ section.title }}
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MenuLayout',
  setup () {
    const sections = [
      { title: 'Profile', inactiveIcon: require('assets/icons/out_profile.svg'), activeIcon: require('assets/icons/out_profile.svg'), to: '' },
      { title: 'Ranking', inactiveIcon: require('assets/icons/out_ranking.svg'), activeIcon: require('assets/icons/out_ranking.svg'), to: '' },
      { title: 'Calendar', inactiveIcon: require('assets/icons/out_calendar.svg'), activeIcon: require('assets/icons/out_calendar.svg'), to: '' }
    ]
    return {
      sections
    }
  },
  methods: {
    isActiveSection (section) {
      return this.$route.name === section.to
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url('src/css/menu.sass')
</style>