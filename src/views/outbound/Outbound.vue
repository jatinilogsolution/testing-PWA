<template>
    <Header back-button title="Outbound" />

    <div class=" flex flex-wrap  gap-4  px-2.5 py-4 ">
        <router-link :to="{ name: 'PickList' }" class="NextCardCss">
            <ListCheck color="green" :size="40" />
            <span class="label-color mt-2">Pick List</span>
        </router-link>
        <router-link :to="{ name: 'DocUpload' }" class="NextCardCss">
            <FileStack color="blue " :size="40" />
            <span class="label-color mt-2">Documnet Upload</span>
        </router-link>
        <router-link :to="{ name: 'VehicleOutUpload' }" class="NextCardCss">


            <BusFront color="yellow " :size="40" />
            <span class="label-color mt-2">Vechile Out Upload</span>
        </router-link>

    </div>
</template>

<script setup lang="ts">
import { BusFront, FileStack, ListCheck } from 'lucide-vue-next';
import Header from "@/components/Header.vue"
</script>
