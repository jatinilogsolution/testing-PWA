<script setup lang="ts">
import Header from '@/components/Header.vue';
import Searchable from '@/components/Searchable.vue';
import { ref } from 'vue';
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import { CalendarIcon, FileSignatureIcon, FileTextIcon, ShoppingCartIcon } from 'lucide-vue-next';
import ASNDialog from '@/components/modals/ASNDialog.vue';
import { useAsnDetailsStore } from '@/store/asnScanStore';
import { ASNScanDataProps } from '@/types';

const searchAsn = ref<any>();
const currentPage = ref(1);
const perPage = ref(5);

const asnStore = useAsnDetailsStore()




const handlePageChange = (pageNo: number) => {
  currentPage.value = pageNo;
  asnStore.fetchASN({
    searchAsn: searchAsn.value,
    currentPage: currentPage.value,
    page: perPage.value,
  })
}
const fetchData = () => {
  asnStore.fetchASN({
    searchAsn: searchAsn.value,
    currentPage: currentPage.value,
    page: perPage.value,
  })
}


const siblingCount = 1;

const isDialogOpen = ref(false);


const handleASNCard = (item: ASNScanDataProps) => {
  console.log("this is item", item);
  asnStore.setAsnNo(item)
  isDialogOpen.value = true;
}


</script>

<template>
  <div class="sticky w-full top-0">
    <Header back-button title="ASN Scan" />
    <Searchable :scan="false" label="Search ASN" v-model="searchAsn" :on-change="fetchData" />
  </div>


  <div v-if="asnStore.data.length === 0" class="flex flex-wrap gap-2">
    <div class="flex items-center w-full justify-center text-lg text-gray-600">
      No ASN found. Please try to scan
    </div>
  </div>

  <div v-else class="flex flex-col px-2 justify-center gap-2 mt-2">
    <div @click="handleASNCard(item)" v-for="item in asnStore.data" :key="item.ASN_NO"
      class="border-2 cursor-pointer rounded-md p-2">
      <h2 class="text-center text-green-600">{{ item.ASN_NO }}</h2>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <FileTextIcon class="icons" />
          <span class="font-semibold">Invoice No:</span>
        </span>
        {{ item.InvoiceNO }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <ShoppingCartIcon class="icons" />
          <span class="font-semibold">PO NO:</span>
        </span>
        {{ item.PONO }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <CalendarIcon class="icons" />
          <span class="font-semibold">ASN Qty:</span>
        </span>
        {{ item.ASNQTY }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <FileSignatureIcon class="icons" />
          <span class="font-semibold">Scan Qty:</span>
        </span>
        {{ item.ScanQty }}
      </p>


    </div>

    <div :class="asnStore.data.length == 0 ? 'hidden' : 'flex items-center mb-2 justify-center'">
      <Pagination v-slot="{ page }" :items-per-page="perPage" :total="asnStore.totalItems" :sibling-count="siblingCount"
        show-edges :default-page="1">
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />
          <template v-for="(item, index) in items" :key="index">
            <PaginationListItem v-if="item.type === 'page'" :value="item.value">
              <Button @click="handlePageChange(item.value)" class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'">
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </div>

  <Teleport to="body">
    <ASNDialog v-model:isOpen="isDialogOpen" />
  </Teleport>
</template>

<style scoped>
.icons {
  @apply w-4 h-4 text-blue-500
}
</style>