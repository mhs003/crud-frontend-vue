<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircleIcon } from "lucide-vue-next";
import { Alert, AlertTitle } from "@/components/ui/alert";

import { ref } from "vue";
import api from "@/api/axios";

interface Props {
    task_id: number | null;
    modelValue: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue", "deleted"]);

const loading = ref(false);
const error = ref("");

async function deleteTask() {
    if (!props.task_id) return;

    loading.value = true;
    error.value = "";

    try {
        await api.delete(`/tasks/${props.task_id}`);

        emit("deleted", props.task_id);

        // close dialog
        emit("update:modelValue", false);
    } catch (err: any) {
        error.value = err.response?.data?.message || "Failed to delete task";
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <AlertDialog
        :open="props.modelValue"
        @update:open="emit('update:modelValue', $event)"
    >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle> Delete this task? </AlertDialogTitle>
                <AlertDialogDescription>
                    This cannot be undone. It will permanently remove the task.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <Alert v-if="error" variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>{{ error }}</AlertTitle>
            </Alert>

            <AlertDialogFooter>
                <AlertDialogCancel :disabled="loading">
                    Cancel
                </AlertDialogCancel>

                <AlertDialogAction :disabled="loading" @click="deleteTask">
                    {{ loading ? "Deleting..." : "Continue" }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
