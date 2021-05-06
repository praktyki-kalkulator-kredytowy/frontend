import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import TestPage from '../views/HarmonogramPage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/harmonogram',
        name: 'harmonogram',
        component: TestPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router