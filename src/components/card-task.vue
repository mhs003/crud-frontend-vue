<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { CircleCheck, Pencil, Trash2 } from "lucide-vue-next";

interface Props {
    title: string;
    description?: string;
    onClickComplete?: () => void;
    onClickEdit?: () => void;
    onClickDelete?: () => void;
}

const props = defineProps<Props>();
</script>

<template>
    <div
        class="grid grid-cols-[1fr_auto] gap-5 p-4 rounded-lg shadow-lg transition-shadow hover:shadow-xl border border-border/60"
    >
        <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground break-all">
                {{ props.title }}
            </h3>
            <div class="text-sm">
                {{ props.description }}
            </div>
        </div>
        <div class="grid grid-cols-1 gap-1">
            <Button
                size="icon-sm"
                variant="outline"
                class="cursor-pointer"
                @click="props.onClickComplete"
            >
                <CircleCheck />
            </Button>
            <Button
                size="icon-sm"
                variant="outline"
                class="cursor-pointer"
                @click="props.onClickEdit"
            >
                <Pencil />
            </Button>
            <Button
                size="icon-sm"
                variant="outline"
                class="cursor-pointer"
                @click="props.onClickDelete"
            >
                <Trash2 />
            </Button>
        </div>
    </div>
</template>
