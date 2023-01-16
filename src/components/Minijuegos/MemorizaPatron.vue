 <template>
    <div class="q-mt-md">
        <div v-for="(item, index) in cards" :key="index" class="row">
            <div v-for="(card, id) in item" :key="id" class="col text-center" >
                <div :class="'main-rectangle q-pa-lg text-white text-subtitle2' + (card.value > round ?' no-mostrar': '') + (!card.checked ? ' carta-cerrada': '')" @click="levantarCarta(card)">
                    <div>
                        {{card.value + 1}}
                    </div>
                </div>
            </div>
        </div>
    </div>
 </template>
 
 <script>
import { reactive, ref } from 'vue'

 export default {
    name: 'mini2',
    setup () {
        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        const shuffle = () => {
            let arr = [...Array(32).keys()]
            for(let i = 0; i < 64 ; i++){
                let x = Math.floor(Math.random() * 32 - (1/10000))
                let y = Math.floor(Math.random() * 32 - (1/10000))
                let aux = arr[x]
                arr[x] = arr[y]
                arr[y] = aux 
            }
            let k = 0
            let arr2 = []
            for(let i = 0; i < 8; i++){
                let arrAux = []
                for(let j = 0; j < 4; j++){
                    arrAux.push({value: arr[k], checked: false})
                    k++
                }
                arr2.push(arrAux)
            }
            return arr2
        }
        const cards = reactive(shuffle())
        const round = ref(0)
        const nextCard = ref(0);
        const levantarCarta = async (card) => {
            if(card.value <= round.value){
                if(nextCard.value == card.value){
                    card.checked = true
                    if(nextCard.value == round.value){
                        await sleep(1000)
                        cards.forEach(line => {
                           line.forEach(card => {
                            card.checked = false
                           }) 
                        })
                        nextCard.value = 0
                        round.value++
                    } else {
                        nextCard.value = nextCard.value + 1
                    }
                }
            }
        }
        return {
            cards,
            round,
            levantarCarta
        }
    }
 }
 </script>
 
 <style lang="scss" scoped>
 .no-mostrar{
    opacity: 0;
 }
 .carta-cerrada{
    background-color: grey;
 }
 .carta-cerrada > div{
    opacity: 0;
 }
 </style>