<script setup lang="ts">
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-vue-next";
import { Alert, AlertTitle } from "@/components/ui/alert";
import type { ITask } from "@/interfaces";

import { ref, watch } from "vue";
import api from "@/api/axios";

interface Props {
    task: ITask | null;
    modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "updated"]);

const title = ref("");
const description = ref<string|undefined>("");
const loading = ref(false);
const error = ref("");

watch(
    () => props.task,
    (t) => {
        if (t) {
            title.value = t.title;
            description.value = t.description;
        }
    },
    { immediate: true }
);

async function updateTask() {
    if (!props.task) return;

    loading.value = true;
    error.value = "";

    try {
        await api.put(`/tasks/${props.task.id}`, {
            title: title.value,
            description: description.value,
        });

        emit("updated", props.task.id);

        emit("update:modelValue", false);
    } catch (err: any) {
        error.value = err.response?.data?.message || "Failed to update task";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <Dialog
        :open="props.modelValue"
        @update:open="emit('update:modelValue', $event)"
    >
        <DialogContent class="sm:max-w-[425px]">
            <form @submit.prevent="updateTask" class="grid w-full gap-4">
                <DialogHeader>
                    <DialogTitle class="mb-2">Update Task</DialogTitle>
                </DialogHeader>

                <div class="grid gap-4">
                    <div class="grid gap-3">
                        <Label for="title">Title</Label>
                        <Input id="title" name="title" v-model="title" />
                    </div>

                    <div class="grid gap-3">
                        <Label for="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            v-model="description"
                        />
                    </div>
                </div>

                <Alert v-if="error" variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{{ error }}</AlertTitle>
                </Alert>

                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline" :disabled="loading">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button type="submit" :disabled="loading">
                        {{ loading ? "Updating..." : "Update" }}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
