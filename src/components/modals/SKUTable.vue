<template>
    <div v-if="skuData && skuData.length" class="w-full">
        <table class="w-full border-collapse rounded-md">
            <thead class="text-nowrap rounded-md">
                <tr class="border-b bg-foreground/50 rounded-md">
                    <th class="px-2 py-2 text-center text-[12px] font-semibold">#</th>
                    <th class="px-2 py-2 text-center text-[12px] font-semibold">Batch</th>
                    <th class="px-2 py-2 text-center text-[12px] font-semibold">ASN Qty</th>
                    <th class="px-2 py-2 text-center text-[12px] font-semibold">Scanned Qty</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(sku, index) in skuData" :key="`sku-${index}`"
                    class="border-b focus:bg-background/50 transition-colors">
                    <td class="px-2 py-2">
                        <input type="radio" :name="`skuBatch`" :value="sku.batchno"
                            :checked="selectedBatch === sku.batchno" @change="onBatchSelect(sku, index)"
                            class="form-radio h-4 w-4 text-blue-600" />
                    </td>
                    <td class="px-2 py-2 text-sm text-center">{{ sku.batchno }}</td>
                    <td class="px-2 py-2 text-sm text-center">
                        {{ sku.ASNQTY }} - ({{ sku.ScanQty }})
                    </td>
                    <td class="px-2 py-2">
                        <Input type="number" :id="`scanInput-${index}`"
                            class="w-full px-2 py-1 border rounded-lg text-sm"
                            v-model.number="scanQuantities[sku.batchno]" :disabled="selectedBatch !== sku.batchno"
                            min="0" :max="sku.ASNQTY" />
                    </td>
                </tr>
            </tbody>
        </table>
        <Button @click="updateBatchSelection" class="w-full mt-4 font-bold text-clip" size="lg">
            Update SKU
        </Button>
    </div>
    <p v-else class="text-center text-gray-500 mt-4">No SKU data available</p>
</template>

<script setup lang="ts">
import { ref,   reactive } from 'vue';
import Input from '../ui/input/Input.vue';
import Button from '../ui/button/Button.vue';
import { useToast } from '../ui/toast';

const { toast } = useToast()

// Interface for SKU data
interface Sku {
    batchno: string;
    SKU: string;
    ASNQTY: number;
    ScanQty: number;
}

// Props and emits
const props = defineProps<{
    skuData: Sku[];
}>();

const emit = defineEmits<{
    (e: 'batch-selected', data: {
        batchno: string;
        scanQty: number
    }): void;
}>();

// Reactive state
const selectedBatch = ref<string | null>(null);
const selectedIndex = ref<number | null>(null);

// Reactive object to track scan quantities separately
const scanQuantities = reactive<Record<string, number>>({});

// Batch selection method
const onBatchSelect = (sku: Sku, index: number) => {
    selectedBatch.value = sku.batchno;
    selectedIndex.value = index;

    // Initialize scan quantity for this batch if not exists
    if (!(sku.batchno in scanQuantities)) {
        scanQuantities[sku.batchno] = 0;
    }
};


// Update batch selection method
const updateBatchSelection = () => {
    if (selectedBatch.value !== null && selectedIndex.value !== null) {
        const selectedSku = props.skuData[selectedIndex.value];
        const scanQty = scanQuantities[selectedBatch.value] || 0;
        if (scanQty > selectedSku.ASNQTY) {
            toast({
                title: `Scan quantity cannot be greater than ASN quantity`,
                variant: 'destructive'
            })
        }
        else if (scanQty == 0) {
            toast({
                title: `Please insert Scanned quantity. It cannot be 0`,
                variant: 'destructive'
            })
        }

        else {

            emit('batch-selected', {
                batchno: selectedBatch.value,
                scanQty: scanQty
            });

            selectedIndex.value = null;
            selectedBatch.value = null;

            for (const key in scanQuantities) {
                delete scanQuantities[key];
            }
        }
    } else {
        toast({
            title: "Please Select a batch",
            variant: 'destructive'
        })
    }
};
</script>

<style scoped>
input[type="number"]:disabled {
    cursor: not-allowed;
}
</style>