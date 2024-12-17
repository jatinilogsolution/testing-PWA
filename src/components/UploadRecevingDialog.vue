<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import axiosClient from '@/action/api'
import ScrollArea from './ui/scroll-area/ScrollArea.vue'
import ImageField from './enhanced/ImageField.vue'
import { useReceivingStore } from '@/store/imageStore'
import { useLoaderStore } from '@/store/loaderStore'

interface Props {
    isOpen: boolean
    asnData: {
        ASN_No: string
    }
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

// const router = useRouter()
const { toast } = useToast()

const store = useReceivingStore()
const storeLoader = useLoaderStore()

const userType = sessionStorage.getItem("userType")
const warehouseId = ref(userType === "admin" ? sessionStorage.getItem("warehouseId") : sessionStorage.getItem("userWarehouseId"))

const closeDialog = () => {
    emit('update:isOpen', false)
}

const handleImageUpload = async (e: Event) => {
    e.preventDefault()
    storeLoader.startLoading()

    const data = new FormData()
    data.append("vehicleImage", store.vehicleImageFile ?? "")
    data.append("vehicleSealImage", store.vehicleSealImageFile ?? "")
    data.append("vehicleNoPlateImage", store.vehicleNumberPlateImageFile ?? "")
    data.append("materialLoadedone", store.materialLoadedImage1File ?? "")
    data.append("materialLoadedtwo", store.materialLoadedImage2File ?? "")
    data.append("materialLoadedthree", store.materialLoadedImage3File ?? "")
    data.append("userId", sessionStorage.getItem("userId") || "")
    data.append("warehouseId", warehouseId.value || "")
    data.append("clientId", sessionStorage.getItem("clientId") || "")
    data.append("asnNumber", props.asnData.ASN_No)

    try {
        const res = await axiosClient.post("/uploads-received-documents", data, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.status == 200) {

            toast({
                title: "Images uploaded successfully.",
                class: "font-bold text-green-500"
            })

            closeDialog()
        }
        storeLoader.stopLoading()

    } catch (err: any) {
        toast({
            title: err.response?.data?.message || "An error occurred",
            class: "font-bold text-red-500"
        })
    } finally {
        storeLoader.stopLoading()
    }
}

onMounted(() => {
    store.storeReset()
})
</script>

<template>
    <Dialog :open="isOpen" @update:open="closeDialog">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>ASN Receiving Document</DialogTitle>
                <DialogDescription>
                    {{ props.asnData?.ASN_No }}
                </DialogDescription>
            </DialogHeader>
            <ScrollArea>
                <div class="flex flex-col p-4 gap-y-4">
                    <ImageField label="Vehicle Image" isRequired :set-value="store.handleVehicleImage" />
                    <ImageField label="Vehicle Seal Image" isRequired :set-value="store.handleVehicleSealImage" />
                    <ImageField label="Vehicle Number Plate Image" isRequired
                        :set-value="store.handleVehicleNumberPlateImage" />
                    <ImageField label="Material Loaded - Image 1" isRequired
                        :set-value="store.handleMaterialLoadedImage1" />
                    <ImageField label="Material Loaded - Image 2" isRequired
                        :set-value="store.handleMaterialLoadedImage2" />
                    <ImageField label="Material Loaded - Image 3" isRequired
                        :set-value="store.handleMaterialLoadedImage3" />
                    <Button type="button" @click="handleImageUpload" class="w-full">Upload</Button>
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
</template>