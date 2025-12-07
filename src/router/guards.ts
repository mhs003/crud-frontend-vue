import type { Router } from "vue-router";

export function setupGuards(router: Router) {
    router.beforeEach((to, _from, next) => {
        const token = localStorage.getItem("token");
        if (to.path !== "/login" && !token) return next("/login"); // redirect to login page when current path is not login neither a token is present
        if (to.path === "/login" && token) return next("/tasks"); // redirect to tasks when both token is present and trying to browse login route
        next();
    });
}
