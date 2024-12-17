<template>
    <Header back-button title="Rack List" />
    <div class="flex flex-col px-2 justify-center gap-2 mt-2">
        <div class="border-2  rounded-md p-2">
            <h2 class="text-center  text-green-600">{{ pickData.dnno }}</h2>
            <p class="flex text-sm gap-3 items-center px-4">
                <span class="flex gap-x-1 items-center  ">
                    <span class="font-semibold text-nowrap">Invoice No:</span>
                </span>
                <span class=" truncate  w-full">

                    {{ pickData.REF_NO }}
                </span>
            </p>

            <div class=" flex justify-between px-4 mt-2 pr-6">

                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Invoice Qty:</span>
                    </span>
                    {{ pickData.InvQty }}
                </p>
                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Pick Qty:</span>
                    </span>
                    {{ pickData.PickQTy }}
                </p>
            </div>
        </div>
    </div>


    <Searchable :scan="scaningStore.scaning" label="Search SKU" v-model="searchrackLocation" :on-change="fetchData" />



    <div v-if="!rackLocationData" class="flex flex-wrap gap-2">
        <div class="flex items-center w-full justify-center text-lg text-gray-600">
            No Rack Location Found
        </div>
    </div>

    <div class="flex flex-col px-2 justify-center gap-2 mt-2">
        <div v-for="(item, index) in rackLocationData?.data" :key="index" @click="handleSKUTableCard(item)"
            class="border-2  h-52 rounded-md p-2">

            <h2 class="text-center  text-green-600">{{ item.sku }}</h2>
            <p class="flex text-sm border-b border-t  gap-3 items-start px-4">
                <span class="flex gap-x-1 items-center  ">
                    <span class="font-semibold text-nowrap">Description:</span>
                </span>
                <span class="  text-gray-400  w-full">

                    {{ item.skudesc }}
                </span>
            </p>
            <p class="flex text-sm border-b gap-3 items-center px-4">
                <span class="flex gap-x-1 items-center  ">
                    <span class="font-semibold text-nowrap">Batch:</span>
                </span>
                <span class=" text-gray-400  w-full">

                    {{ item.batchno }}
                </span>
            </p>


            <div class="border-b flex justify-between px-4 mt-2 pr-6">

                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Invoice Qty:</span>
                    </span>
                    <span class="text-gray-400">

                        {{ item.InvQty }}
                    </span>
                </p>
                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Pick Qty:</span>
                    </span>
                    <span class=" text-gray-400">

                        {{ item.PickQTy }}
                    </span>
                </p>
            </div>

        </div>

        <div :class="rackLocationData?.data.length == 0 ? 'hidden' : 'flex items-center mb-2 justify-center'">
            <Pagination v-slot="{ page }" :items-per-page="perPage" :total="rackLocationData?.total"
                :sibling-count="siblingCount" show-edges :default-page="1">
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationPrev @click="handlePageChange(currentPage - 1)" />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationListItem v-if="item.type === 'page'" :value="item.value">
                            <Button @click="handlePageChange(item.value)" class="w-10 h-10 p-0"
                                :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" />
                    </template>
                    <PaginationNext @click="handlePageChange(currentPage + 1)" />
                </PaginationList>
            </Pagination>
        </div>
    </div>
    <Teleport to="body">
        <PickListDialog :params="updateSKUQtyParams" :dialogData="dialogData" v-model:isOpen="isDialogOpen" />
    </Teleport>


</template>


<script setup lang="ts">
import { fetchPickList, fetchRackLocation, updateSQUQTY } from '@/action/picklistAction';
import Header from '@/components/Header.vue';
import PickListDialog from '@/components/modals/PickListComponents/PickListDialog.vue';
import Searchable from '@/components/Searchable.vue';
import Button from '@/components/ui/button/Button.vue';
import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination';
import { useScaningMode } from '@/store/loaderStore';
import { usePickListStore } from '@/store/PickList';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()

const location = route.params.id
const siblingCount = 1;
const currentPage = ref(1)
const scaningStore = useScaningMode()
const pickListStore = usePickListStore()
const pickData = ref(pickListStore.selectedPickList);
const searchrackLocation = ref()
const rackLocationData = ref()
const perPage = ref(1)
const router = useRouter()
const isDialogOpen = ref(false);
const dialogData = ref();



watch(isDialogOpen, (newValue) => {
    if (!newValue) {
        fetchRack(currentPage.value )
        fetchPickList({
            pickList: pickListStore.selectedPickList.dnno
        }).then((response) => {
            pickListStore.setSelectedPickList(response.data[0])
            pickData.value = response.data[0]
        })
    }
});


const updateSKUQtyParams = ref({
    batchNo: rackLocationData.value?.data[currentPage.value - 1].batchno,
    dnno: pickListStore.selectedPickList.dnno,
    page: currentPage.value as any,
    sku: searchrackLocation.value,
    wlocation: location as string
})
const fetchData = () => {
    updateSQUQTY({
        batchNo: rackLocationData.value?.data[currentPage.value - 1].batchno,
    dnno: pickListStore.selectedPickList.dnno,
    page: currentPage.value as any,
    sku: searchrackLocation.value,
    wlocation: location as string,
        qty: "1",

    }).then((response) => {
        fetchPickList({
            pickList: pickListStore.selectedPickList.dnno
        }).then((response) => {
            pickListStore.setSelectedPickList(response.data[0])
            pickData.value = response.data[0]
        })
        if (response) {
            searchrackLocation.value = ''

            rackLocationData.value = response
        } else {
            searchrackLocation.value = ''

            fetchRack(currentPage.value)

        }
    }).catch((err) => {
        console.log("Error in UpdateSQKQty", err)
    })


}

const handleSKUTableCard = (item: any) => {
    dialogData.value = item
    isDialogOpen.value = true;
}




const fetchRack = (item?: any) => {

    fetchRackLocation({
        inv: pickListStore.selectedPickList.REF_NO,
        dnno: pickListStore.selectedPickList.dnno,
        rack: pickListStore.selectedAilse[0].Aisles,
        zone: pickListStore.selectedZone,
        tq: pickListStore.selectedAilse[0].TotalQty,
        ts: pickListStore.selectedAilse[0].TotalScanned,
        location: location as string,
        page: item ?? perPage.value as any
    }).then((response) => {
        if (response) {
            // console.log(/response)
            rackLocationData.value = response
        } else {
            router.back()
        }
    }).catch((err) => console.log("Error in Rack Location ", err))


}


const handlePageChange = (item: any) => {
    currentPage.value = item
    fetchRack(item)
}



onMounted(() => {
    fetchRack()

})

</script>
