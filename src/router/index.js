import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { auth } from "boot/firebase";
import Store from 'src/store'

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER ? createMemoryHistory : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      Store().getters['auth/isLogged'] ? next() : next({ name: 'Login' })
    } else {
      if (to.matched.some(record => record.meta.type === 'auth')) {
        !Store().getters['auth/isLogged'] ? next() : next({ name: 'Home' })
      } else {
        if (to.fullPath === '/') next({ name: 'Home' })
        else next()
      }
    }
  })

  return Router
})
