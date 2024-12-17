<script setup lang="ts">
import { ref } from 'vue';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const props = defineProps<{
    label: string;
    isRequired?: boolean;
    setValue: (val: string, file: any) => void;
}>();

const img = ref<string | null>(null);
 
const emit = defineEmits(["update:modelValue"]);


const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        const file = target.files[0];
        img.value = URL.createObjectURL(file);
        props.setValue(img.value, file);
    } else {
        return;
    }
};



</script>

<template>
    <div class="w-full max-w-sm">

        <div class=" flex items-center justify-center gap-4 ">

            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label :for="props.label">{{ props.label }}</Label>

                <Input :id="props.label" type="file" accept="image/*" @change="onChange" />
            </div>

            <div v-if="img" class=" mt-4">
                <Dialog>
                    <DialogTrigger as-child>
                        <img :src="img"
                        alt="img"
                            class="h-10 w-12 border rounded-md object-cover ring active:ring-indigo-600 active:scale-95" />
                    </DialogTrigger>
                    <DialogContent
                        class="bg-transparent text-white filer flex flex-col gap-y-4 backdrop-blur-sm rounded-md border h-80">
                        <DialogHeader>
                            <DialogTitle>{{ props.label }}</DialogTitle>
                        </DialogHeader>

                        <AspectRatio :ratio="16 / 9" class="flex items-center justify-center max-h-60 min-w-60">
                            <img :src="img" alt="Image" class="  max-h-60 min-w-60 rounded-md object-contain" />
                        </AspectRatio>
                    </DialogContent>
                </Dialog>
            </div>
        </div>

    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 10px;
    border-radius: 8px;
}

.modal-img {
    max-width: 90vw;
    max-height: 90vh;
}
</style>
