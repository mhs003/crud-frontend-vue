<script setup lang="ts">
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
</script>

<template>
    <Dialog>
        <form>
            <DialogTrigger as-child>
                <Button class="px-10 cursor-pointer" variant="outline">
                    <Plus />New
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle class="mb-2">Create a new Task</DialogTitle>
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
</template>
