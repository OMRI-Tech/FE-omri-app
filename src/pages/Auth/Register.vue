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
            <p class="title-account q-mt-md">Crear una cuenta</p>
            <!-- <q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img :src="images.logoFacebook" />
              </q-icon>
            </q-btn>
            <q-btn rounded flat class="button">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img :src="images.logoGoogle" />
              </q-icon>
            </q-btn> -->
          </div>
          <!-- <p class="title-account or">- OR -</p> -->
          <q-form class="form-register" align="center" @submit.prevent="">
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
                :rules="[val => val.trim() !== '' || 'Campo no válido']"
              />
              <q-input
                dense v-model.number="user.telNum"
                class="q-my-sm text-button col"
                type="tel" mask="(###)###-####"
                unmasked-value
                label="Teléfono*" color="teal"
                :rules="[val => String(val).length >= 10 || 'Campo no válido']"
              />
            </div>
            <q-input
              dense v-model="user.email"
              class="q-my-sm text-button"
              label="Correo electrónico*" color="teal" 
              :rules="[val => val.trim() !== '' || 'Campo no válido']"
            />
            <q-input 
              dense v-model="user.password"
              class="q-my-sm text-button"
              :type="isPwd ? 'password' : 'text'"
              label="Contraseña*" color="teal"
              :rules="[val => val.trim() !== '' || 'Campo no válido']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="row items-center">
              <q-toggle dense v-model="user.priv" class="tittle-account login"/>
              <div class="col column items-center">
                <p class="tittle-account login col q-ma-sm">
                  Acepto las 
                  <a href="https://www.omri.org.mx/aviso-de-privacidad" target="_blank">Políticas de privacidad</a>*
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
          <p class="title-account q-mt-xs login">
            ¿Ya tienes una cuenta?
            <q-btn :to="{ name: 'Login' }" color="blue" no-caps flat dense  label="Inicia sesión"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, computed } from 'vue'

export default defineComponent({
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
    const user = reactive({
      name: '',
      email: '',
      password: '',
      lname: '',
      mlname: '',
      telNum: '',
      birthdate: '',
      priv: true,
    })
    const isPwd = ref(true)
    const verification = computed(() => {
      var Valid = (user.name !== '')
      Valid = (Valid & user.lname.trim() !== '')
      Valid = (Valid & (user.email.includes('@') & user.email.includes('.')))
      Valid = (Valid & user.password.trim() !== '')
      Valid = (Valid & (String(user.telNum).length >= 10))
      Valid = (Valid & user.priv)
      return Valid == 0
    })
    return {
      user,
      images,
      isPwd,
      verification
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url(src/css/auth.sass)
</style>
