<template>
    <Header back-button title="Pick List" />

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

    <div v-if="!ailseData">

        <Searchable :scan="scaningStore.scaning" label="Search Zone" v-model="searchZone" :on-change="fetchData" />

        <div class="flex flex-col px-2 justify-center gap-2 mt-2">
            <div v-for="(item, index) in zoneData" :key="index" class="border-2  rounded-md mb-4 p-2">
                <h2 class="text-center  text-green-600">{{ item.ZONEBARCODE }} - ({{ item.ZONE }})

                </h2>

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
    </div>


</template>

<script setup lang="ts">
import { fetchFindAilse, fetchZone } from '@/action/picklistAction';
import Header from '@/components/Header.vue';
import Searchable from '@/components/Searchable.vue';
import { useScaningMode } from '@/store/loaderStore';
import { usePickListStore } from '@/store/PickList';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const pickListStore = usePickListStore();
const pickData = ref(pickListStore.selectedPickList);
const zoneData = ref();
const searchZone = ref();
const scaningStore = useScaningMode();

const router = useRouter()
const ailseData = ref()

const fetchData = () => {
    pickListStore.setSelectedZone(searchZone.value)

    fetchFindAilse({
        refNo: pickData.value.REF_NO,
        zone: searchZone.value
    }).then((response) => {
        pickListStore.setSelectedAilseList(response)

        router.push({name: "AilseList"})
     }).catch((err) => {
        console.log("This is error",err);
    });
};


onMounted(() => {
    fetchZone({
        refNo: pickData.value.REF_NO
    }).then((response) => {
        zoneData.value = response.zone;
        pickData.value = response.picklist[0];
        console.log("this is zoneList something is coming from the API", response);
    }).catch(() => {
        console.log("This is error");
    });
});
</script>
