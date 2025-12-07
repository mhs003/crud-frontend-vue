<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const email = ref("");
const password = ref("");
const router = useRouter();

function login() {
    console.log(email.value, password.value);
    router.push("/tasks");
}
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <Card class="w-[400px] p-6">
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
                    <Button type="submit" class="w-full">Login</Button>
                </form>
            </CardContent>
        </Card>
    </div>
</template>
