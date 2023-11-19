import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'

// NOTE: Lazy-loading can be implemented for route components as the application grows.

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: MainView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
