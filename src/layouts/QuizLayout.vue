<template>
  <q-layout>
    <q-header class="header">
      <q-toolbar class="justify-center">
        Multiple Questions
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import "src/css/quiz.sass"

export default defineComponent({
  name: "QuizLayout",
});
</script>
