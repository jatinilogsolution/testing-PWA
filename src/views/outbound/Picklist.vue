<template>
    <div class="sticky w-full top-0 bg-background">
        <Header back-button title="Pick List" />
        <Searchable :scan="false" label="Search Pick List" v-model="searchPickList" :on-change="fetchData" />
    </div>




    <div v-if="pickListData?.data?.length == 0" class="flex flex-wrap gap-2">
        <div class="flex items-center w-full justify-center text-lg text-gray-600">
            No Pick List found. Please try to scan
        </div>
    </div>

    <div v-else class="flex flex-col px-2 justify-center gap-2 mt-2">
        <div @click="handlePickListCard(item)" v-for="item in pickListData?.data" :key="item.dnno"
            class="border-2 cursor-pointer rounded-md p-2">
            <h2 class="text-center  text-green-600">{{ item.dnno }}</h2>
            <p class="flex text-sm gap-3 items-center">
                <span class="flex gap-x-1 items-center  ">
                     <span class="font-semibold text-nowrap">Invoice No:</span>
                </span>
                <span class=" truncate  w-full">

                    {{ item.REF_NO }}
                </span>
            </p>

            <p class="flex text-sm gap-3 items-center">

                <span class="flex gap-x-1 items-center">
                     <span class="font-semibold">Customer:</span>
                </span>
                {{ item.custid }}
            </p>

            <p class="flex text-sm gap-3 items-center">
                <span class="flex gap-x-1 items-center">
                     <span class="font-semibold">Invoice Qty:</span>
                </span>
                {{ item.InvQty }}
            </p>
            <p class="flex text-sm gap-3 items-center">
                <span class="flex gap-x-1 items-center">
                     <span class="font-semibold">Pick Qty:</span>
                </span>
                {{ item.PickQTy }}
            </p>
        </div>
    </div>


    <div :class="pickListData?.length == 0 ? 'hidden' : 'flex items-center my-4    justify-center'">
        <Pagination v-slot="{ page }" :items-per-page="perPage" :total="pickListData?.total"
            :sibling-count="siblingCount" show-edges :default-page="1">
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



</template>

<script setup lang="ts">
import { fetchPickList } from '@/action/picklistAction';
import Header from '@/components/Header.vue';
import Searchable from '@/components/Searchable.vue';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationEllipsis, PaginationList, PaginationListItem, PaginationNext } from '@/components/ui/pagination';
import PaginationPrev from '@/components/ui/pagination/PaginationPrev.vue';
import { usePickListStore } from '@/store/PickList';
 
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchPickList = ref();

const pickListData = ref<any>([])
const perPage = ref(5);
const currentPage = ref(1);
const siblingCount = 1;
const pickListStore = usePickListStore()
const router = useRouter()
const fetchData = () => {

    fetchPickList({
        pickList: searchPickList.value,
        currentPage: currentPage.value,
        page: perPage.value
    }).then((response) => {
        if(response){


            pickListData.value = []
            pickListData.value = response;
        }else {
            searchPickList.value= null
            pickListData.value = []

        }


    }).catch((err: any) => {
        searchPickList.value= null
        console.log(err);
        searchPickList.value = null;
        pickListData.value = [];

    })
}

const handlePageChange = (pageNo: number) => {
    currentPage.value = pageNo;
    fetchPickList({
        pickList: searchPickList.value,
        currentPage: currentPage.value,
        page: perPage.value
    }).then((response) => {
        pickListData.value = []
        pickListData.value = response;
    }).catch((err: any) => {
        console.log(err);
        searchPickList.value = null;
        pickListData.value = [];

    })
}


const handlePickListCard = (item: any) => {
    pickListStore.setSelectedPickList(item)
    router.push({
    name: "PickListChild",
    params: { id: item.dnno },
    query: {}
  });
 }

</script>
