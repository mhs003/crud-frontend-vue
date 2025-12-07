<script setup lang="ts">
import { ref } from "vue";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import CardTask from "@/components/card-task.vue";
import CreateTaskDialog from "@/components/create-task-dialog.vue";

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

const editModalOpen = ref(false);
const deleteAlertOpen = ref(false);

const onClickEditListener = () => {
    editModalOpen.value = true;
};

const onClickDeleteListener = () => {
    deleteAlertOpen.value = true;
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
                    <CreateTaskDialog />
                </div>
                <TabsContent value="pending">
                    <Card class="gap-3 bg-muted/10">
                        <CardHeader>
                            <CardTitle>Pending Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea class="h-128 w-full">
                                <div
                                    class="grid grid-cols-1 lg:grid-cols-2 gap-4"
                                >
                                    <CardTask
                                        :title="'Task 1'"
                                        :description="'lorem ipsome dolor'"
                                        :onClickEdit="
                                            () =>
                                                onClickEditListener(/* pass id */)
                                        "
                                        :onClickDelete="onClickDeleteListener"
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
                                <!-- content -->
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>

    <!-- Edit Dialog -->
    <Dialog v-model:open="editModalOpen">
        <form>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle class="mb-2">Update Task</DialogTitle>
                </DialogHeader>
                <div class="grid gap-4">
                    <div class="grid gap-3">
                        <Label for="title">Title</Label>
                        <Input id="title" name="title" />
                    </div>
                    <div class="grid gap-3">
                        <Label for="description">Description</Label>
                        <Textarea id="description" name="description" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline"> Cancel </Button>
                    </DialogClose>
                    <Button type="submit"> Create </Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>

    <!-- Delete Task Alert Dialog -->
    <AlertDialog v-model:open="deleteAlertOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle
                    >Are you sure want to delete this task?</AlertDialogTitle
                >
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your the task from the server.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
