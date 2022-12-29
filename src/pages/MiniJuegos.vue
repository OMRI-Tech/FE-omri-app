<template>
    <div class="text-h6">
        <div v-for="(linea, index) in mezclados" :key="index" class="row">
            <div 
            v-for="(item, index) in linea" 
            @click="clickColor(item)" 
            :key="index" 
            :class="'col text-center q-pa-md text-' + item.color"
            >
                {{ item.label }}
                <q-separator/>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
    setup () {
        let random = Math.random()
        const colores = [
            { label: 'Amarillo', color: 'yellow' },
            { label: 'Verde', color: 'green' },
            { label: 'Azul', color: 'blue' },
            { label: 'Rosa', color: 'pink' },
            { label: 'Rojo', color: 'red' },
            { label: 'Gris', color: 'grey' },
            { label: 'Cafe', color: 'brown' },
            { label: 'Morado', color: 'purple'},
            { label: 'Naranja', color: 'orange'},

        ]
        const mezclados = reactive([])
        for (let i = 0; i < 6; i++) {
            let arr = []
            for (let j = 0; j < 3; j++) {
                let aux1 = Math.floor(random * 9)
                random = (random * 10) - (Math.floor(random * 10))
                let aux2 = Math.floor(random * 9)
                random = (random * 10) - (Math.floor(random * 10))
                arr.push({label: colores[aux1].label, color: colores[aux2].color})
            }
            mezclados.push(arr);
        }
        const clickColor = (item) => {
            console.log(item)
        }
        return {
            mezclados, 
            clickColor
        }
    }
}
</script>

<style lang="scss" scoped>
</style>