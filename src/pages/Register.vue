<template>
  <div class="fullscreen">
    <div class="absolute-center back" style="min-width: 100%; min-height: 100%">
      <img :src="icons.cloud_up" class="cloud-up" />
      <img :src="icons.cloud_down" class="cloud-down" />
      <div class="fixed-center card" style="min-width: 90%; height: 62%; max-height: 490px">
        <q-card rounded flat class="text-center">
          <div class="q-ma-xs">
            <p class="title-account" style="margin-top: 10px" v-text="'Crear una cuenta'" />
            <q-btn rounded flat class="button" style="max-height: 50px">
              <p class="text-button" v-text="'Registrate con'" />
              <q-icon class="q-ml-sm" size="sm">
                <img :src="icons.facebook" style="height: 25px" />
              </q-icon>
            </q-btn>
            <q-btn rounded flat class="button" style="max-height: 50px">
              <p class="text-button">Registrate con</p>
              <q-icon class="q-ml-sm" size="sm">
                <img :src="icons.google" style="height: 25px" />
              </q-icon>
            </q-btn>
          </div>
          <p class="title-account" style=" margin-top: 1.5%; font-weight: 600; font-size: 17px; line-height: 21px; ">
            - OR -
          </p>
          <q-form style="margin-left: 19%; margin-right: 18%" align="center" @submit.prevent="registerUser">
            <q-input dense v-model="user.name" class="q-mb-sm text-button" label="Nombre completo" color="teal" />
            <q-input dense v-model="user.email" class="q-my-sm text-button" label="Correo electrónico" color="teal" />
            <q-input dense v-model="user.password" class="q-my-sm text-button" label="Contraseña" color="teal" />
            <q-btn rounded class="q-ma-md full-width button-submit text-button" type="submit" style="color: #ffffff" label="Crear cuenta"/>
          </q-form>
          <div class="title-account q-mt-xs" style="font-size: 13px; font-weight: 300">
            <span>¿Ya tienes una cuenta?</span>
            <q-btn dense flat no-caps color="blue" label="Inicia sesión" />
          </div>
        </q-card>
      </div>
      <div style="position: absolute; top: 0%; height: 18%; width: 100%">
        <img :src="icons.bell" style="height: 30%; margin-top: 7%; margin-left: 10%" />
      </div>
      <div style="position: absolute; top: 87%; height: 15%; width: 100%">
        <img :src="icons.phone" style="height: 55%; margin-left: 10%" />
        <img :src="icons.card" style="height: 70%; margin-left: 30%; margin-top: 10px" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'



export default defineComponent({
  setup () {
    const icons = {
      cloud_up: require('assets/img/cloud-up.png'),
      cloud_down: require('assets/img/cloud-down.png'),
      facebook: require('assets/logos/facebook.png'),
      google: require('assets/logos/google.png'),
      bell: require('assets/img/bell.png'),
      phone: require('assets/img/phone.png'),
      card: require('assets/img/card.png')
    }
    const user = ref({
      name: '',
      email: '',
      password: '',
    })
    const registerUser = () => console.log('Aquíii debemos de llamar a store auth y hará magia con firebase')
    return {
      icons,
      user,
      registerUser
    }
  }
})
</script>

<style lang="sass" scoped>
  @import url('src/css/register.sass')
</style>
