import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Photogallery from '../views/Photogallery.vue'
import Random from '../views/Random.vue'
import Info from '../views/Info.vue'



Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/categories',
        name: 'Photogallery',
        component: Photogallery
    },
    {
        path: '/random',
        name: 'Random',
        component: Random
    },
    {
        path: '/info/:desc/:name/:bio/:photo/:user',
        name: 'Info',
        component: Info
    }
]

const router = new VueRouter({
    routes
})

export default router

