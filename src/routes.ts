import { createRouter, createWebHistory, } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const Pocetna = () => import('@/views/Pocetna.vue')
const ONama = () => import('@/views/ONama.vue')
const Kontakt = () => import('@/views/Kontakt.vue')
const Clanovi = () => import('@/views/clanovi/Clanovi.vue')
const ClanPregled = () => import('@/views/clanovi/ClanoviPregled.vue')
const ClanForma = () => import('@/views/clanovi/ClanForma.vue')
const Treneri = () => import('@/views/treneri/Treneri.vue')
const TreneriForma = () => import('@/views/treneri/TreneriForma.vue')
const TreneriPregled = () => import('@/views/treneri/TreneriPregled.vue')
const Treninzi = () => import('@/views/treninzi/Treninzi.vue')
const TreningForma = () => import('@/views/treninzi/TreningForma.vue')
const Clanarine = () => import('@/views/clanarine/Clanarine.vue')
const ClanarinaForma = () => import('@/views/clanarine/ClanarinaForma.vue')

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Početna',
        component: Pocetna,
    },
    {
        path: '/o-nama',
        name: 'ONama',
        component: ONama,
    },
    {
        path: '/kontakt',
        name: 'Kontakt',
        component: Kontakt,
    },
    {
        path: '/clanovi',
        component: Clanovi
    },
    {
        path: '/clanovi/:id',
        component: ClanPregled
    },
    {
        path: '/clanovi/:id/uredi',
        component: ClanForma
    },
    {
        path: '/clanovi/dodaj',
        component: ClanForma
    },
    {
        path: '/treneri',
        component: Treneri
    },
    {
        path: '/treneri/dodaj',
        component: TreneriForma
    },
    {
        path: '/treneri/:id',
        component: TreneriPregled
    },
    {
        path: '/treneri/:id/uredi',
        component: TreneriForma
    },
    {
        path: '/treninzi',
        component: Treninzi
    },
    {
        path: '/treninzi/dodaj',
        component: TreningForma
    },
    {
        path: '/treninzi/:id/uredi',
        component: TreningForma
    },
    {
        path: '/clanarine',
        component: Clanarine
    },
    {
        path: '/clanarine/dodaj',
        component: ClanarinaForma
    },
    {
        path: '/clanarine/:id/uredi',
        component: ClanarinaForma
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router