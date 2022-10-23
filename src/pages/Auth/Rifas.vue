<template>
    <div class="fullscreen">
      <div class="items-center back">
        <img :src="images.cloudUp" class="cloud-up" />
        <img :src="images.cloudDown" class="cloud-down" />
        <div class="top-img-section items-center row justify-center">
          <div class="col row column items-center">
            <div class="col "></div>
            <img :src="images.card" class="letter col-md-auto"/>
            <div class="col "></div>
          </div>
          <div class="col row column items-center" style="margin-top: -30px;">
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
        <div class="fixed-center card" style="max-height: 75%; overflow: auto;">
          <div rounded flat class="text-center" style="">
            <div class="q-ma-xs">
              <p class="title-account q-mt-md">Sorteo de un <strong>Iphone 14</strong></p>
              <p class="q-ma-none">Completamente nuevo, original, sellado, 128GB de memoria interna.<br/>¡Ayúdanos a ir al nacional!</p>
              <p><a href="#" @click="muestraHowto">¿Cómo comprar tus boletos?</a></p>
              <hr/>
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
                  title="Paso 1: Registra tus datos"
                  icon="settings"
                  :done="step > 1 || step == 0"
                >
                  <q-banner rounded class="bg-grey-3" style="cursor:pointer;" @click="muestradialog">
                    <template v-slot:avatar>
                      <img
                        :src="images.entrenator"
                        style="width: 50px"
                      >
                    </template>
                    ¿Para qué serán destinados los fondos de la rifa?
                  </q-banner>

                  <p class="title-account or">- Compra tu boleto llenando tus datos  -</p>
                  <q-form class="form-register" align="center" @submit.prevent="actualizacionDatos">
                    <q-input
                    dense v-model="user.name"
                    class="q-mb-sm text-button"
                    label="Nombre completo" color="teal"
                    :rules="[val => val.trim() !== '' || 'Campo no válido']"/>
                    <q-input
                      dense v-model.number="user.telNum"
                      class="q-my-sm text-button col"
                      type="tel" mask="(###) ###-####"
                      unmasked-value
                      label="Teléfono*" color="teal"
                      :rules="[val => String(val).length >= 10 || 'Campo no válido']"
                    />
                    <q-input
                      dense v-model="user.email"
                      class="q-my-sm text-button"
                      label="Correo electrónico*"
                      color="teal"
                      :rules="[val => val.trim() !== '' || 'Campo no válido']"
                    />
                    <q-btn
                      rounded
                      class="q-ma-md full-width button-submit text-button"
                      type="submit"
                      style="background: #ed358a"
                      label="Generar boleto"
                      :disabled = verificationFull
                    />
                  </q-form>
                </q-step>
                <q-step
                  :name="2"
                  title="Paso 2: Selecciona tu método de pago"
                  icon="savings"
                  :done="step > 2 || step == 0"
                >
                  <p class="title-account or">Tu folio se generó exitosamente</p>
                  <q-chip dense size="xl" icon="book_online">
                    FOLIO: {{folio}}
                  </q-chip>
                  <q-banner class="text-white" style="background: #024767;">
                    <h5>Estas a un clic de comprar tu boleto para el sorteo</h5>
                    <p>Presiona el botón para ir a la pasarela de pago, también se envió por correo electrónico.</p>
                    <hr/>
                    <p><strong>¡El link de pago solo funcionará por 24 horas!</strong></p>
                    <hr/>
                    <q-btn :ripple="{ color: 'yellow' }" style="background: #ed358a" label="Clic aquí para pagar" size="xl" :href="link" target="_blank" no-caps />
                  </q-banner>
                  <q-btn
                    rounded
                    class="q-ma-md full-width button-submit text-button bg-red"
                    type="button"
                    label="Cerrar"
                    @click="reiniciar"
                  />
                  <p>Una vez pagado, tu nombre y tu boleto aparecerá en la lista de boletos vendidos</p>
                </q-step>
              </q-stepper>
              <p>El sorteo se realizará el día 19 de noviembre de 2022 en nuestro Faceboook <a href="https://facebook.com/omrioficial">facebook.com/omrioficial</a></p>
            </div>
          </div>
        </div>
      </div>
      <q-dialog v-model="dialogExplicacion">
        <q-card>
          <q-img :src="images.olimpicos" />
          <q-card-section>
            <div class="text-h6">¿Por qué participar en el sorteo?</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <div>
              <p>Participa en el concurso y gana un <strong>¡IPhone 14!</strong>. El sorteo lo realizaremos en vivo sacando 3 números de una tómbola en vivo en nuestra página de Facebook <a href="https://www.facebook.com/omrioficial/" target="_blank">@omrioficial</a></p>
              <p class="text-justify">La <strong>OMRI</strong> es un concurso de informática (programación) que busca a los mejores estudiantes Morelenses
                para participar en el concurso <strong>Olimpiada Mexicana de Informática (OMI)</strong>, la competencia de programación <strong>más importante de México</strong>.
              </p>
              <p>El concurso nacional se realiza en distintos Estados de la República Mexicana y participan hasta 8 estudiantes por Estado</p>
              <p class="text-justify">Todos los fondos serán destinados a pagar el nacional de la OMI en 2023. <strong>No</strong> recibimos apoyo de gobierno, solo buscamos llevar a nuestros chicos al nacional</p>
              <ul>
                <li>Inscripción al nacional (hasta 8 participantes y un líder): Al menos $35,000</li>
                <li>Viáticos al Estado sede: Al menos $15,000</li>
                <li>Gastos en impuestos, licencias de programas, publicidad  y premios: $48,440</li>
              </ul>
              <p>Si vendemos todos los boletos ¡estaremos más cerca de la meta!</p>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cerrar ventana" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogHowto">
        <q-card style="width: 500px">
          <q-card-section>
            <div class="text-h6">¿Cómo adquitir tu boleto?</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-carousel
                animated
                v-model="slide"
                arrows
                navigation
                infinite
              >
              <q-carousel-slide :name="1" :img-src="images.car1" />
              <q-carousel-slide :name="2" :img-src="images.car2" />
              <q-carousel-slide :name="3" :img-src="images.car3" />
              <q-carousel-slide :name="4" :img-src="images.car4" />
            </q-carousel>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cerrar ventana" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>


    </div>
  </template>

  <script>
  /*
  TODO:
    - Animar el folio para que se genere chido
    - Clic en el folio para copiar en portapapeles
    - Poner lista de boletos comprados
    - cambiar color al folio background
  */
  import { ref, defineComponent, reactive, computed, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
  import { Loading, QSpinnerBall, Notify } from 'quasar'
  import * as API from 'src/store/Api'

  export default defineComponent({
    setup () {
      const images = {
        logoFacebook: require('assets/logos/facebook.png'),
        logoGoogle: require('assets/logos/google.png'),
        card: require('assets/img/card.png'),
        bell: require('assets/img/bell.png'),
        phone: require('assets/img/phone.png'),
        cloudUp: require('assets/img/cloud-up.png'),
        cloudDown: require('assets/img/cloud-down.png'),
        entrenator: require('assets/entrenator/bot3.png'),
        olimpicos: require('assets/img/olimpicos2022.png'),
        car1: require('assets/carousel/1.png'),
        car2: require('assets/carousel/2.png'),
        car3: require('assets/carousel/3.png'),
        car4: require('assets/carousel/4.png')
      }
      const user = ref({
        name: '',
        email: '',
        telNum: ''
      })
      const step = ref(1)
      const link = ref("")
      const folio = ref('')
      const dialogExplicacion = ref(false)
      const dialogHowto = ref(false)
      const muestradialog = () => {
        dialogExplicacion.value = true;
      }
      const muestraHowto = () => {
        dialogHowto.value = true;
      }
      const verificationFull = computed(() => {
        var Valid = (user.value.name !== '')
        Valid = (Valid & (user.value.email.includes('@') & user.value.email.includes('.')))
        Valid = (Valid & (String(user.value.telNum).length >= 10))
        return Valid == 0
      })
      const actualizacionDatos = async () => {
        Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
        const formData = new FormData()
        formData.append('nombre', user.value.name)
        formData.append('telefono', user.value.telNum)
        formData.append('correo', user.value.email)
        API.Request.Post(
          'Creando boleto random...',
          API.Model('Auth').rifaLoca,
          formData,
          response => {
            if (response.status === 1) {
              step.value = 2
              link.value = response.linkPago
              folio.value = response.data.folio
              Notify.create({
                message: 'Se guardó exitosamente',
                caption: 'Tu registro esta completo',
                avatar: require('assets/entrenator/felicidades.png'),
                color: 'positive'
              })
            } else {
              Notify.create({
                message: 'Ocurrió un error!',
                caption: response.title,
                avatar: require('assets/entrenator/error.png'),
                color: 'negative',
                // classes: 'horizontal-center'
              })
            }
            Loading.hide()
          },
          error => {
            const noServerError = error.status === 422
            Notify.create({
              message: 'Ocurrió un error',
              caption: 'Intenta más tarde',
              avatar: require('assets/entrenator/error.png'),
              color: !noServerError ? 'negative' : 'info',
              // classes: 'horizontal-center'
            })
          }
        )
      }
      const reiniciar = () => {
        step.value = 1
        user.value.name = ''
        user.value.email = ''
        user.value.telNum = ''
        folio.value = ''
        link.value = ''
      }
      onBeforeMount(() => {
        Loading.show({ message: 'Cargando...', spinner: QSpinnerBall })
      });
      onMounted(() => {
        setTimeout(() => {
          Loading.hide()
        }, 500)
      })
      return {
        user,
        images,
        verificationFull,
        reiniciar,
        actualizacionDatos,
        folio,
        link,
        step,
        dialogExplicacion,
        muestradialog,
        dialogHowto,
        muestraHowto,
        slide: ref(1)
      }
    }
  })
  </script>

  <style lang="sass" scoped>
    @import url(src/css/auth.sass)
  </style>
