<template>
    <div class="text-subtitle2">
        <div class="text-center row q-pa-xs">
            <div class="col">
            </div>
            <div class="col-auto-md">
                Selecciona por color
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
        <q-dialog v-model="ModelWinner">
            <q-card class="absolute-center text-center q-pa-lg">
                Ganaste!
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
import router from 'src/router'
export default {
    setup () {
        let random = Math.random()
        const score = ref(0)
        const timeMounted = ref(new Date(Date.now()))
        const ModelWinner = ref(false)
        const colores = reactive([
            { label: 'Amarillo', color: 'yellow', count: 0 },
            { label: 'Verde', color: 'green', count: 0 },
            { label: 'Azul', color: 'blue', count: 0 },
            { label: 'Rosa', color: 'pink', count: 0 },
            { label: 'Rojo', color: 'red', count: 0 },
            { label: 'Gris', color: 'grey', count: 0 },
            { label: 'Café', color: 'brown', count: 0 },
            { label: 'Morado', color: 'purple', count: 0},
            { label: 'Naranja', color: 'orange', count: 0},
        ])
        const color = colores[Math.floor(random * 9)]
        random = Math.random()
        const mezclados = reactive([])
        const count = ref(0)
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
                    isTheColor: (colores[aux2].color == color.color)
                })
                count.value += (colores[aux2].color == color.color)
            }
            mezclados.push(arr);
        }
        const clickColor = (item) => {
            score.value += Math.floor((item.isTheColor && !item.checked) * (120 * timer.value /20))
            count.value -= (item.isTheColor && !item.checked)
            item.checked = true
            ModelWinner.value = (count.value == 0)
        }
        const timerValue = () => {
            const now = new Date(Date.now())
            return 20 - (now - timeMounted.value)/1000
        }
        const timer = ref(0)
        setInterval(() => {
            timer.value = timerValue() > 0 ? timerValue() : 0
        }, 250)
        onBeforeMount(() => {
            console.log(count.value)
            if(!(count.value > 0)){
                console.log("hice otro render")
                router.push({name:"MiniGames"})
            }
        })
        return {
            mezclados, 
            clickColor,
            color,
            score,
            timeMounted,
            timer,
            ModelWinner
        }
    }
}
</script>

<style lang="scss" scoped>
</style>