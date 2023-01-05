<template>
  <q-layout>
    <q-header class="header">
      <q-toolbar class="justify-center">
        <div class="q-px-md ic-trophy">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/trophy.svg" />
          </q-icon>
          0
        </div>
        <div class="q-px-md ic-triangle">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/triangle.svg" />
          </q-icon>
          --
        </div>
        <div class="q-px-md ic-heart">
          <q-icon size="1.5rem">
            <q-img src="~assets/icons/heart.svg" />
          </q-icon>
          {{ vidas }}
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="contenedor-movil">
      <router-view @activeTitle="activeTitle" @actualizaVidas="actualizaVidas" />
    </q-page-container>

    <q-footer class="footer contenedor-movil">
      <q-toolbar class="justify-center">
        <div v-for="(item, i) in itemsFooter" :key="i" class="q-px-sm col horizontal-center">
          <q-btn :class="item.title === actualTitle ? 'ic-footer active' : 'ic-footer'" @click="item.click" flat stack>
            <q-icon size="1.5rem" v-if="item.activeImage !== null">
              <q-img :src="item.activeImage" />
            </q-icon>
            <q-icon size="1.5rem" v-else :name="item.icon"/>
            {{ item.title }}
          </q-btn>
        </div>
      </q-toolbar>
    </q-footer>
    <q-dialog
      v-model="dialogBloqueo"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card :class="claseBloqueadora"></q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { defineComponent, onBeforeMount, ref, computed } from 'vue'
import { mapActions, useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Store from 'src/store'
import 'src/css/menu.sass'

export default defineComponent({
  name: 'MenuLayout',
  setup () {
    const store = useStore()
    store.dispatch('auth/actualizaVidas')
    const router = useRouter()
    const vidas = ref(0)
    const actualTitle = ref()
    /// dialog bloqueador
    const dialogBloqueo = ref(false)
    /// clase bloqueadora
    const claseBloqueadora = ref('bloqueo-sin-vidas')
    const activeTitle = (title) => {
      actualTitle.value = title
      console.log('active title con esto: ', title)
    }
    const actualizaVidas = () => {
      store.dispatch('auth/actualizaVidas').then(() => {
        vidas.value = Store().getters['auth/vidas']
        if(store.getters['auth/vidas'] == 0){
          dialogBloqueo.value = true
        }
      })
    }
    onBeforeMount(() => {
      actualizaVidas()
    })
    const logout = () => {
      store.dispatch('auth/logoutFirebase')
    }
    const verPerfil = () => {
      router.push({ name: 'Profile' })
    }
    const verMenu = () => {
      router.push({ name: 'Home' })
    }

    return {
      store,
      vidas,
      logout,
      activeTitle,
      actualizaVidas,
      actualTitle,
      dialogBloqueo,
      claseBloqueadora,
      itemsFooter: [
        { title: 'Mi perfil', activeImage: require('assets/icons/out_profile.svg'), regularImage: '', click: verPerfil},
        { title: 'Menú', activeImage: require('assets/icons/out_ranking.svg'), regularImage: '', click: verMenu},
        { title: 'Salir', activeImage: null, icon: "logout", regularImage: '', click: logout }
      ]
    }
  },
  methods: {
    // I don't know why this happens, but the vuex is doing weird things
    // I should be able to call it from setup but it doesn't work
    ...mapActions('auth', ['Logout']),
    mapeaFunciones (index) {
      switch(index) {
        case 0:
          //this.$router.push({ name: 'Profile' })
          break;
        case 3:
          alert('bay')

          this.Logout()
          break;
        default:
          break;
      }
    }
  }
})
</script>
