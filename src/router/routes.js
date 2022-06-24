const routes = [
  { path: '/registrarse', component: () => import('pages/Register.vue'), name: 'Register', meta: { type: 'auth' } },
  {
    path: '/',
    component: () => import('layouts/MenuLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home', meta: { auth: true } },
      { path: 'menu', component: () => import('pages/Menu.vue'), name: 'Menu', meta: { auth: true } },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },

]

export default routes
