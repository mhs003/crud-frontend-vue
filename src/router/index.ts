import LoginPage from "@/pages/LoginPage.vue";
import TasksPage from "@/pages/TasksPage.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
    { path: "/login", component: LoginPage },
    { path: "/tasks", component: TasksPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
