const routes = [
  { path: '/registrarse', component: () => import('pages/Register.vue'), name: 'Register', meta: { type: 'auth' } },
  { path: '/login', component: () => import('pages/Login.vue'), name: 'Login', meta: { type: 'auth' } },
  {
    path: '/',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home', meta: { auth: true } },
      { path: 'menu', component: () => import('pages/Menu.vue'), name: 'Menu', meta: { auth: true } }
    ]
  },
  {
    path: '/lessons',
    component: () => import('layouts/LessonLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LessonEmpty.vue'), name: 'LessonEmpty', meta: { auth: true } },
      { path: ':topic/:section/:lesson', component: () => import('pages/Lessons/Index.vue'), name: 'Lesson', meta: { auth: true } }
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
