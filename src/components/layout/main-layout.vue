<template>
  <div v-if="storeLoader.load"
    class=" absolute top-0 left-0 flex  filter backdrop-blur-sm items-center justify-center h-full w-full border ">
    <Loader class=" w-20 h-20 text-[blue]" :class="storeLoader.load && 'animate-spin'" />
  </div>
  <main class="relative flex flex-col h-dvh">
    <header class="sticky top-0 z-50 w-full py-5 bg-background  border-b border-gray-700 shadow-md ">
      <nav class="container mx-auto px-4 flex items-center justify-between">
        <img alt="logo" @click="()=> router.push('/dashboard')" src="https://www.vianaar.com/images-vianaar/logo.svg" class=" h-8 cursor-pointer" />

        <Switch aria-dropeffect="popup" class=" mr-8" :checked="scaningStore.scaning"
          @update:checked="scaningStore.handleScaning" />

        <Button @click="store.logout" size="icon" class=" bg-inherit">
          <LogOut class="scale-110 stroke-red-600 z-50" />
        </Button>

      </nav>
    </header>

    <ScrollArea class="flex-grow bg-slate-900/70">

      <router-view />
    </ScrollArea>

    <footer class="sticky bottom-0 z-50 w-full border-t border-gray-700 bg-background ">
      <nav class="  flex  items-center">
        <router-link to="/" class="flex px-4 py-3 w-full flex-col justify-center items-center">
          <HomeIcon class="h-6 w-6" />
          <span class="text-xs mt-1">Home</span>
        </router-link>
        <div class=" h-[8vh] border-l border-r"></div>
        <div class="flex flex-col justify-center w-full cursor-pointer items-center">

          <SwitchMenu class="" isRef="bottomnav" :is-open="false" refernce="switch" />
        </div>
      </nav>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { HomeIcon, LogOut, } from 'lucide-vue-next';
import ScrollArea from '../ui/scroll-area/ScrollArea.vue';
import Button from '../ui/button/Button.vue';
import { useAuthStore } from '@/store/authStore';
import { useLoaderStore, useScaningMode } from '@/store/loaderStore';
import SwitchMenu from '../switch-menu.vue';
import Switch from '../ui/switch/Switch.vue';
const storeLoader = useLoaderStore()
import {useRouter} from "vue-router"
 
const scaningStore = useScaningMode()
const store = useAuthStore()
const router = useRouter()


</script>

<style scoped>
.router-link-active {
  color: #3b82f6;
  /* Tailwind's blue-500 */
}
</style>