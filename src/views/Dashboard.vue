<template>
  <div v-if="!modalOpen">
    <SwitchMenu on-where isRef="dashboard" />
  </div>

  <Header title="Home" />

  <div class=" flex flex-wrap  gap-4  px-2.5 py-4 ">
    <router-link :to="{ name: 'Inbound' }" class="NextCardCss">

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#4E9F3D" stroke-width="2"
        class="size-10">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
      </svg>

      <span class="label-color mt-2">Inbound</span>
    </router-link>
    <router-link :to="{ name: 'Outbound' }" class="NextCardCss">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" width="48" height="48"
        stroke="#12ddf0" class="size-10">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
      </svg>

      <span class="label-color mt-2">Outbound</span>
    </router-link>
    <router-link :to="{ name: 'Inventory' }" class="NextCardCss">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" viewBox="0 0 24 24" stroke="#2F58CD"
        stroke-width="2" class="size-10">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
      </svg>

      <span class="label-color mt-2">Inventory</span>
    </router-link>
  </div>


</template>

<script setup lang="ts">


import Header from "@/components/Header.vue";
import SwitchMenu from "@/components/switch-menu.vue";
import { ref } from "vue";

const modalOpen = ref(sessionStorage.getItem("clientId"));

</script>
