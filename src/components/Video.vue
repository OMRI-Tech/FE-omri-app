<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Maximized" color="primary" @click="dialog = true" />

    <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximize</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6"> no? como lo hice en...supone que aqui puedo mandar un prop, {{$props.video}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-video
            :ratio="16/9"
            ref="player"
            v-bind:src='iframe'
            frameborder="0"
            id="videito"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Video',
  props: {
    video: {
      type: String,
      required: true
    }
  },
  setup (props) {
    console.log('aqui esta el video ------------------------------------')
    console.log(props.video)
    const iframe = ref(props.video)
    return {
      dialog: ref(false),
      maximizedToggle: ref(true),
      iframe
    }
  }
}
</script>
