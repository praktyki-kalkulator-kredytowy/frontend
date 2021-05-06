import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import TestPage from '../views/TestPage'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/testpage',
        name: 'TestPage',
        component: TestPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router