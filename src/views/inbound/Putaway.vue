<script setup lang="ts">
import Header from '@/components/Header.vue';
import Searchable from '@/components/Searchable.vue';
import { ref } from 'vue';
 

import { CalendarIcon, FileTextIcon, ShoppingCartIcon } from 'lucide-vue-next';
import { fetchMRNInvoice } from '@/action/putawayAction';
import { usePutawayStore } from '@/store/putAwayStore';
import { useRouter } from 'vue-router';

const searchMRN = ref<any>();
const mrnData = ref<any[]>([])
const putAwayStore = usePutawayStore()

const fetchData = () => {
  fetchMRNInvoice({
    mrnInvoice: searchMRN.value
  }).then((response) => {
    mrnData.value = []
    mrnData.value = response;
  }).catch((err: any) => {
    console.log(err);
    searchMRN.value = null;
    mrnData.value = [];

  })
}



const router = useRouter()

const handleMRNCard = (item: any) => {

  putAwayStore.setMRN(item);

  router.push({
    name: "PutAwayChild",
    params: { id: item.MRNNo },
    query: {}
  });
}



</script>

<template>
  <div class="sticky w-full top-0">
    <Header back-button title="PUT AWAY" />
    <Searchable :scan="false" label="Search MRN invoice" v-model="searchMRN" :on-change="fetchData" />
  </div>

  <div v-if="mrnData.length == 0" class="flex flex-wrap gap-2">
    <div class="flex items-center w-full justify-center text-lg text-gray-600">
      No MRN found. Please try to scan
    </div>
  </div>

  <div v-else class="flex flex-col px-2 justify-center gap-2 mt-2">
    <div @click="handleMRNCard(item)" v-for="item in mrnData" :key="item.MRNNo"
      class="border-2 cursor-pointer rounded-md p-2">
      <h2 class="text-center  text-green-600">{{ item.MRNNo }}</h2>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center  ">
          <CalendarIcon class="icons" />
          <span class="font-semibold text-nowrap">Party Name:</span>
        </span>
        <span class=" truncate  w-full">

          {{ item.PartyName }}
        </span>
      </p>

      <p class="flex text-sm gap-3 items-center">

        <span class="flex gap-x-1 items-center">
          <FileTextIcon class="icons" />
          <span class="font-semibold">Invoice No:</span>
        </span>
        {{ item.Invoice }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <ShoppingCartIcon class="icons" />
          <span class="font-semibold">MRN Date:</span>
        </span>
        {{ item.MRNOn }}
      </p>



    </div>
 
  </div>

</template>

<style scoped>
.icons {
  @apply w-4 h-4 text-blue-500
}
</style>