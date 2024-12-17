<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import Card from '@/components/ui/card/Card.vue';
import CardHeader from '@/components/ui/card/CardHeader.vue';
import CardDescription from '@/components/ui/card/CardDescription.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Button from '@/components/ui/button/Button.vue';
import { UpdateAndFetchMannualQuantity } from '@/action/putawayAction';
import { useToast } from '@/components/ui/toast';
import { usePutawayStore } from '@/store/putAwayStore';

interface Props {
    isOpen: boolean
    dialogData: any
    mrnNo: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

const mrnStore = usePutawayStore()

const dialogOpen = ref(props.isOpen)

const handleOpenChange = (open: boolean) => {
    if (!open) {
        emit('update:isOpen', false)
        mrnStore.resetStore()
    }
}
watch(() => props.isOpen, (newValue) => {
    dialogOpen.value = newValue
})

watch(dialogOpen, (newValue) => {
    emit('update:isOpen', newValue)
})
const updateQty = ref<any>()
const { toast } = useToast()
const addQty = () => {
 

    if (props.dialogData.qty < (props.dialogData.scanqty + updateQty.value) || props.dialogData.qty - props.dialogData.scanqty == 0 || props.dialogData.qty - props.dialogData.scanqty < updateQty.value) {
        toast({
            title: "SKU Quantity is out of range",
            variant: "destructive"
        })
        mrnStore.resetStore()
        updateQty.value = 0
        handleOpenChange(false)
        return;

    }

    UpdateAndFetchMannualQuantity({ skuinputvalue: updateQty.value, skuRadio: 1 })
        .then(() => {
           
            mrnStore.resetStore()
            updateQty.value = 0
            handleOpenChange(false)
        }).catch((err: any) => {
            console.log(err);
            mrnStore.resetStore()
            updateQty.value = 0
            handleOpenChange(false)
        })
}

const removeQty = () => {
    // console.log("this qty", props.dialogData.qty)
    // console.log("this scanQty", props.dialogData)
    // console.log("this update", updateQty.value)


    // console.log("1", props.dialogData.qty < (props.dialogData.scanqty + updateQty.value))
    // console.log("2", props.dialogData.qty - props.dialogData.scanqty == 0)
    // console.log("3", props.dialogData.qty - props.dialogData.scanqty < updateQty.value)
    if (props.dialogData.scanqty < updateQty.value || props.dialogData.scanqty ==0) {
        toast({
            title: "SKU Quantity is out of range",
            variant: "destructive"
        })
        mrnStore.resetStore()
        updateQty.value = 0
        handleOpenChange(false)
        return;
    }
    UpdateAndFetchMannualQuantity({ skuinputvalue: updateQty.value, skuRadio: 0 })

        .then(() => {
          
            mrnStore.resetStore()
            updateQty.value = 0
            handleOpenChange(false)
        }).catch((err: any) => {
            console.log(err);
            mrnStore.resetStore()
            updateQty.value = 0
            handleOpenChange(false)
        })


}



</script>

<template>
    <Dialog v-model:open="dialogOpen" @update:open="handleOpenChange">

        <DialogContent class="sm:max-w-[425px]" :disableOutsidePointerEvents="true"
            :onPointerDownOutside="(e) => e.preventDefault()" :onInteractOutside="(e) => e.preventDefault()">
            <DialogHeader>
                <DialogTitle>{{ mrnStore.mrn?.mrnNo }}</DialogTitle>
                <DialogDescription class="sr-only">i</DialogDescription>
            </DialogHeader>

            <div>

                <Card>
                    <CardHeader>
                        <CardDescription>Mannual Update Quantity</CardDescription>
                    </CardHeader>


                    <CardContent class="w-full px-2">
                        <div class="space-y-2 border rounded-md p-2">

                            <div class="flex justify-between items-center gap-x-2">
                                <span class="text-[12px] font-medium text-nowrap min-w-24  text-gray-500">SKU:</span>
                                <span class="text-[12px] text-left w-full">{{ dialogData.sku }}</span>
                            </div>
                            <div class="flex justify-between items-center gap-x-2">
                                <span class="text-[12px] font-medium text-nowrap  min-w-24 text-gray-500">Batch
                                    No:</span>
                                <span class="text-[12px] text-left  w-full ">{{ dialogData.batchno }}</span>
                            </div>

                            <div class="flex justify-between items-center w-full gap-x-2">
                                <span class="text-[12px] font-medium text-nowrap  min-w-24 text-gray-500">Quantity:
                                </span>
                                <span class="text-[12px] text-left  w-full ">{{ dialogData.qty }} - ({{
                                    dialogData.scanqty }})</span>
                            </div>
                            <div class="flex justify-between items-center gap-x-2">
                                <span class="text-[12px] font-medium text-nowrap  min-w-24 text-gray-500">SLOC:</span>
                                <span class="text-[12px] text-left  w-full ">{{ dialogData.SEGTYPE }}</span>
                            </div>
                        </div>

                        <div class=" px-2 mt-4 space-y-2">
                            <Label class=" pl-1">Enter Quantity:</Label>
                            <Input type="number" v-model="updateQty" min="0" :max="dialogData.qty - dialogData.scanqty"
                                placeholder="Enter quantity here." />

                            <div class=" flex gap-x-4 px-2 pt-3 ">
                                <Button @click="addQty" class=" w-full">Add</Button>
                                <Button @click="removeQty" class=" w-full" variant="destructive">Remove</Button>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    </Dialog>
</template>