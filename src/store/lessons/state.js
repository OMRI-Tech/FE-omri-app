import WelcomeKarel1 from 'pages/Lessons/Karel/Welcome'
import notFound from 'pages/Error404.vue'

export default function () {
  return {
    karel: {
      welcome: [
        { title: 'Lección 1 de Karel', component: WelcomeKarel1 }
      ]
    },
    notFound: { title: 'Lección no encontrada', component: notFound }
  }
}
