<template>
    <div v-if="skuData && skuData.length" class="w-full ">
        <table class="w-full border-collapse  rounded-md">
            <thead class="text-nowrap rounded-md">
                <tr class="border-b bg-foreground/50 rounded-md">
                    <th class="px-2 py-2  text-center text-[12px] font-semibold">SKU / Batch</th>
                    <th class="px-7 py-2 text-center text-[12px] font-semibold">Qty</th>
                    <th class="px-7 py-2 text-center text-[12px] font-semibold">SLOC</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sku, index) in data.length > 0 ? data : props.skuData" :key="`sku-${index}`"
                    @click="handleSKUTableCard(sku)"
                    class="border-b focus:bg-background/50 transition-colors cursor-pointer">

                    <td class="px-2 py-2 text-sm text-center text-blue-600 ">{{ sku.sku }} / {{ sku.batchno }}</td>
                    <td class="px-2 py-2 text-sm text-center ">
                        {{ sku.qty }} - ({{ sku.scanqty }})
                    </td>
                    <td class="px-2 py-2 text-sm text-center">
                        {{ sku.SEGTYPE }}
                    </td>
                </tr>
            </tbody>
        </table>
        <Button @click="resetForm" variant="destructive" class="w-full mt-4 font-bold text-clip" size="lg">
            Reset form </Button>
    </div>
    <p v-else class="text-center text-gray-500 mt-4">No SKU data available</p>
    <Teleport to="body">
        <PutAwayDialog :mrnNo="mrn" :dialogData="dialgData" v-model:isOpen="isDialogOpen" />
    </Teleport>

</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { computed,  ref, watch } from 'vue';
import PutAwayDialog from './PutAwayDialog.vue';
import { usePutawayStore } from '@/store/putAwayStore';
import { fetchAndValidateSKU } from '@/action/putawayAction';

const putAwayStore = usePutawayStore()

interface SKUProps {
    scanqty: string;
    sku: string;
    qty: number;
    batchno: number;
    SEGTYPE: number;
}
const props = defineProps<{
    skuData: SKUProps[];
    mrn: string
    bin: string
    invoice: string
}>();


const isdata = computed(() => props.skuData);
const data = ref<any>(isdata.value);
const isDialogOpen = ref(false);
const dialgData = ref();

watch(isDialogOpen, (newValue) => {
    if (!newValue) {
        fetchAndValidateSKU({
            skuNo: props.skuData[0]?.sku,
            mrnNo: props.mrn
        }).then((response) => {
            data.value = response;
            console.log('Fetch response:', response);
            console.log('Updated data:', data.value);
        }).catch((err: any) => {
            console.error("Fetch error: ", err);
            data.value = [];
        });
    }
});


const handleSKUTableCard = (item: SKUProps) => {
    putAwayStore.setUpdateManualData({
        ...item,
        mrn: props.mrn,
        location: props.bin,
        invoice: props.invoice
    });
    dialgData.value = item
    isDialogOpen.value = true;
}

const resetForm = () => {
    window.location.reload()
}
</script>

<style scoped>
input[type="number"]:disabled {
    cursor: not-allowed;
}
</style>