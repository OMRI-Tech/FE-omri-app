<template>
    <div>
        <div class="q-mt-md text-subtitle1">

        </div>
        <div class="q-mt-md">
            <div v-if="!selected" class="main-rectangle text-white q-pa-md text-subtitle2" @click="selectMinijuego(1)">
                ¿Qué tan atento eres?
            </div>
        </div>
        <component v-if="selected" :is="compSelected" @volver="regresar()"/>
    </div>
</template>

<script>
import mini1 from 'src/components/Minijuegos/SeleccionaColor.vue'
import { onBeforeMount } from 'vue'
import { reactive, ref } from '@vue/reactivity'
export default {
  components: { mini1 },
    setup () {
        const selected = ref(false)
        const compSelected = ref("")
        const selectMinijuego = (n) => {
            compSelected.value = "mini" + n
            selected.value = true
        }
        const regresar = () => {
            console.log("evento")
            selected.value = false
        }
        return {
            selected,
            compSelected,
            selectMinijuego,
            regresar
        }
    }
}
</script>

<style lang="scss" scoped>

</style>