<script setup lang="ts">
import { ref } from "vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardTask from "@/components/card-task.vue";
import CreateTaskDialog from "@/components/create-task-dialog.vue";
import DeleteConfirmDialog from "@/components/delete-confirm-dialog.vue";
import EditTaskDialog from "@/components/edit-task-dialog.vue";

import { onMounted } from "vue";
import api from "@/api/axios";
import type { ITask } from "@/interfaces";

const selectedTask = ref<ITask | null>(null);
const tasks = ref<ITask[]>([]);
const loading = ref(true);
const error = ref("");

async function fetchTasks() {
    loading.value = true;
    error.value = "";

    try {
        const res = await api.get("/tasks");
        tasks.value = res.data.data || res.data;
    } catch (err: any) {
        error.value = err.response?.data?.message || "Failed to load tasks";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchTasks();
});

const editModalOpen = ref(false);
const deleteAlertOpen = ref(false);

const onClickEditListener = (id: number) => {
    editModalOpen.value = true;
    selectedTask.value = tasks.value.find((e) => e.id === id) ?? null;
};

const onClickDeleteListener = (id: number) => {
    deleteAlertOpen.value = true;
    selectedTask.value = tasks.value.find((e) => e.id === id) ?? null;
};

const onClickCompleteListener = async (id: number) => {
    const task = tasks.value.find((t) => t.id === id);
    if (!task) return;

    const oldStatus = task.status;
    task.status = "complete";

    try {
        await api.put(`/tasks/${id}`, { status: "complete" });
    } catch (err) {
        // rollback if API fails
        task.status = oldStatus;
        console.error("Failed to update task status");
    }
};
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="flex w-full max-w-5xl flex-col gap-2">
            <Tabs default-value="pending">
                <div class="flex justify-between items-center">
                    <TabsList>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="complete">Complete</TabsTrigger>
                    </TabsList>
                    <CreateTaskDialog @created="fetchTasks" />
                </div>
                <TabsContent value="pending">
                    <Card class="gap-3 bg-muted/10">
                        <CardHeader>
                            <CardTitle>Pending Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea class="h-128 w-full">
                                <p
                                    v-if="loading"
                                    class="text-center text-sm py-4"
                                >
                                    Loading...
                                </p>

                                <p
                                    v-if="error"
                                    class="text-center text-red-500 py-2"
                                >
                                    {{ error }}
                                </p>

                                <div
                                    v-if="!loading"
                                    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
                                >
                                    <CardTask
                                        v-for="task in tasks.filter(
                                            (t) => t.status === 'pending'
                                        )"
                                        :key="task.id"
                                        :title="task.title"
                                        :description="task.description"
                                        :onClickComplete="
                                            () =>
                                                onClickCompleteListener(task.id)
                                        "
                                        :onClickEdit="
                                            () => onClickEditListener(task.id)
                                        "
                                        :onClickDelete="
                                            () => onClickDeleteListener(task.id)
                                        "
                                    ></CardTask>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="complete">
                    <Card class="gap-3 bg-muted/10">
                        <CardHeader>
                            <CardTitle>Completed Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea class="h-128 w-full">
                                <p
                                    v-if="loading"
                                    class="text-center text-sm py-4"
                                >
                                    Loading...
                                </p>

                                <p
                                    v-if="error"
                                    class="text-center text-red-500 py-2"
                                >
                                    {{ error }}
                                </p>

                                <div
                                    v-if="!loading"
                                    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
                                >
                                    <CardTask
                                        v-for="task in tasks.filter(
                                            (t) => t.status === 'complete'
                                        )"
                                        :key="task.id"
                                        :title="task.title"
                                        :description="task.description"
                                        :no_complete="true"
                                        :onClickEdit="
                                            () => onClickEditListener(task.id)
                                        "
                                        :onClickDelete="
                                            () => onClickDeleteListener(task.id)
                                        "
                                    ></CardTask>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>

    <!-- Edit Dialog -->
    <EditTaskDialog
        v-model="editModalOpen"
        :task="selectedTask"
        @updated="fetchTasks()"
    />

    <!-- Delete Task Alert Dialog -->
    <DeleteConfirmDialog
        v-model="deleteAlertOpen"
        :task_id="selectedTask?.id ?? null"
        @deleted="fetchTasks()"
    />
</template>
