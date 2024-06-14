import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('src/layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('src/pages/Main.vue'),
            },
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/ErrorNotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router