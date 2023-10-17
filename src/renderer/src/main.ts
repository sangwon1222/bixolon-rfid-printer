import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/styles.less'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.use(Vue3Toastify, {
  position: 'top-center',
  autoClose: 500,
  pauseOnHover: true,
  hideProgressBar: true,
  transition: 'flip',
  closeOnClick: true,
  theme: 'colored'
} as ToastContainerOptions)
app.use(router)
app.mount('#app')
