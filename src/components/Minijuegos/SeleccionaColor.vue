<template>
    <div class="text-subtitle2" style="font-size: 1.2rem;">
        <div class="text-center row q-pa-sm">
            <div class="col-8">
                Selecciona por {{tipoJuego}}
                <div class="text-italic">
                    {{color.label}}
                </div>
            </div>
            <div class="timer-score items-center col row">
                <div class="col text-center">
                    {{score}}
                </div>
                <div class="col text-center">
                    <q-icon size="sm" color="teal" name="timer"></q-icon>
                    <div>
                        {{Math.floor(timer)}}
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(linea, id) in mezclados" :key="id" class="row">
            <div 
            v-for="(item, index) in linea" 
            @click="clickColor(item)" 
            :key="index" 
            :class="'col text-center q-pa-md text-' + item.color"
            >
                {{ item.label }}
                <q-icon 
                v-if="item.checked" 
                size="xs" 
                :color="item.isTheColor ? 'green':'red'" 
                :name="item.isTheColor ? 'check':'cancel'" 
                ></q-icon>
                <q-separator/>
            </div>
        </div>
        <q-dialog v-model="ModelDialog" persistent>
            <q-card class="absolute-center text-center q-pa-md">
                <br>
                Obtuviste {{score}} puntos
                <br>
                Tu máximo es {{maxScore}}
                <br>
                <q-btn flat color="teal q-mt-md" @click="volverMenu()">Menu</q-btn>
                <q-btn flat color="teal q-mt-md" @click="volverAJugar()">
                    <q-icon name="refresh" color="teal"></q-icon>
                </q-btn>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import { reactive, ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import { useRouter } from 'vue-router'

export default {
    name: 'mini1',
    emits: ['volver'],
    setup (props,ctx) {
        const router = useRouter()
        let random = Math.random()
        const tipoJuego = ref(Math.floor(Math.random() * 2) ? "COLOR" : "NOMBRE")
        const score = ref(0)
        const maxScore = ref(0)
        const timeMounted = ref(new Date(Date.now()))
        const ModelDialog = ref(false)
        const dialog = ref("")
        const colores = reactive([
            { label: 'Negro', color: '', count: 0 },
            { label: 'Verde', color: 'green', count: 0 },
            { label: 'Azul', color: 'blue', count: 0 },
            { label: 'Rosa', color: 'pink-6', count: 0 },
            { label: 'Rojo', color: 'red-9', count: 0 },
            { label: 'Gris', color: 'grey', count: 0 },
            { label: 'Café', color: 'brown', count: 0 },
            { label: 'Morado', color: 'purple', count: 0},
            { label: 'Naranja', color: 'orange', count: 0},
        ])
        const color = ref(colores[Math.floor(random * 9)])
        random = Math.random()
        const mezclados = reactive([])
        const count = ref(0)
        const mezclarColores = () => {
            for (let i = 0; i < 9; i++) {
                let arr = []
                for (let j = 0; j < 3; j++) {
                    let aux1 = Math.floor(random * 9)
                    random = Math.random()
                    let aux2 = Math.floor(random * 9)
                    random = Math.random()
                    colores[aux2].count++
                    arr.push({
                        label: colores[aux1].label, 
                        color: colores[aux2].color, 
                        checked: false, 
                        isTheColor: ((tipoJuego.value  == "COLOR") ? (color.value.color == colores[aux2].color) : (color.value.label == colores[aux1].label))
                    })
                    count.value += ((tipoJuego.value  == "COLOR") ? (color.value.color == colores[aux2].color) : (color.value.label == colores[aux1].label))
                }
                mezclados.push(arr);
            }
        }
        const limpiarColores = () =>{
            for(let i = 0; i < 9; i++) {
                mezclados.pop()
            }
        }
        const clickColor = (item) => {
            if (timer != 0){
                score.value += Math.floor((item.isTheColor && !item.checked) * (120 * timer.value /20))
                score.value -= (!item.isTheColor && !item.checked) * 35
                count.value -= (item.isTheColor && !item.checked)
                item.checked = true
            }
        }
        const timerValue = () => {
            const now = new Date(Date.now())
            return 60 - (now - timeMounted.value)/1000
        }
        const timer = ref(0)
        const volverMenu = () => {
            ctx.emit('volver')
        }
        const volverAJugar = () => {
            color.value = colores[Math.floor(random * 9)]
            tipoJuego.value = Math.floor(Math.random() * 2) ? "COLOR" : "NOMBRE"
            random = Math.random()
            do {
                count.value = 0
                limpiarColores()
                mezclarColores()
            } while (count.value == 0);
            ModelDialog.value = false
            timeMounted.value = new Date(Date.now())
            score.value = 0
        }
        setInterval(() => {
            timer.value = (timerValue() > 0) ? timerValue() : 0
            if (timer.value == 0){
                ModelDialog.value = true
                maxScore.value = score.value > maxScore.value ? score.value : maxScore.value
            }
            if (count.value == 0){
                color.value = colores[Math.floor(random * 9)]
                tipoJuego.value = Math.floor(Math.random() * 2) ? "COLOR" : "NOMBRE"
                do{
                    limpiarColores()
                    mezclarColores()
                } while (count.value == 0)
            }
        }, 100)
        onBeforeMount(() => {
            while(count.value == 0){
                mezclarColores()
            }
        })
        return {
            mezclados,
            tipoJuego, 
            clickColor,
            color,
            score,
            maxScore,
            timeMounted,
            timer,
            ModelDialog,
            dialog,
            volverAJugar,
            volverMenu
        }
    }
}
</script>

<style lang="scss" scoped>
</style>