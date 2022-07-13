<template>
  <q-page>
    <!-- Div with cards background -->
    <div class="question-bg column justify-center">
      <div class="question">
      </div>
    </div>

    <!-- Asnwers -->
    <div class="answers">
      <q-btn
        v-for="(btn, index) in buttons"
        :key="`btn-option-${(index+1)}`"
        size="lg"
        :class="`full-width answ option-${(index+1)}${buttons[index] ? '-selected' : ''}`"
        label="Lorem ipsum dolor"
        @click="selected(index)"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Quiz",
  data () {
    return {
      buttons: [false, false, false, false]
    }
  },
  methods: {
    /**
     * Change value in buttons array to change the class
     * If you use more than four buttons, add new classes in quiz.sass file
     */
    selected (option) {
      this.buttons[option] = !this.buttons[option]
    }
  }
});
</script>
