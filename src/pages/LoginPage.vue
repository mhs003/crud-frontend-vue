<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-vue-next";
import { Alert, AlertTitle } from "@/components/ui/alert";
import api from "@/api/axios";
import { useAuth } from "@/composables/useAuth";

const { login: afterLogin } = useAuth();

const email = ref("");
const password = ref("");
const router = useRouter();
const loading = ref(false);
const error = ref("");

async function login() {
    loading.value = true;
    error.value = "";

    try {
        const response = await api.post("/login", {
            email: email.value,
            password: password.value,
        });

        afterLogin(response.data.token);
        router.push("/tasks");
    } catch (err: any) {
        error.value = err.response?.data?.message || "Login failed";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <Card class="w-[400px] p-6 bg-muted/10">
            <CardTitle class="text-center text-2xl">Login</CardTitle>
            <CardContent>
                <form @submit.prevent="login">
                    <Input
                        v-model="email"
                        placeholder="Email"
                        type="email"
                        class="mb-4"
                    />
                    <Input
                        v-model="password"
                        placeholder="Password"
                        type="password"
                        class="mb-4"
                    />
                    <Button type="submit" class="w-full" :disabled="loading">
                        {{ loading ? "Logging in..." : "Login" }}
                    </Button>
                </form>
                <Alert v-if="error" class="mt-4" variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{{ error }}</AlertTitle>
                </Alert>
            </CardContent>
        </Card>
    </div>
</template>
