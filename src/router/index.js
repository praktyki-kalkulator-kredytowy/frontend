import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Harmonogram from '../views/Harmonogram'
import UserConfig from '../views/UserConfig'

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
    },
    {
        path: '/config',
        name: 'config',
        component: UserConfig
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router