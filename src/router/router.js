import { createRouter,createWebHistory } from 'vue-router'
import Main from '@/pages/Main'
import UserPage from '@/pages/UserPage'


const routes = [
    {
        path:'/',
        component: Main,
    },
    {
        path:'/user/:id',
        name: 'UserPage',
        component: UserPage,
        
    },
]


const router = createRouter({
    routes,
    history:createWebHistory(process.env.BASE_URL)
})

export default router;