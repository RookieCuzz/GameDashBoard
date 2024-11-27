import { createRouter, createWebHistory } from 'vue-router';
import App from "@/App.vue";
import Login from "@/components/Login.vue";
import Forum from "@/components/Forum/List.vue";
import Home from "@/components/NewSection.vue";
import Page from "@/components/Pagination.vue";
import ForumContent from "@/components/Forum/Content.vue";
import Fpage from "@/components/Forum/Page.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/forum',
        name: 'Forum',
        component: Forum
    },
    {
        path: '/forump',
        name: 'Fpage',
        component: Fpage
    },
    {
        path: '/forum/content/:forum_id',
        name: 'ForumContent',
        component: ForumContent,
        props: true
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
