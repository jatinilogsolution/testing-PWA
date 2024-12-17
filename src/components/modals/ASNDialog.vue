 

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ASNCard from './ASNCard.vue'
import { useAsnDetailsStore } from '@/store/asnScanStore'
import DialogDescription from '../ui/dialog/DialogDescription.vue';

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['update:isOpen'])

const asnStore = useAsnDetailsStore()

const dialogOpen = ref(props.isOpen)

const handleOpenChange = (open: boolean) => {
   if (!open) {
    emit('update:isOpen', false)
    asnStore.resetStore()
  }
}

 watch(() => props.isOpen, (newValue) => {
  dialogOpen.value = newValue
})

 watch(dialogOpen, (newValue) => {
  emit('update:isOpen', newValue)
})
</script>

<template>
  <Dialog v-model:open="dialogOpen" @update:open="handleOpenChange">
    
    <DialogContent 
      class="sm:max-w-[425px]"
      :disableOutsidePointerEvents="true"
      :onPointerDownOutside="(e) => e.preventDefault()"
      :onInteractOutside="(e) => e.preventDefault()"
    >
      <DialogHeader>
        <DialogTitle>{{ asnStore.asn?.ASN_NO }}</DialogTitle>
        <DialogDescription class="sr-only">i</DialogDescription>
      </DialogHeader>
      <ASNCard />
    </DialogContent>
  </Dialog>
</template>