import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
import Harmonogram from '../views/Harmonogram'
import UserConfig from '../views/UserConfig'
import Audit from '../views/Audit'
import AuditDetails from '../views/AuditDetails'
import AuditHome from '../views/AuditHome'
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
    },
    {
        path: '/audit',
        name: 'audit',
        component: Audit,
        children: [
            { path: '', component: AuditHome },
            { path: 'details/:index', component: AuditDetails }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router