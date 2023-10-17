import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from './store'

const routes = [
  { path: '/', name: '/', component: () => import('./pages/tcp.vue') },
  { path: '/tcp', name: 'tcp', component: () => import('./pages/tcp.vue') },
  { path: '/serialport', name: 'serialport', component: () => import('./pages/serialport.vue') },
  {
    path: '/404',
    name: 'notFound',
    label: 'notFound',
    component: () => import('./pages/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    label: 'notFound',
    component: () => import('./pages/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  useStore.currentRoute = to.path
  next()
})

export default router
