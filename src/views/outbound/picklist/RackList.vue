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


    <Searchable :scan="scaningStore.scaning" label="Search Rack Location" v-model="searchrackLocation"
        :on-change="fetchData" />

    <div class="flex flex-col px-2 justify-center mt-2 mb-2">
        <div v-for="(item, index) in rackData" :key="index" class="border-2  rounded-md mb-2 p-2">
            <h2 class="text-center  text-green-600">{{ item.WHLOCATION }}

            </h2>
            <p class="flex text-sm gap-3 items-center px-4">
                <span class="flex gap-x-1 items-center">
                    <span class="font-semibold">Total SKU:</span>
                </span>
                {{ item.TOTALSKU }}
            </p>

            <div class=" flex justify-between px-4 my-2 pr-6">

                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Total Qty:</span>
                    </span>
                    {{ item.TotalQty }}
                </p>
                <p class="flex text-sm gap-3 items-center">
                    <span class="flex gap-x-1 items-center">
                        <span class="font-semibold">Total Picked:</span>
                    </span>
                    {{ item.TotalScanned }}
                </p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { fetchRackList } from '@/action/picklistAction';
import Header from '@/components/Header.vue';
import Searchable from '@/components/Searchable.vue';
import { useScaningMode } from '@/store/loaderStore';
import { usePickListStore } from '@/store/PickList';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute()

const { alise } = route.query
const scaningStore = useScaningMode()
const pickListStore = usePickListStore()
const pickData = ref(pickListStore.selectedPickList);
const searchrackLocation = ref()
const rackData = ref()
const router = useRouter()


const fetchData = () => {

    router.push({
        name: "RackListData",
        params: { id: searchrackLocation.value },
    })

}



onMounted(() => {
    fetchRackList({
        refNo: pickListStore.selectedPickList.REF_NO,
        zone: pickListStore.selectedZone,
        ailes: alise as string,
        dnno: pickListStore.selectedPickList.dnno,
        tq: pickListStore.selectedAilse[0].TotalQty,
        ts: pickListStore.selectedAilse[0].TotalScanned,
    }).then((response) => {
        if (response) {
            rackData.value = response
        } else {

            router.back()
        }
    }).catch((err: any) => {
        console.log("Error in fetchRackList", err)
    })
})
</script>
