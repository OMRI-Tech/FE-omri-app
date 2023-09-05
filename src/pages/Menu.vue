<template>
  <q-page class="q-pt-md">
    <div class="main-rectangle row">
      <div class="info-rectangle col">
        <p class="txt-title">Bienvenido {{ user.name }} </p>
        <p class="txt-progress">Progreso</p>
        <q-linear-progress rounded :value="0.3" size="8px" class="q-my-sm" />
        <p class="txt-level">Categoría: {{ user.posible_paquete.paquete.nombre_paquete }}</p>
      </div>
      <div class="info-image column inline justify-end">
        <q-img class="q-mx-auto squares" :src="images.squares" spinner-color="white" />
        <q-img class="q-mx-auto entrenator" :src="images.entrenator" spinner-color="white" />
      </div>
    </div>

    <div class="main-container">
      <div class="entrenator-background vector">
        <div class="info">
          <p>{{ datosNivel.name }}</p>
          <p>NIVEL {{ datosNivel.id }}</p>
        </div>
      </div>
      <div class="vector-3 vector" :style="desplazamiento(3)"></div>
      <div class="vector-2 vector" :style="desplazamiento(2)"></div>
      <div class="vector-1 vector" :style="desplazamiento(1)"></div>
      <div class="vector-0 vector" :style="desplazamiento(0)"></div>
      <div class="path vector">
      </div>
      <div class="contenedor-figura vector">

        <div v-for="(step, i) in levels" :key="i" :class="'figura ' + step.icon + ' ' + step.status">
          <div v-if="step.url !== undefined && step.status != ''" @click="changeUrlVideo(step)">
            {{ step.step }}
          </div>
          <div v-else-if="step.lesson !== undefined && step.status !== ''" @click="openLesson(step)">
            {{step.step}}
          </div>
          <div v-else>
            {{step.step}}
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="dialogPerfilIncompleto" persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white main-rectangle" style="width: 500px">
        <q-card-section>
          <div class="text-h5">Perfil incompleto</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="font-size: 20px">
          Completa tu perfil para continuar
        </q-card-section>

        <q-card-actions align="center" class="bg-whte text-teal">
          <q-btn color="accent" :to="{ name: 'Profile' }" label="Click aqui para llenar perfil" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dialogVideo"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white" style="background: #003F54">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
            <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Minimizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
            <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Maximizar</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">{{tituloVideo}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <q-video
            :ratio="16/9"
            ref="player"
            v-bind:src='urlVideo'
            frameborder="0"
            id="videito"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            :title="tituloVideo"
            allowfullscreen />
          <q-btn color="accent" label="Click aqui para marcar como visto" @click="marcaProgreso()" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="dialogPago" persistent transition-show="scale" transition-hide="scale">
      <q-card class="text-white main-rectangle" style="width: 500px">
        <q-card-section>
          <div class="text-h5">Pago incompleto</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="font-size: 20px">
          Completa el pago de tu inscripción en este link<br/><br/>
          <i>Nota: Si eres de CECYTE, tu pago ya ha sido cubierto por tu escuela</i>
        </q-card-section>

        <q-card-actions align="center" class="bg-whte text-teal">
          <a :href="linkDePago" target="_blank">
            <q-btn color="accent" label="Click aqui para pagar inscripción"/>
          </a>

          <q-btn color="danger" label="Pagar en otro momento" @click="marcaEnterado" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Loading, QSpinnerBall } from 'quasar'
import * as API from 'src/store/Api'
export default defineComponent({
  name: 'MainMenu',
  setup (props, context) {
    const store = useStore()
    const router = useRouter()
    /// url de video
    const urlVideo = ref('')
    /// titulo del video
    const tituloVideo = ref('')
    /// subnivel seleccionado
    const stepActual = ref(null)
    /// dialog muestra video
    const dialogVideo = ref(false)
    /// link de pago
    const linkDePago = ref('')
    const enterado = ref(false)
    const user = store.getters['auth/user']
    var niveles = store.getters['auth/dameNiveles']
    const progresoGlobal = () => { return store.getters['auth/dameProgreso'] }
    const functionInscripcionPagada = () => { return store.getters['auth/inscripcionPagada']}
    const functionDameDatosDePago = () => { return store.getters['auth/dameDatosDePago']}
    const marcaEnterado = () => {
      enterado.value = true
    }
    const levels = computed(() => {
      var progreso = progresoGlobal()
      let datos = store.getters['auth/dameDatosNivel']
      if(datos === null){
        datos = user.nivel;
      }
      console.log('niveles: ', niveles[datos.id - 1], datos)
      return niveles[datos.id - 1] !== undefined && progreso !== null ? niveles[datos.id - 1].map((v, i) => {
        let progress = progreso.filter(p => p.step == v.step)
        return {...v, status: progress.length ? (progress[0].realizado == 0 ? 'done' : 'visited') : '' }
      }) : null
    })
    const datosNivel = computed(() => {
      let datos = store.getters['auth/dameDatosNivel']
      if(datos == null){
        return user.nivel
      }
      return datos
    })
    const dialogPago = computed(() => {
      let statusPago = functionInscripcionPagada()
      if(!statusPago){
        if(enterado.value){
          return false
        }
        if(linkDePago.value != ''){
          console.log('porque hay link')
          return true
        }
        let cargo = functionDameDatosDePago()
        if(cargo !== null){
          if(cargo.cargos && cargo.cargos.length){
            API.Request.Get(
              'Creando liga de pago...',
              API.Model('Auth').payLink,
              {
                cargo_id: cargo.cargos[0].id
              },
              res3 => {
                linkDePago.value = res3.data
                return true
              }
            )
          }else{
            store.dispatch('auth/notifica', {
              title: 'Encontré un error en tu cuenta',
              msg: 'Por favor avisa en Telegram de este error: 228-' + user.id,
              type: false
            })
          }
        }
      }
      return false
    })

    const changeUrlVideo = (step) => {
      Loading.show({ message: 'Cargando video', spinner: QSpinnerBall })
      store.commit('auth/STEP_ACTUAL', step.step)
      urlVideo.value = step.url
      tituloVideo.value = step.title
      stepActual.value = step
      dialogVideo.value = true
      setTimeout(()=>{
        Loading.hide()
      }, 3500)
    }
    const openLesson = (step) => {
      store.commit('auth/STEP_ACTUAL', step.step)
      console.log('veamos esta leccion', step)
      router.push({ path: step.lesson})
    }
    const marcaProgreso = () => {
      store.dispatch('auth/marcaProgreso', {
        step: stepActual.value.step,
        nivel_id: user.id_nivel,
        user_id: user.id
      }).then(() => {
            context.emit('actualizaVidas')
            store.dispatch('auth/notifica', {
              title: 'Súper!',
              msg: 'Tomo nota que ya terminaste el video',
              type: true
            })
        }
      )
    }
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
    // dialog solicitando completar perfil
    const dialogPerfilIncompleto = ref(false)
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
      if(user.grado === null){
        dialogPerfilIncompleto.value = true
      }
      setInterval(animameEsta, 6500)
    })
      console.log()
      store.dispatch('auth/determinaStatusPago', {user_id: user.id})

    console.log('----USER---', user)
    return {
      direccion,
      images,
      desplazamiento,
      user,
      dialogPerfilIncompleto,
      levels,
      urlVideo,
      changeUrlVideo,
      tituloVideo,
      stepActual,
      dialogVideo,
      maximizedToggle: ref(true),
      marcaProgreso,
      openLesson,
      dialogPago,
      linkDePago,
      enterado,
      marcaEnterado,
      datosNivel
    }
  },
  mounted () {
    this.$emit('activeTitle', 'Menú')
  }
})
</script>
