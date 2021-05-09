import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Harmonogram from '../views/Harmonogram'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/harmonogram',
        name: 'harmonogram',
        component: Harmonogram
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router