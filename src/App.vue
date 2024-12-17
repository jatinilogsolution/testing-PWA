<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "@/components/ui/toast";
</script>

<template>
  <div class="">
    <RouterView />
    <Toaster class="absolute bottom-9" />
  </div>
</template>

<style scoped></style>
