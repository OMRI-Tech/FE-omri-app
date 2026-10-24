<template>
  <q-layout class="fullscreen registro">
    <countdown-timer :targetDateTime="'September 10, 2023 00:00:00'" :countdownMessage="'Tiempo restante para la apertura de la convocatoria:'"></countdown-timer>
    <div class="items-center back">
      <picture>
        <source :srcset="images.cloudUpw" type="image/webp" />
        <img :src="images.cloudUp" class="cloud-up animate__animated animate__fadeInUp animate__slower" />
      </picture>
      <picture>
        <source :srcset="images.cloudDownw" type="image/webp" />
        <img :src="images.cloudDown" class="cloud-down animate__animated animate__fadeInDown animate__slower" />
      </picture>
      <div class="">
        <div class="hamburguesa">
          <q-btn
            round
            icon="menu"
            @click="muestraMenu"
            color="purple"
            size="md"
          />
        </div>
        <div class="text-center">
          <picture>
            <source :srcset="images.omriw" type="image/webp" />
            <img :src="images.omri" alt="logo omri" class="logo col-md-auto animate__animated animate__tada animate__delay-4s" />
          </picture>
        </div>
      </div>
      <div class="bottom-img-section flex items-end">
        <p class="title-account login col q-mt-lg">
          Al registrarte, estás aceptando <br/>
          <a href="https://www.omri.org.mx/aviso-de-privacidad" target="_blank">la política de privacidad</a>*
        </p>
      </div>
      <div class="fixed-center card">
        <div rounded flat class="text-center">
          <div class="q-ma-xs">
            <p v-if="step === 1" class="title-account q-mb-none q-mt-md animate__delay-1s animate__animated animate__rubberBand">
              Registro para la
              {{ versionCelular ? 'XVII OMRI' : 'XVII Olimpiada Morelense de Informática' }}
            </p>
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
                <p class="title-account or">- REGISTRATE CON TU CORREO  -</p>
                <q-form class="form-register" align="center" @submit.prevent="registroEmail">
                  <q-badge color="green" label="Cada participante debe registrarse con su correo propio"></q-badge>
                  <q-input
                    dense v-model="user.email"
                    class="q-my-sm text-button"
                    label="Correo electrónico*" color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                  />
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button animate__animated animate__pulse animate__infinite"
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
                    class="q-my-sm text-button hidden"
                    label="Correo electrónico*"
                    color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"
                    readonly
                  />
                  <q-select
                    dense
                    v-model="user.grado"
                    :options="opcionesGrado"
                    hint="Grado escolar"
                    :rules="[val => val || 'Campo Obligatorio']"
                  >
                  </q-select>
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
                    label="Finalizar registro"
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
                  <h5 class="q-my-sm">Opciones de pago: tarjeta, efectivo, transferencia</h5>
                  <p>Haz clic abajo para pagar.</p>
                  <p>Recibirás el link de pago por correo.</p>
                  <p>Usa tu correo para retomar el registro. Paga antes del <strong>20 de octubre de 2023</strong></p>

                  <q-btn
                    :ripple="{ color: 'yellow' }"
                    style="background: #ed358a"
                    label="Pagar ahora"
                    size="xl"
                    :href="link"
                    target="_blank"
                    class="animate__animated animate__pulse animate__infinite animate__slower"
                    no-caps
                  />
                  <br/>
                  <q-btn class="bg-blue q-mt-md" v-if="!clickReciente" rounded type="button" @click="creaLink">
                    Generar nuevo link de pago
                  </q-btn>
                </q-banner>
                <q-banner class="bg-green text-white" v-else>
                  <h4>Pago confirmado</h4>
                  <p>Recibirás el 14 de octubre una contraseña para acceder a nuestra APP</p>
                </q-banner>
                <q-btn
                  rounded
                  class="q-ma-sm full-width button-submit text-button bg-red"
                  type="button"
                  label="Cerrar"
                  @click="reiniciar"
                />
              </q-step>

            </q-stepper>
            <p class="q-mb-sm" v-if="step !== 2">El curso inicia el 14 de octubre de 2023.</p>
            <p class="q-mb-sm" v-if="step !== 2">
              Para conocer más sobre el concurso, visita <a href="https://www.omri.org.mx/#concurso">nuestro sitio web omri.org.mx</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <drawer-menu
      :model-value="menuLateral"
      @update:modelValue="menuLateral = $event"
    ></drawer-menu>
  </q-layout>
</template>

<script>
import { ref, defineComponent, reactive, computed, onBeforeMount, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { Loading, QSpinnerBall, Notify, useQuasar } from 'quasar'
import * as API from 'src/store/Api'
import CountdownTimer from "components/CountdownTimer.vue"
import DrawerMenu from "components/DrawerMenu.vue"
import 'animate.css'
// Importando imagenes
import cloudUp from "assets/img/cloud-up.png";
import cloudDown from "assets/img/cloud-down.png";
import cloudUpw from "assets/img/webp/cloud-up.png.webp";
import cloudDownw from "assets/img/webp/cloud-down.png.webp";
import omri from "assets/logos/omri.png";
import omriw from "assets/logos/webp/omri.png.webp";

export default defineComponent({
  components: {
    DrawerMenu,
    CountdownTimer
  },
  setup () {
    const $q = useQuasar()
    const images = {
      logoFacebook: require('assets/logos/facebook.png'),
      logoGoogle: require('assets/logos/google.png'),
      cloudUp,
      cloudDown,
      cloudUpw,
      cloudDownw,
      omri,
      omriw,
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
      id: 1,
      grado: null
    })
    // Opciones para grado escolar
    const opcionesGrado = [
      {value: 1, label: "1ro Primaria"},
      {value: 2, label: "2do Primaria"},
      {value: 3, label: "3ro Primaria"},
      {value: 4, label: "4to Primaria"},
      {value: 5, label: "5to Primaria"},
      {value: 6, label: "6to Primaria"},
      {value: 7, label: "1ro Secundaria"},
      {value: 8, label: "2do Secundaria"},
      {value: 9, label: "3ro Secundaria"},
      {value: 10, label: "1ro Preparatoria"},
      {value: 11, label: "2do Preparatoria"},
      {value: 12, label: "3ro Preparatoria"}
    ];
    const clickReciente = ref(false)
    const isPwd = ref(true)
    //const useFacebook = ref(false)
    const inscripcionPagada = ref(false)
    const step = ref(1)
    const link = ref("")
    const menuLateral = ref(false)
    const store = useStore()
    const route = useRoute()
    const verification = computed(() => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return !emailRegex.test(user.value.email);
    });
    const verificationFull = computed(() => {
      var Valid = (user.value.name !== '')
      Valid = (Valid & user.value.lname.trim() !== '')
      Valid = (Valid & (user.value.email.includes('@') & user.value.email.includes('.')))
      Valid = (Valid & user.value.password.trim() !== '')
      Valid = (Valid & (String(user.value.birthdate).length > 6))
      Valid = (Valid & (String(user.value.telNum).length >= 10))
      Valid = (Valid & (user.value.grado !== null))
      return Valid == 0
    })
    const versionCelular = computed(() => {
      return $q.screen.lt.sm
    })
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
      if (user.value.grado !== null) {
        formData.append('id_grado', user.value.grado.value)
      }
      formData.append('paquete_id', 9)
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
                  fecha: '2023-10-20',
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
      clickReciente.value = false
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
      user.value.grado = null
      inscripcionPagada.value = false
      link.value = ''
    }
    const registroEmail = async () => {
      Loading.show({ message: 'Guardando...', spinner: QSpinnerBall })
      await API.Request.Post(
        'Guardando...',
        API.Model('Auth').getUser,
        { email: user.value.email },
        response => {
          user.value.password = user.value.email
          if (response.status === 1) {
            console.log('existe, se rellena', response)
            /// existe, se rellena
            user.value.id = response.data
            user.value.name = response.nombre || ''
            user.value.lname = response.apellidopat || ''
            user.value.mlname = response.apellidomat || ''
            user.value.telNum = response.telefono || ''
            user.value.birthdate = response.birth || null
            user.value.cargos = response.cargos
            user.value.grado = opcionesGrado[response.grado-1]
          } else { // no existe, se crea
            console.log('no existe, se crea')
            const formData = new FormData()
            formData.append('name', user.value.name)
            formData.append('email', user.value.email)
            formData.append('password', user.value.password)
            formData.append('id_status', 1)
            formData.append('id_nivel', 1)
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
    const creaLink = async () => {
      API.Request.Get(
        'Creando liga de pago...',
        API.Model('Auth').payLink,
        {
          cargo_id: user.value.cargos.id,
          ignora: 'true'
        },
        res3 => {
          clickReciente.value = true
          step.value = 3
          console.log('aqui esta el cargo para pagar', res3)
          link.value = res3.data
          Notify.create({
            message: '¡Se generó otro link de pago!',
            caption: 'Se envió a tu WhatsApp también',
            avatar: require('assets/img/entrenator.png'),
            color: 'positive',
            position: 'center'
            // classes: 'horizontal-center'
          })
        }
      )
    }
    watch(user.value, newVal => {
      const isConTypo = newVal.email.endsWith('.con');
      if (isConTypo && !newVal.email.endsWith('.mx.con')) {
        // Corrige automáticamente el error .con a .com
        user.value.email = newVal.email.replace('.con', '.com');
      }
    });
    onBeforeMount(() => {
      Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
    });
    onMounted(() => {
      menuLateral.value = false
      setTimeout(() => {
        Loading.hide()
      }, 500)
    })
    const muestraMenu = () => {
      menuLateral.value = true
    }
    return {
      user,
      images,
      opcionesGrado,
      clickReciente,
      isPwd,
      verification,
      verificationFull,
      versionCelular,
      menuLateral,
      registroEmail,
      reiniciar,
      actualizacionDatos,
      creaLink,
      inscripcionPagada,
      link,
      step,
      store,
      muestraMenu
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url(src/css/auth.sass)
  @import url(src/css/registro.sass)
</style>
