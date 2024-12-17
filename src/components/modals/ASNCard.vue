<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from '@/components/ui/card';
import { useAsnDetailsStore } from '@/store/asnScanStore';
import { ref } from 'vue';
import Searchable from '../Searchable.vue';
import { useScaningMode } from '@/store/loaderStore';
import { useToast } from '../ui/toast';
import { fetchLPNNo, fetchSKUNo, updateSKUQty } from '@/action/asnAction';
import SKUTable from './SKUTable.vue';

const asnStore = useAsnDetailsStore();
const lpn = ref<any>('');
const sku = ref<any>();

const scaninigStore = useScaningMode();
const skuData = ref([]);

const isSKUVisible = ref(false);
const { toast } = useToast();

const handleLPN = () => {
    const params = {
        warehouseId: warehouseId.value,
        clientId: sessionStorage.getItem('clientId'),
        UserId: sessionStorage.getItem('userId'),
        asn: asnStore.asn?.ASN_NO,
        wLocation: lpn.value,
    };

    if (lpn.value.length > 0) {
        fetchLPNNo(params);
        isSKUVisible.value = true;
    } else {
        toast({
            title: 'Please enter LPN',
            variant: 'destructive',
            duration: 1000,
        });
    }
};

const userType: string | null = sessionStorage.getItem('userType');

const warehouseId = ref();
if (userType == 'admin') {
    warehouseId.value = sessionStorage.getItem('warehouseId');
} else {
    warehouseId.value = sessionStorage.getItem('userWarehouseId');
}

const handleSKU = async () => {
    asnStore.setSku(sku.value);
    const params = {
        warehouseId: warehouseId.value,
        clientId: sessionStorage.getItem('clientId'),
        skuCode: sku.value,
        cutInvoice: asnStore.asn?.InvoiceNO,
    };
    if (sku.value.length > 0) {
        try {
            const data = await fetchSKUNo(params);
            skuData.value = data.sku;
        } catch (e) {
            console.error('Error fetching SKU data', e);
            skuData.value = [];
            sku.value = null // Clear data on error
            toast({
                title: 'SKU not Found',
                variant: 'destructive',
                class: "mt-60"
            });
        }
    } else {
        skuData.value = []
        toast({
            title: 'Please enter SKU',
            variant: 'destructive',
            duration: 1000,
        });
    }
};

const handleBatchSelection = async (data: any) => {
    const params = {
        warehouseId: warehouseId.value,
        clientId: sessionStorage.getItem('clientId'),
        enteryBy: sessionStorage.getItem('userId'),
        invoice: asnStore.asn?.InvoiceNO,
        asn: asnStore.asn?.ASN_NO,
        wLocation: lpn.value,
        skuBatch: data.batchno,
        skuqtyval: data.scanQty,
        skuNumber: sku.value,
    };

    try {
        await updateSKUQty(params);

        asnStore.fetchASN({
            updateCurrentASN: true,
        });
        sku.value = null
        skuData.value = [];
        return true;
    } catch (err) {
        toast({
            title: 'Something went wrong',
            variant: 'destructive',
        });
    }
};
</script>


<template>
    <Card>
        <CardHeader>
            <CardDescription>Search Box/LPN</CardDescription>
        </CardHeader>
        <CardContent class="w-full px-2">
            <div class="space-y-2 border rounded-md p-2">
                <div class="flex w-full justify-between items-center">
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-[12px] font-medium text-gray-500">Total Qty:</span>
                        <span class="text-[12px] font-bold">{{ asnStore.asn?.ASNQTY }}</span>
                    </div>
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-[12px] font-medium text-gray-500">Scan Qty:</span>
                        <span class="text-[12px]">{{ asnStore.asn?.ScanQty }}</span>
                    </div>
                </div>
                <div class="flex w-full justify-between items-center">
                    <div class="pt-2">
                        <div class="flex justify-between items-center gap-x-2">
                            <span class="text-[12px] font-medium text-gray-500">Invoice No:</span>
                            <span class="text-[12px] break-words">{{ asnStore.asn?.InvoiceNO }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-[12px] font-medium text-gray-500">PO No:</span>
                        <span class="text-[12px] font-bold">{{ asnStore.asn?.PONO }}</span>
                    </div>
                </div>
                <div class="flex w-full justify-between items-center">
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-xs font-medium text-gray-500">LPN/BOX:</span>
                        <span class="text-[12px] font-bold">{{ lpn }}</span>
                    </div>
                    <div class="flex justify-between items-center gap-x-2">
                        <span class="text-xs font-medium text-gray-500">SKU:</span>
                        <span class="text-[12px]">{{ sku }}</span>
                    </div>
                </div>
            </div>
            <Searchable :scan="scaninigStore.scaning" class="w-full mt-1" label="Search LPN/Box" v-model="lpn"
                :on-change="handleLPN" />
            <Searchable v-if="isSKUVisible" :scan="scaninigStore.scaning" class="w-full" label="Search SKU"
                v-model="sku" :on-change="handleSKU" />
            <div class="w-full flex items-center justify-center">
                <SKUTable :sku-data="skuData" @batch-selected="handleBatchSelection" />
            </div>
        </CardContent>
    </Card>
</template>
