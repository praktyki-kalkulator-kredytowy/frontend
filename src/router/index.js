import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import SchedulePage from '../views/SchedulePage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: SchedulePage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router