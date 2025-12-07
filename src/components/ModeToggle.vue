<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/ui/button";

const mode = useColorMode({ disableTransition: false });
</script>

<template>
    <Button
        size="icon"
        variant="outline"
        @click="mode = mode === 'light' ? 'dark' : 'light'"
        class="rounded-full cursor-pointer absolute top-6 right-6"
    >
        <Icon
            icon="radix-icons:moon"
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
            icon="radix-icons:sun"
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
    </Button>
</template>
