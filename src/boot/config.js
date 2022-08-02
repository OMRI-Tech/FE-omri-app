import { LocalStorage } from 'quasar'
import axios from 'axios'

/**
 * Begin axios configuration
 */

axios.defaults.baseURL = process.env.baseURL
if (LocalStorage.getItem('api_token')) axios.defaults.headers.common.Authorization = 'Bearer ' + LocalStorage.getItem('api_token')

/**
 * End axios configuration
 */
