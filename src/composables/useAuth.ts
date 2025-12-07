import { ref } from "vue";

const token = ref(localStorage.getItem("token"));

export function useAuth() {
    function login(newToken: string) {
        localStorage.setItem("token", newToken);
        token.value = newToken;
    }

    function logout() {
        localStorage.removeItem("token");
        token.value = null;
    }

    return { token, login, logout };
}
