<template>
    <div class="text-subtitle2">
        <div class="text-center row">
            <div class="col">
            </div>
            <div class="col-auto-md">
                Selecciona por color
                <div :class="'text-'+color.color">
                    {{color.label}}
                </div>
            </div>
            <div class="timer-score col">
                {{score}}
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
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
export default {
    setup () {
        let random = Math.random()
        const score = ref(0)
        const colores = [
            { label: 'Amarillo', color: 'yellow' },
            { label: 'Verde', color: 'green' },
            { label: 'Azul', color: 'blue' },
            { label: 'Rosa', color: 'pink' },
            { label: 'Rojo', color: 'red' },
            { label: 'Gris', color: 'grey' },
            { label: 'Café', color: 'brown' },
            { label: 'Morado', color: 'purple'},
            { label: 'Naranja', color: 'orange'},
        ]
        const color = colores[Math.floor(random * 9)]
        random = Math.random()
        const mezclados = reactive([])
        for (let i = 0; i < 9; i++) {
            let arr = []
            for (let j = 0; j < 3; j++) {
                let aux1 = Math.floor(random * 9)
                random = Math.random()
                let aux2 = Math.floor(random * 9)
                random = Math.random()
                arr.push({
                    label: colores[aux1].label, 
                    color: colores[aux2].color, 
                    checked: false, 
                    isTheColor: (colores[aux2].color == color.color)
                })
            }
            mezclados.push(arr);
        }
        const clickColor = (item) => {
            score.value += (item.isTheColor && !item.checked)
            item.checked = true
        }
        return {
            mezclados, 
            clickColor,
            color,
            score
        }
    }
}
</script>

<style lang="scss" scoped>
</style>