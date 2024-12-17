
<template>
  <div class="sticky w-full top-0">
    <Header back-button title="Receiving" />

    <Searchable :scan="scaningStore.scaning" label="Search ASN" v-model="searchAsn" :on-change="fetchData" />

   </div>

  <div v-if="data.length === 0" class="flex flex-wrap gap-2">
    <div class="flex items-center w-full justify-center text-lg text-gray-600">
      No ASN found. Please try to scan
    </div>
  </div>

  <div v-else class="flex flex-col px-2 justify-center gap-2 mt-2">
    <div @click="handleASNCard(item)" v-for="item in data" :key="item.ASN_No"
      class="border-2 cursor-pointer rounded-md p-2">
      <h2 class="text-center text-green-600">{{ item.ASN_No }}</h2>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <FileTextIcon class="icons" />
          <span class="font-semibold">Invoice No:</span>
        </span>
        {{ item.InvoiceNo }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <FileSignatureIcon class="icons" />
          <span class="font-semibold">Vendor Invoice:</span>
        </span>
        {{ item.VendorInvoice }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <CalendarIcon class="icons" />
          <span class="font-semibold">Invoice Date:</span>
        </span>
        {{ item.InvoiceDate }}
      </p>
      <p class="flex text-sm gap-3 items-center">
        <span class="flex gap-x-1 items-center">
          <ShoppingCartIcon class="icons" />
          <span class="font-semibold">PO NO:</span>
        </span>
        {{ item.PONO || 'N/A' }}
      </p>
    </div>

    <div :class="data.length == 0 ? 'hidden' : 'flex items-center justify-center'">
      <Pagination v-slot="{ page }" :items-per-page="perPage" :total="totalItems" :sibling-count="siblingCount"
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
    <UploadRecevingDialog v-model:isOpen="isDialogOpen" :asnData="selectedASN" />
  </Teleport>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
 import { ref, watch } from 'vue';
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

import axiosClient from '@/action/api';
import { CalendarIcon, FileSignatureIcon, FileTextIcon, ShoppingCartIcon } from 'lucide-vue-next';
import UploadRecevingDialog from '@/components/UploadRecevingDialog.vue';
import { useScaningMode } from '@/store/loaderStore';
import { useToast } from '@/components/ui/toast';
import Searchable from '@/components/Searchable.vue';

const searchAsn = ref();
let timeout: ReturnType<typeof setTimeout> | null = null;
watch(searchAsn, (newValue) => {
  if (timeout) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(async () => {
    if (newValue.trim()) {
      try {
        fetchData()
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  }, 200);
})

const currentPage = ref(1);
const perPage = ref(5);
const totalItems = ref();
const data = ref<any>([]);
const userType: string | null = sessionStorage.getItem("userType");

const warehouseId = ref();
if (userType == "admin") {
  warehouseId.value = sessionStorage.getItem("warehouseId");
} else {
  warehouseId.value = sessionStorage.getItem("userWarehouseId");
}

const {toast} = useToast()
const fetchData = async () => {
  const params = {
    warehouseId: warehouseId.value,
    clientId: sessionStorage.getItem("clientId"),
    UserId: sessionStorage.getItem("userId"),
    searchScanValue: searchAsn.value,
    page: currentPage.value,
    per_page: perPage.value,
  };

  try {
    const response = await axiosClient.get("/asn-search-images", { params });
    if (response.data && response.data.data) {
      data.value = response.data.data;
      totalItems.value = response.data.total;
    }
    else{
      searchAsn.value = null
      toast({
        title:"Something went wrong",
        variant:"destructive"
      })
    }
  } catch (error) {
   
    console.error("Error fetching data", error);
    data.value = [];
  }
};

const handlePageChange = (pageNo: number) => {
  currentPage.value = pageNo;
  fetchData();
}

const siblingCount = 1;

const isDialogOpen = ref(false);
const selectedASN = ref();

const handleASNCard = (item: any) => {
  selectedASN.value = item;
  isDialogOpen.value = true;
}
const scaningStore = useScaningMode()

</script>

<style scoped>
.icons {
  @apply w-4 h-4 text-blue-500
}
</style>