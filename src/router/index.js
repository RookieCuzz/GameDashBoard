import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import Login from "@/components/Login.vue";
import Forum from "@/components/Forum/List.vue";
import Home from "@/components/NewSection.vue";
import Page from "@/components/Pagination.vue";
import ForumContent from "@/components/Forum/Content.vue";
const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/',
        name: 'ForumContent',
        component: ForumContent
    },
    {
        path: '/page',
        name: 'Page',
        component: Page
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
