<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-vue-next";
import { onMounted, watch } from "vue";

const props = defineProps<{
    label: string;
    onChange: () => void;
    scan: boolean;
    isDisabled?: boolean;
}>();

const model = defineModel<any>();

 watch(
    () => props.scan,
    (newVal) => {
        if (newVal) {
              document.getElementById("search")?.focus();
        }
    },

);

onMounted(() => {
    if (props.scan) {
        document.getElementById("search")?.focus();
    }
});

// Debounce function implementation
function debounce<F extends (...args: any[]) => any>(
    func: F,
    delay: number
): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<F>) => {
        // Clear previous timeout
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

         timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

 const debouncedOnChange = debounce(() => {
    props.onChange();
}, 500);

 const handleScanChange = () => {
    if (props.scan) {
        debouncedOnChange();
    }
};

 const handleButtonClick = () => {
    if (!props.scan) {
        props.onChange();
    }
};
</script>

<template>
    <div class="flex border-b px-2 bg-background w-full items-center rounded-lg gap-1.5 py-2">
         <Input v-if="props.scan" :disabled="isDisabled" :autofocus="props.scan" @input="handleScanChange" autocomplete="off"
            class="border border-border bg-input" id="search" type="search" v-model="model"
            :placeholder="props.label" />

         <Input v-else autocomplete="off" :disabled="isDisabled" class="border border-border bg-input" id="search" type="search" v-model="model"
            :placeholder="props.label" />

         <Button v-if="!props.scan" @click="handleButtonClick" type="button" class="p-5" variant="outline" size="icon">
            <Search />
        </Button>
    </div>
</template>
