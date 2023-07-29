<template>
  <div class="fullscreen">
    <countdown-timer :targetDateTime="'September 11, 2023 00:00:00'" :countdownMessage="'Tiempo restante para la apertura de la convocatoria:'"></countdown-timer>
    <div class="items-center back">
      <img :src="images.cloudUp" class="cloud-up" />
      <img :src="images.cloudDown" class="cloud-down" />
      <div class="top-img-section items-center row justify-center">
        <div class="col row column items-center">
          <div class="col "></div>
          <img :src="images.card" class="letter col-md-auto"/>
          <div class="col "></div>
        </div>
        <div class="col row column items-center">
          <div class="col "></div>
          <img src="~assets/logos/omri.png" class="col-md-auto ">
          <div class="col "></div>
        </div>
        <div class="col">
        </div>
      </div>
      <div class="bottom-img-section">
        <img :src="images.bell" class="bell" />
        <img :src="images.phone" class="phone" />
      </div>
      <div class="fixed-center card">
        <div rounded flat class="text-center">
          <div class="q-ma-xs">
            <p class="title-account q-mt-md">Registro para la XVI OMRI</p>
            <q-stepper
              v-model="step"
              vertical
              ref="stepper"
              color="primary"
              class="no-shadow"
              animated
            >
              <q-step
                :name="1"
                title="Paso 1: Registrate con tu correo electrónico"
                icon="settings"
                :done="step > 1"
              >
                <q-banner rounded class="bg-grey-3 hidden">
                  <template v-slot:avatar>
                    <img
                      src="https://cdn.quasar.dev/img/mountains.jpg"
                      style="width: 100px; height: 64px"
                    >
                  </template>

                  Si has participado en anteriores OMRI, escribe el correo con el que te registraste
                </q-banner>
                <q-btn rounded flat class="button hidden" @click="registroFacebook">
                  <p class="text-button">Registrate con</p>
                  <q-icon class="q-ml-sm" size="sm">
                    <img :src="images.logoFacebook" />
                  </q-icon>
                </q-btn>
                <q-btn rounded flat class="button q-mb-md hidden">
                  <p class="text-button">Registrate con</p>
                  <q-icon class="q-ml-sm" size="sm">
                    <img :src="images.logoGoogle" />
                  </q-icon>
                </q-btn>
                <p class="title-account or">- REGISTRATE CON TU CORREO  -</p>
                <q-form class="form-register" align="center" @submit.prevent="registroEmail">
                  <q-input
                    dense v-model="user.email"
                    class="q-my-sm text-button"
                    label="Correo electrónico*" color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                  />
                  <div class="row items-center">
                    <div class="col column items-center">
                      <p class="tittle-account login col q-ma-sm">
                        Al registrarte, estás aceptando la
                        <a href="https://www.omri.org.mx/aviso-de-privacidad" target="_blank">política de privacidad</a>*
                      </p>
                    </div>
                  </div>
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button"
                    type="submit"
                    label="Crear cuenta"
                    :disabled = verification
                  />
                </q-form>
              </q-step>
              <q-step
                :name="2"
                title="Paso 2: Datos escolares"
                icon="school"
                :done="step > 2"
              >
                <p class="title-account or">Escribe los siguientes datos</p>
                <q-form class="form-register" align="center" @submit.prevent="actualizacionDatos">
                  <q-input
                  dense v-model="user.name"
                  class="q-mb-sm text-button"
                  label="Nombre(s)*" color="teal"
                  :rules="[val => val.trim() !== '' || 'Campo no válido']"/>
                  <q-input dense v-model="user.lname"
                    class="q-my-sm text-button"
                    label="Apellido Paterno*" color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                  />
                  <q-input dense v-model="user.mlname" class="q-my-sm text-button" label="Apellido Materno (opcional)" color="teal" />
                  <div class="row">
                    <q-input
                      dense v-model="user.birthdate"
                      class="q-my-sm text-button col"
                      hint="Fecha de nacimiento*"
                      color="teal" type="date"
                      :rules="[val => val && val.trim() !== '' || 'Campo no válido']"
                    />
                    <q-input
                      dense v-model.number="user.telNum"
                      class="q-my-sm text-button col"
                      type="tel" mask="(###) ###-####"
                      unmasked-value
                      label="Teléfono*" color="teal"
                      :rules="[val => String(val).length >= 10 || 'Campo no válido']"
                    />
                  </div>
                  <q-input
                    dense v-model="user.email"
                    class="q-my-sm text-button"
                    label="Correo electrónico*"
                    color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                    readonly
                  />
                  <q-input
                    dense v-model="user.password"
                    class="q-my-sm text-button hidden"
                    :type="isPwd ? 'password' : 'text'"
                    label="Contraseña*" color="teal"
                  >
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button"
                    type="submit"
                    label="Crear cuenta"
                    :disabled = verificationFull
                  />
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button bg-red"
                    type="button"
                    label="Cerrar y llenar más tarde"
                    @click="reiniciar"
                  />
                </q-form>
              </q-step>
              <q-step
                :name="3"
                title="Paso 3: Pago del curso"
                icon="savings"
                :done="step > 3"
              >
                <q-banner class="bg-green text-white" v-if="!inscripcionPagada">
                  <h4>Paga tu inscripción con tarjeta, efectivo o transferencia</h4>
                  <p>Usa el siguiente link para realizar el pago de tu inscripción.</p>
                  <p>Te llegará por correo electrónico tambien la liga de pago</p>
                  <p>Puedes regresar al registro en cualquier momento usando tu correo electrónico, la fecha límite de pago es el <strong>11 de noviembre de 2022</strong></p>
                  <a :href="link" target="_blank">{{link}}</a>
                </q-banner>
                <q-banner class="bg-green text-white" v-else>
                  <h4>Tu pago ha sido recibido</h4>
                  <p>Recibirás el 29 de octubre una contraseña para acceder a nuestra APP</p>
                </q-banner>
                
                <q-btn
                  rounded
                  class="q-ma-md full-width button-submit text-button bg-red"
                  type="button"
                  label="Cerrar"
                  @click="reiniciar"
                />
              </q-step>

            </q-stepper>
            <p>El curso inicia el 29 de octubre.</p>
            <p>
              Para conocer más sobre el concurso, visita <a href="https://www.omri.org.mx/#concurso">nuestro sitio web omri.org.mx</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, computed, onBeforeMount, onMounted } from 'vue'
import { auth, db, provider } from "boot/firebase";
import { createUserWithEmailAndPassword, getRedirectResult, signOut, getAuth } from "firebase/auth";
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Loading, QSpinnerBall, Notify } from 'quasar'
import * as API from 'src/store/Api'
import CountdownTimer from "components/CountdownTimer.vue"
import 'animate.css'

export default defineComponent({
  components: {
    CountdownTimer
  },
  setup () {
    const images = {
      logoFacebook: require('assets/logos/facebook.png'),
      logoGoogle: require('assets/logos/google.png'),
      card: require('assets/img/card.png'),
      bell: require('assets/img/bell.png'),
      phone: require('assets/img/phone.png'),
      cloudUp: require('assets/img/cloud-up.png'),
      cloudDown: require('assets/img/cloud-down.png')
    }
    const user = ref({
      name: '',
      email: '',
      password: '',
      lname: '',
      mlname: '',
      telNum: '',
      birthdate: '',
      facebook: false,
      firebase: '',
      cargos: null,
      id: 1
    })
    const isPwd = ref(true)
    const useFacebook = ref(false)
    const inscripcionPagada = ref(false)
    const step = ref(1)
    const link = ref("")
    const store = useStore()
    const route = useRoute()
    const verification = computed(() => {
      var Valid = (user.value.email.includes('@') & user.value.email.includes('.'))
      return Valid == 0
    })
    const verificationFull = computed(() => {
      var Valid = (user.value.name !== '')
      Valid = (Valid & user.value.lname.trim() !== '')
      Valid = (Valid & (user.value.email.includes('@') & user.value.email.includes('.')))
      Valid = (Valid & user.value.password.trim() !== '')
      Valid = (Valid & (String(user.value.birthdate).length > 6))
      Valid = (Valid & (String(user.value.telNum).length >= 10))
      return Valid == 0
    })
    const registroFacebook = () => {
      store.dispatch('auth/socialRedirect', { facebook: true })
    }
    const actualizacionDatos = async () => {
      Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
      const formData = new FormData()
      formData.append('name', user.value.name)
      formData.append('lastname', user.value.lname)
      formData.append('mother_lastname', user.value.mlname)
      formData.append('fecha_nacimiento', user.value.birthdate)
      formData.append('telefono', user.value.telNum)
      formData.append('email', user.value.email)
      formData.append('password', user.value.password)
      formData.append('id_status', 1)
      formData.append('id_nivel', 1)
      formData.append('paquete_id', 8)
      formData.append('activar', 1)
      formData.append('firebase', user.value.firebase)
      if (route.params.origen && route.params.origen.length) {
        formData.append('matricula', route.params.origen)
      }
      API.Request.Post(
        'Actualizando olímpico...',
        API.Model('Auth').updateUser + user.value.id,
        formData,
        response => {
          if (response.status === 1) {
            console.log('actualizado: ', response)
            if(user.value.cargos === null){
              API.Request.Post(
                'Registrando inscripción...',
                API.Model('Auth').agregarInscripcion,
                {
                  user_id: user.value.id,
                  fecha: '2022-11-01',
                  tipo: 'inscripcion'
                },
                res2 => {
                  console.log('aqui esta el cargo para pagar', res2)
                  API.Request.Get(
                    'Creando liga de pago...',
                    API.Model('Auth').payLink,
                    {
                      cargo_id: res2.data.cargo_id
                    },
                    res3 => {
                      step.value = 3
                      console.log('aqui esta el cargo para pagar', res3)
                      link.value = res3.data
                      Notify.create({
                        message: 'Se guardó exitosamente',
                        caption: 'Tu registro esta completo',
                        avatar: require('assets/img/entrenator.png'),
                        color: 'positive',
                        // classes: 'horizontal-center'
                      })
                    }
                  )
                }
              )
            }else{
              if(user.value.cargos.pagado === 0){
                console.log('aqui esta el cargo para pagar2', user.value.cargos, user.value.cargos.id)
                if(user.value.cargos.conekta === null){
                  API.Request.Get(
                    'Creando liga de pago...',
                    API.Model('Auth').payLink,
                    {
                      cargo_id: user.value.cargos.id
                    },
                    res3 => {
                      step.value = 3
                      console.log('aqui esta el cargo para pagar', res3)
                      link.value = res3.data
                      Notify.create({
                        message: 'Se guardó exitosamente',
                        caption: 'Tu registro esta completo',
                        avatar: require('assets/img/entrenator.png'),
                        color: 'positive',
                        // classes: 'horizontal-center'
                      })
                    }
                  )
                } else {
                  link.value = user.value.cargos.conekta.url
                  step.value = 3
                }
              } else {
                step.value = 3
                console.log('aqui esta el cargo para pagar', user.value.cargos)
                inscripcionPagada.value = true
                Notify.create({
                  message: 'Se guardó exitosamente',
                  caption: 'Tu registro esta completo',
                  avatar: require('assets/img/entrenator.png'),
                  color: 'positive',
                  // classes: 'horizontal-center'
                })
              }
            }
          } else {
            Notify.create({
              message: 'Ocurrió un error al actualizar olímpico',
              caption: !noServerError ? 'Intenta más tarde' : 'No pudimos actualizar tu usuario',
              avatar: require('assets/img/entrenator.png'),
              color: !noServerError ? 'negative' : 'info',
              // classes: 'horizontal-center'
            })
          }
          Loading.hide()
        },
        error => {
          const noServerError = error.status === 422
          Notify.create({
            message: 'Ocurrió un error',
            caption: !noServerError ? 'Intenta más tarde' : 'No pudimos actualizar tu usuario',
            avatar: require('assets/img/entrenator.png'),
            color: !noServerError ? 'negative' : 'info',
            // classes: 'horizontal-center'
          })
        }
      )
    }
    const reiniciar = () => {
      step.value = 1
      signOut(auth)
      user.value.name = ''
      user.value.email = ''
      user.value.password = ''
      user.value.lname = ''
      user.value.mlname = ''
      user.value.telNum = ''
      user.value.birthdate = ''
      user.value.facebook = false
      user.value.firebase = ''
      user.value.id = 1
      user.value.cargos = null
      inscripcionPagada.value = false
      link.value = ''
    }
    const registroEmail = async () => {
      Loading.show({ message: 'Guardando...', spinner: QSpinnerBall })
      console.log('se determina si entra o no: ', user.value.firebase.length === 0)
      if(user.value.firebase.length === 0){
        try{
          await createUserWithEmailAndPassword(
            auth,
            user.value.email,
            user.value.email
          ).then((userCredential) => {
            user.value.firebase = userCredential.user.uid
          })
        }
        catch(e){
          console.error('nada que hacerle :c')
          console.log(e)
        }
      }
      await API.Request.Post(
        'Guardando...',
        API.Model('Auth').getUser,
        { email: user.value.email },
        response => {
          user.value.password = user.value.email
          if (response.status === 1) {
            console.log('existe, se rellena')
            /// existe, se rellena
            user.value.id = response.data
            user.value.name = response.nombre || ''
            user.value.lname = response.apellidopat || ''
            user.value.mlname = response.apellidomat || ''
            user.value.telNum = response.telefono || ''
            user.value.birthdate = response.birth || null
            user.value.cargos = response.cargos
          } else { // no existe, se crea
            console.log('no existe, se crea')
            const formData = new FormData()
            formData.append('name', user.value.name)
            formData.append('email', user.value.email)
            formData.append('password', user.value.password)
            formData.append('id_status', 1)
            formData.append('id_nivel', 1)
            formData.append('firebase', user.value.firebase)
            if (route.params.origen && route.params.origen.length) {
              formData.append('matricula', route.params.origen)
            }
            API.Request.Post(
              'Creando olímpico...',
              API.Model('Auth').addUser,
              formData,
              response => {
                if (response.status === 1) {
                  user.value.id = response.data.id
                }
              }
            )
          }
          step.value = 2
          Loading.hide()
        },
        error => {
          const noServerError = error.status === 422
          Notify.create({
            message: 'Ocurrió un error!!',
            caption: !noServerError ? 'Intenta más tarde' : 'No pudimos guardar tu correo',
            avatar: require('assets/img/entrenator.png'),
            color: !noServerError ? 'negative' : 'info',
            // classes: 'horizontal-center'
          })
        }
      )
    }
    onBeforeMount(() => {
      Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
      /*getRedirectResult(auth).then((result) => {
        // This is the signed-in user
        console.log('ok salimos de aca getredirect', result)
        if(result !== null){
          user.value.firebase = result.user.uid
          if(user.value.name.length == 0) {
            user.value.name = result.user.displayName
          }
          user.value.email = result.user.email
          user.value.avatar = result.user.photoURL
          useFacebook.value = true
          console.log('aquiiiii', result.user)
          registroEmail()
        }
      }).catch((e) => {
        console.log('¿o')
        console.error(e)
        console.log(e.code, e.email)
      })*/
    });
    onMounted(() => {
      setTimeout(() => {
        Loading.hide()
      }, 500)
    })

    return {
      user,
      images,
      isPwd,
      verification,
      verificationFull,
      registroFacebook,
      registroEmail,
      reiniciar,
      actualizacionDatos,
      inscripcionPagada,
      link,
      useFacebook,
      step,
      store
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url(src/css/auth.sass)
</style>