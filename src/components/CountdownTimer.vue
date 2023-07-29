<template>
  <div class="overlay" v-if="isBlocked">
    <div class="countdown-container">
      <p class="countdown-message">{{ countdownMessage }}</p>
      <div class="countdown">
        <div class="countdown-grid">  
          <!-- Días -->
          <div class="countdown-box">
            <span class="countdown-number" :class="daysTensAnimationClass">{{ Math.floor(days / 10) }}</span>
          </div>
          <div class="countdown-box">
            <span class="countdown-number" :class="daysAnimationClass">{{ days % 10 }}</span>
            <span class="countdown-label">días</span>
          </div>
          <!-- Horas -->
          <div class="countdown-box">
            <span class="countdown-number" :class="hoursTensAnimationClass">{{ Math.floor(hours / 10) }}</span>
          </div>
          <div class="countdown-box">
            <span class="countdown-number" :class="hoursAnimationClass">{{ hours % 10 }}</span>
            <span class="countdown-label">horas</span>
          </div>
          <!-- Minutos -->
          <div class="countdown-box">
            <span class="countdown-number" :class="minutesTensAnimationClass">{{ Math.floor(minutes / 10) }}</span>
          </div>
          <div class="countdown-box">
            <span class="countdown-number" :class="minutesAnimationClass">{{ minutes % 10 }}</span>
            <span class="countdown-label">minutos</span>
          </div>
          <!-- Segundos -->
          <div class="countdown-box">
            <span class="countdown-number" :class="secondsTensAnimationClass">{{ Math.floor(seconds / 10) }}</span>
          </div>
          <div class="countdown-box" >
            <span class="countdown-number" :class="secondsAnimationClass">{{ seconds % 10 }}</span>
            <span class="countdown-label">segundos</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted, watch } from 'vue'
import axios from "axios"
import 'src/css/countdown.css';


export default defineComponent({
  props: {
    targetDateTime: {
      type: String,
      required: true
    },
    countdownMessage: {
      type: String,
      default: "Tiempo restante:"
    }
  },
  setup (props) {
    const isBlocked = ref(false)
    const days = ref(0)
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const daysAnimationClass = ref("")
    const daysTensAnimationClass = ref("")
    const hoursAnimationClass = ref("")
    const hoursTensAnimationClass = ref("")
    const minutesAnimationClass = ref("")
    const minutesTensAnimationClass = ref("")
    const secondsAnimationClass = ref("")
    const secondsTensAnimationClass = ref("")
    const prevDays = ref(0)
    const prevHours = ref(0)
    const prevMinutes = ref(0)
    const prevSeconds = ref(0)
    let intervalInstance
    let serverTimeOffset = 0  // Diferencia entre el tiempo del servidor y el tiempo local al inicio.

    const fetchTime = () => {
      axios
        .get("https://worldtimeapi.org/api/timezone/America/Mexico_City")
        .then(response => {
          const serverTime = new Date(response.data.datetime).getTime()
          serverTimeOffset = serverTime - new Date().getTime()
          calculateCountdown(serverTime)
          startInterval()
        })
        .catch(() => {
          calculateCountdown(new Date().getTime())
          startInterval()
        })
    }
    const startInterval = () => {
      intervalInstance = setInterval(() => {
        const adjustedCurrentTime = new Date().getTime() + serverTimeOffset
        calculateCountdown(adjustedCurrentTime)
      }, 1000)
    }

    const calculateCountdown = (currentTime) => {
      const targetDate = new Date(props.targetDateTime)
      const distance = targetDate - currentTime
      if (distance <= 0) {
        isBlocked.value = false
        clearInterval(intervalInstance)
      } else {
        isBlocked.value = true
      }

      days.value = ~~(distance / (1000 * 60 * 60 * 24))
      hours.value = ~~((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      minutes.value = ~~((distance % (1000 * 60 * 60)) / (1000 * 60))
      seconds.value = ~~((distance % (1000 * 60)) / 1000)
    }
    const animateValue = (currentValue, previousValue, animationClassRef) => {
      if (currentValue !== previousValue) {
        animationClassRef.value = "animate__animated animate__bounce";
        setTimeout(() => {
          animationClassRef.value = "";
        }, 700);
      }
    }
    watch(days, (newValue) => {
      animateValue(newValue % 10, prevDays.value % 10, daysAnimationClass);
      animateValue(Math.floor(newValue / 10), Math.floor(prevDays.value / 10), daysTensAnimationClass);
      prevDays.value = newValue;
    });
    watch(hours, (newValue) => {
      animateValue(newValue % 10, prevHours.value % 10, hoursAnimationClass);
      animateValue(Math.floor(newValue / 10), Math.floor(prevHours.value / 10), hoursTensAnimationClass);
      prevHours.value = newValue;
    });
    watch(minutes, (newValue) => {
      animateValue(newValue % 10, prevMinutes.value % 10, minutesAnimationClass);
      animateValue(Math.floor(newValue / 10), Math.floor(prevMinutes.value / 10), minutesTensAnimationClass);
      prevMinutes.value = newValue;
    });
    watch(seconds, (newValue) => {
      animateValue(newValue % 10, prevSeconds.value % 10, secondsAnimationClass);
      animateValue(Math.floor(newValue / 10), Math.floor(prevSeconds.value / 10), secondsTensAnimationClass);
      prevSeconds.value = newValue;
    });
    onMounted(() => {
      fetchTime()  // Solo inicializas startInterval una vez que fetchTime ha sido exitoso.
    })
    return {
      isBlocked,
      days,
      hours,
      minutes,
      seconds,
      daysAnimationClass,
      daysTensAnimationClass,
      hoursAnimationClass,
      hoursTensAnimationClass,
      minutesAnimationClass,
      minutesTensAnimationClass,
      secondsAnimationClass,
      secondsTensAnimationClass
    }
  }
});
</script>
