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
import { useToast } from '@/components/ui/toast';
import { UpdateAndFetchPickListMannualQuantity } from '@/action/picklistAction';
 
interface Props {
    isOpen: boolean
    dialogData: any
    params: any
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

 
const dialogOpen = ref(props.isOpen)

const handleOpenChange = (open: boolean) => {
    if (!open) {
        emit('update:isOpen', false)
        
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


    if (props.dialogData.InvQty < (props.dialogData.PickQTy + updateQty.value) || props.dialogData.InvQty - props.dialogData.PickQTy == 0 || props.dialogData.InvQty - props.dialogData.PickQTy < updateQty.value) {
        toast({
            title: "SKU Quantity is out of range",
            variant: "destructive"
        })
        
        updateQty.value = 0
        handleOpenChange(false)
        return;

    }
    UpdateAndFetchPickListMannualQuantity({
        ...props.params,
        sku: props.dialogData.sku,
        batchNo: props.dialogData.batchno,
        qty: updateQty.value,
        skuRadioButton: 1
    })

        .then(() => {

            
            updateQty.value = 0
            handleOpenChange(false)
        }).catch((err: any) => {
            console.log(err);
            
            updateQty.value = 0
            handleOpenChange(false)
        })
}

const removeQty = () => {

    if (props.dialogData.PickQTy < updateQty.value || props.dialogData.PickQTy == 0) {
        toast({
            title: "SKU Quantity is out of range",
            variant: "destructive"
        })
        
        updateQty.value = 0
        handleOpenChange(false)
        return;
    }
    UpdateAndFetchPickListMannualQuantity({
        ...props.params,
        sku: props.dialogData.sku,
        batchNo: props.dialogData.batchno,
        qty: updateQty.value,
        skuRadioButton: 0
    })

        .then(() => {

            
            updateQty.value = 0
            handleOpenChange(false)
        }).catch((err: any) => {
            console.log(err);
            
            updateQty.value = 0
            handleOpenChange(false)
        })


    //  sku: DF0001
    // batchNo: 
    // qty: 2
    // skuRadioButton: 0
}



</script>

<template>
    <Dialog v-model:open="dialogOpen" @update:open="handleOpenChange">
        <DialogContent class="sm:max-w-[425px]" :disableOutsidePointerEvents="true"
            :onPointerDownOutside="(e) => e.preventDefault()" :onInteractOutside="(e) => e.preventDefault()">
            <DialogHeader>
                <DialogTitle>{{ dialogData.dnno }}</DialogTitle>
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
                                <span class="text-[12px] font-medium text-nowrap  min-w-24 text-gray-500">Total
                                    Quantity:
                                </span>
                                <span class="text-[12px] text-left  w-full ">{{ dialogData.InvQty }}</span>
                            </div>
                            <div class="flex justify-between items-center gap-x-2">
                                <span class="text-[12px] font-medium text-nowrap  min-w-24 text-gray-500">Picked
                                    Quantity:</span>
                                <span class="text-[12px] text-left  w-full ">{{ dialogData.PickQTy }}</span>
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