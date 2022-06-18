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
        <div class="q-px-sm">
          <q-btn class="ic-footer" flat stack>
            <q-icon size="1.5rem">
              <q-img src="~assets/icons/out_profile.svg" />
            </q-icon>
            Profile
          </q-btn>
        </div>
        <div class="q-px-sm">
          <q-btn class="ic-footer" flat stack>
            <q-icon size="1.5rem">
              <q-img src="~assets/icons/out_ranking.svg" />
            </q-icon>
            Ranking
          </q-btn>
        </div>
        <div class="q-px-sm">
          <q-btn class="ic-footer" flat stack>
            <q-icon size="1.5rem">
              <q-img src="~assets/icons/out_calendar.svg" />
            </q-icon>
            Calendar
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import "src/css/menu.sass"

export default defineComponent({
  name: "MenuLayout",
});
</script>
