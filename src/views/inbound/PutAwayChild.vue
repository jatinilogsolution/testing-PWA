<template>
    <Header back-button title="PUT AWAY" />


    <Card v-if="mrnData">
        <div class=" text-center text-primary py-2 font-semibold">{{ mrnData.MRNNo }}</div>
        <CardContent class="w-full px-2">
            <div class="space-y-2 border rounded-md p-2">

                <div class="flex justify-between items-center gap-x-2">
                    <span class="text-[12px] font-medium text-nowrap min-w-20 text-gray-500">Party Name:</span>
                    <span class="text-[12px] text-left w-full">{{ mrnData.PartyName }}</span>
                </div>
                <div class="flex justify-between items-center w-full gap-x-2">
                    <span class="text-[12px] font-medium text-nowrap  min-w-20 text-gray-500">Invoice No:</span>
                    <span class="text-[12px] text-left  w-full ">{{ mrnData.Invoice }}</span>
                </div>
                <div class="flex justify-between items-center gap-x-2">
                    <span class="text-[12px] font-medium text-nowrap  min-w-20 text-gray-500">Bin:</span>
                    <span class="text-[12px] text-left  w-full font-bold">{{ bin }}</span>
                </div>
                <div class="flex justify-between items-center gap-x-2">
                    <span class="text-[12px] font-medium text-nowrap  min-w-20 text-gray-500">SKU:</span>
                    <span class="text-[12px] text-left  w-full font-bold">{{ sku }}</span>
                </div>

            </div>

            <Label class=" pl-2 pt-2 text-gray-400 mb-2">{{ isSKUVisible ? "Insert SKU" : "Insert Bin" }} </Label>
            <Searchable v-if="!isSKUVisible" :scan="scaninigStore.scaning" class="w-full mt-1" label="Search Bin"
                v-model="bin" :on-change="handleBin" />
            <Searchable v-else :scan="scaninigStore.scaning" :isDisabled="skuData.length> 0" class="w-full" label="Search SKU" v-model="sku"
                :on-change="handleSKU" />
            <div v-if="isSKUVisible" class="w-full flex items-center justify-center">
                <SKUPutAwayTable :mrn="mrn as string" :invoice="mrnData.Invoice" :bin="bin" :sku-data="skuData" />
            </div>
        </CardContent>
    </Card>
</template>


<script setup lang='ts'>
import { useRoute } from 'vue-router';


const route = useRoute();
const mrn = route.params.id


import {
    Card,
    CardContent,

} from '@/components/ui/card';
import { onMounted, ref } from 'vue';
import { useScaningMode } from '@/store/loaderStore';
import { fetchAndValidateBin, fetchAndValidateSKU, fetchMRNInvoice } from '@/action/putawayAction';
import Searchable from '@/components/Searchable.vue';
import Header from '@/components/Header.vue';
import Label from '@/components/ui/label/Label.vue';
import SKUPutAwayTable from '@/components/modals/putawayComponents/SKUPutAwayTable.vue';

const bin = ref<any>('');
const sku = ref<any>();

const scaninigStore = useScaningMode();
const mrnData = ref<any>()
const skuData = ref([]);

const isSKUVisible = ref(false);

const fetchData = () => {
    fetchMRNInvoice({
        mrnInvoice: mrn as string
    }).then((response) => {
        mrnData.value = []
        mrnData.value = response[0];

    }).catch((err: any) => {
        console.log(err);
        mrnData.value = [];

    })
}

const handleBin = () => {
    fetchAndValidateBin({
        binNo: bin.value as string,
    })
        .then((response) => {
            if (response) {
                isSKUVisible.value = true
            } else {
                bin.value = null
                isSKUVisible.value = false
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const handleSKU = () => {
    fetchAndValidateSKU({
        skuNo: sku.value,
        mrnNo: mrn as string
    })
        .then((response) => {
            if (response) {
                skuData.value = response;
                
            } else {
                sku.value = null
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
};


const userType: string | null = sessionStorage.getItem('userType');

const warehouseId = ref();
if (userType == 'admin') {
    warehouseId.value = sessionStorage.getItem('warehouseId');
} else {
    warehouseId.value = sessionStorage.getItem('userWarehouseId');
}

onMounted(() => {
    fetchData()
})



</script>