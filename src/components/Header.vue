<template>
    <div :class="props.backButton ? ' justify-between' : 'justify-center'"
        class="w-full items-center flex px-4 py-1.5 md:py-4 text-xl bg-background shadow-lg font-semibold text-nowrap border">
        <span class="text-foreground">
            {{ props.title }}
        </span>
        <Button v-if="props.backButton" @click="$router.back()" class=" text-foreground" variant="link"> Back </Button>
    </div>
</template>

<script setup lang="ts">
import Button from './ui/button/Button.vue';


const props = defineProps<{
    title: string;
    backButton?: boolean | false;
}>();
</script>