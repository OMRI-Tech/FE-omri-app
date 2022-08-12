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
    <div class="main-container">
      <div class="entrenator-background vector">
        <div class="info">
          <p>Nivel actual</p>
          <p>NIVEL 6</p>
        </div>
      </div>
      <div class="vector-3 vector" :style="desplazamiento(3)"></div>
      <div class="vector-2 vector" :style="desplazamiento(2)"></div>
      <div class="vector-1 vector" :style="desplazamiento(1)"></div>
      <div class="vector-0 vector" :style="desplazamiento(0)"></div>
      <div class="path vector">
      </div>
      <div class="contenedor-figura vector">
        <div class="figura triangle done">1</div>
        <div class="figura circle done">2</div>
        <div class="figura hexa visited">3</div>
        <div class="figura hexa">4</div>
        <div class="figura star">5</div>
        <div class="figura star">6</div>
        <div class="figura hexa">7</div>
        <div class="figura triangle">8</div>
        <div class="figura circle">9</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'MainMenu',
  setup () {
    const images = {
      squares: require('assets/img/squares.png'),
      entrenator: require('assets/img/entrenator.png')
    }
    const direccion = ref([{
        min: -100, max: 50, actual: -15, dir: 'izq'
      }, {
        min: -400, max: -50, actual: -225, dir: 'der'
      }, {
        min: -500, max: -200, actual: -350, dir: 'izq'
      }, {
        min: -400, max: -100, actual: -250, dir: 'der'
      }
    ])
    const desplazamiento = ((i) => {
      return {
        'background-position-x': direccion.value[i].actual + "px"
      }
    });
    const animameEsta = () => {
      for (let i=0; i<4; i++) {
        if(direccion.value[i].dir == 'izq'){
          direccion.value[i].actual -= 40
          if(direccion.value[i].actual <= direccion.value[i].min){
            direccion.value[i].dir = 'der'
            direccion.value[i].actual = direccion.value[i].min
          }
        } else {
          direccion.value[i].actual += 40
          if(direccion.value[i].actual >= direccion.value[i].max){
            direccion.value[i].dir = 'izq'
            direccion.value[i].actual = direccion.value[i].max
          }
        }
      }
    }
    onMounted(()=>{
      setInterval(animameEsta, 6500)
    })
    return {
      direccion,
      images,
      desplazamiento
    }
  }
})
</script>
