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
            <p class="title-account q-mt-md">Iniciar sesión</p>
            <!--q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img :src="images.logoFacebook" />
              </q-icon>
            </!q-btn>
            <- q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img :src="images.logoGoogle" />
              </q-icon>
            </-->
          </div>
          <!-- <p class="title-account or">- OR -</p> -->
          <q-form v-if="!usarWhatsapp" class="form-register" align="center" @submit.prevent="login()">
            <p class="title-account or q-ma-none">- Usa el correo de tu registro y la contraseña que te enviamos por email -</p>
            <q-input dense v-model="user.email" class="q-my-sm text-button" label="Correo electrónico" color="teal"  :rules="[val => val.trim() !== '' || 'Campo no válido']" />
            <q-input dense v-model="user.password" class="q-my-sm text-button" :type="isPwd ? 'password' : 'text'" label="Contraseña" color="teal" :rules="[val => val.trim() !== '' || 'Campo no válido']" />
            <q-btn rounded class="q-ma-md full-width button-submit text-button" type="submit" label="Iniciar sesión" :disable="verification" />
          </q-form>
          <q-form v-if="usarWhatsapp && !otpEnviado" class="form-register" align="center" @submit.prevent="handleOTP">
            <p class="title-account or q-ma-none">- Se te enviará un mensaje por WhatsApp con una contraseña -</p>
            <q-input dense v-model.number="user.telNum" class="q-my-sm text-button col q" type="tel" mask="(###) ###-####" unmasked-value label="Teléfono" color="teal" :rules="[val => String(val).length >= 10 || (user.email !== null && user.password !== null) || 'Campo no válido']"/>
            <q-btn rounded class="q-ma-md full-width button-submit text-button" @click="handleOTP()" label="Enviar contraseña por WhatsApp" :disable="verificationPhone" />
          </q-form>
          <q-form v-if="usarWhatsapp && otpEnviado" class="form-register" align="center" @submit.prevent="login()">
            <p class="title-account or q-ma-none">- Escribe el código que te enviamos por WhatsApp -</p>
            <q-input v-model="user.email" class="hidden" type="hidden" />
            <q-input dense v-model="user.password" class="q-my-sm text-button" type="text" label="Contraseña" color="teal" mask="######" :rules="[val => val.trim() !== '' || 'Campo no válido']" />
            <q-btn rounded class="q-ma-md full-width button-submit text-button" type="submit" label="Iniciar sesión" />
          </q-form>

          <p class="title-account login">
            <!-- <q-btn :to="{ name: 'Login' }" color="blue" no-caps flat dense type="submit" label="¿Has olvidado la contraseña?"/> -->
            <q-btn v-if="!usarWhatsapp" @click="usamosWhatsapp()" color="blue" no-caps flat dense type="submit" label="Entrar usando WhatsApp"/>
            <q-btn v-if="usarWhatsapp" @click="usamosWhatsapp()" color="blue" no-caps flat dense type="submit" label="Entrar usando correo y contraseña"/>
          </p>
          <!--p class="title-account q-mt-none login">
            ¿No tienes una cuenta?
            <q-btn :to="{ name: 'Register' }" color="blue" no-caps flat dense  label="Registrate aquí"/>
          </p-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    // imágenes
    const images = {
      logoFacebook: require('assets/logos/facebook.png'),
      logoGoogle: require('assets/logos/google.png'),
      card: require('assets/img/card.png'),
      bell: require('assets/img/bell.png'),
      phone: require('assets/img/phone.png'),
      cloudUp: require('assets/img/cloud-up.png'),
      cloudDown: require('assets/img/cloud-down.png')
    }
    const store = useStore()
    // invocamos Quasar
    const $q = useQuasar()
    // credenciales de usuario
    const user = ref({
      telNum: '',
      email: '',
      password: '',
    })
    // Como default no usamos WhatsApp
    const usarWhatsapp = ref(false)
    // Bandera para determinar si ya le mandamos OTP
    const otpEnviado = ref(false)
    // id de usuario a enviar el OTP
    const usuarioAenviar = ref(null)
    // lista de usuarios con el mismo teléfono
    const listaUsuarios = ref(null)
    // para visualizar contraseña
    // TODO: usa esta variable para el ojito mostrador de contraseña
    const isPwd = ref(true)
    // se reinician variables
    const usamosWhatsapp = (() => {
      usarWhatsapp.value = !usarWhatsapp.value
      user.value.telNum = ''
      user.value.email = ''
      user.value.password = ''
      otpEnviado.value = false
      usuarioAenviar.value = null
      listaUsuarios.value = null
    })
    // se envia OTP por WhatsApp al usuarioAenviar
    const enviaOTP = (() => {
      store.dispatch('auth/enviaOTP', {
        user: usuarioAenviar.value
      }).then(()=>{
        otpEnviado.value = true
      })
    })
    // se determina si el usuario es único o se selecciona de una lista
    const seleccionaUsuario = ((users) => {
      listaUsuarios.value = users
      if (users.length == 1) {
        usuarioAenviar.value = users[0].id
        enviaOTP()
      } else {
        let items = users.map(({ id, name }) => ({ label: name, value: id, color:'accent' }))
        $q.dialog({
          title: '¡Se encontraron varios olímpicos con tu teléfono!',
          message: 'Escoge con cual quieres iniciar tu sesión',
          options: {
            type: 'radio',
            items: items
          },
          cancel: 'Cancelar',
          ok: 'Iniciar sesión',
          persistent: true
        }).onOk(data => {
          usuarioAenviar.value = data
          user.value.email = listaUsuarios.value.filter(us => us.id == data)[0].email
          enviaOTP()
        }).onCancel(() => {
          usuarioAenviar.value = null
          user.value.email = ''
        })
      }
    })
    // manejador de botón manejador de OTP
    const handleOTP = (() => {
      store.dispatch('auth/searchUser', {
        telefono: user.value.telNum,
        callback: seleccionaUsuario
      })
    })
    // verificación de correo y contraseña
    const verification = computed(() => {
      var valid = (user.value.name !== '')
      valid = (valid & (user.value.email.includes('@') & user.value.email.includes('.')))
      valid = (valid & user.value.password.trim() !== '')
      return valid == 0
    })
    // verificación de teléfono
    const verificationPhone = computed(() => {
      var valid = (String(user.value.telNum).length >= 10)
      return valid == 0
    })
    // inicia sesión
    const login = async () => {
      console.log('store', store)
      await store.dispatch('auth/Login', user.value)
    }
    return {
      login,
      usamosWhatsapp,
      handleOTP,
      user,
      images,
      isPwd,
      verification,
      verificationPhone,
      usarWhatsapp,
      otpEnviado
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url(src/css/auth.sass)
</style>
