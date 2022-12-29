const routes = [
  {
    path: '/register',
    component: () => import('pages/Auth/Register.vue'),
    name: 'Register',
    meta: { type: 'auth' }
  },
  {
    path: '/login',
    component: () => import('pages/Auth/Login.vue'),
    name: 'Login',
    meta: { type: 'auth' }
  },
  {
    path: '/',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      {
        path: 'menu',
        component: () => import('pages/Menu.vue'),
        name: 'Home',
        meta: { auth: true }
      },
      {
        path: 'profile',
        component: () => import('pages/Profile.vue'),
        name: 'Profile',
        meta: { auth: true }
      },
      {
        path: 'minijuegos',
        component: () => import('pages/MiniJuegos.vue'),
        name: 'MiniGames',
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/lessons',
    component: () => import('layouts/LessonLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LessonEmpty.vue'),
        name: 'LessonEmpty',
        meta: { auth: true }
      },
      {
        path: ':topic/:section/:lesson',
        component: () => import('pages/Lessons/Index.vue'),
        name: 'Lesson',
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/quiz',
    component: () => import('layouts/QuizLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Quiz.vue'), name: 'Quiz', meta: { auth: true } }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },

]

export default routes
