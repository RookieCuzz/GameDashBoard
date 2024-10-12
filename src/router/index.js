import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import Login from "@/components/Login.vue";
import Forum from "@/components/Forum.vue";
import Void from "@/components/Void.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Void
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/login',
        name: 'LoginRegister',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 模式
    routes
});

export default router;
