import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import HarmonogramPage from '../views/HarmonogramPage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/harmonogram',
        name: 'harmonogram',
        component: HarmonogramPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router