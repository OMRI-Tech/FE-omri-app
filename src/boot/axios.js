import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage } from 'quasar'

const api = axios.create({ baseURL: process.env.baseURL })

axios.defaults.baseURL = process.env.baseURL
if (LocalStorage.getItem('api_token')) axios.defaults.headers.common.Authorization = 'Bearer ' + LocalStorage.getItem('api_token')

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
