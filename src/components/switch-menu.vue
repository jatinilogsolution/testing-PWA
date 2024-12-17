<script setup lang="ts">
import { ArrowRightLeft } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { onMounted, ref, watch } from "vue";
import axiosClient from "@/action/api";
import ComboBox from "./ui/combo-box/ComboBox.vue";
import Drawer from "./ui/drawer/Drawer.vue";
import { DrawerClose, DrawerTrigger } from "vaul-vue";
import DrawerContent from "./ui/drawer/DrawerContent.vue";
import DrawerHeader from "./ui/drawer/DrawerHeader.vue";
import DrawerTitle from "./ui/drawer/DrawerTitle.vue";
import DrawerDescription from "./ui/drawer/DrawerDescription.vue";
import DrawerFooter from "./ui/drawer/DrawerFooter.vue";

const warehouse = ref();
const client = ref(sessionStorage.getItem("clientId"));

interface DataProps {
  value: string;
  label: string;
}

const warehouseData = ref<DataProps[]>([]);
const cleintData = ref<DataProps[]>([]);

const props = defineProps<{
  isOpen?: boolean;
  isRef: string;
  onWhere?: boolean;
}>();
const open = ref(props.onWhere ? true : props.isOpen ?? false);

const fetchWarehouse = () => {
  axiosClient
    .get("/get-warehouse-name")
    .then((response) => {
      warehouseData.value = response.data.map(
        (item: { WHid: string; WHname: string }) => ({
          value: item.WHid,
          label: item.WHname,
        })
      );
    })
    .catch((error) => {
      console.log("error in fetching warehouse", error.message);
    });
};

const fetchClient = () => {
  var params = {
    warehouseId: warehouse.value,
  };
  axiosClient
    .get("get-client-name", { params: params })
    .then((response) => {
      cleintData.value = response.data.map(
        (item: { Clientid: string; ClientName: string }) => ({
          value: item.Clientid,
          label: item.ClientName,
        })
      );
    })
    .catch((error) => {
      console.log("error in fetching client", error.message);
    });
};

const userType = ref(sessionStorage.getItem("userType"));

onMounted(() => {
  if (!(userType.value == "admin")) {
    const warehouseId: string | null =
      sessionStorage.getItem("userWarehouseId");
    warehouse.value = warehouseId;
  } else {
    warehouse.value = client.value = sessionStorage.getItem("clientId");
    warehouse.value =
      sessionStorage.getItem("warehouseId") ??
      sessionStorage.getItem("userWarehouseId");
    fetchWarehouse();
  }
});

watch(warehouse, () => fetchClient());

const handleSwitchSubmit = () => {
  if (!warehouse.value || !client.value) {
    alert("Both Warehouse and Client must be selected.");
    return;
  }

  sessionStorage.setItem("warehouseId", warehouse.value);
  sessionStorage.setItem("clientId", client.value);

  window.location.reload();
};
</script>

<template>
  <Drawer v-model:open="open" :dismissible="false">
    <DrawerTrigger as-child>
      <div class=" w-full flex items-center h-full justify-center flex-col">

        <ArrowRightLeft class="h-6 w-6" />
  
        <span class="text-xs mt-1">Switch</span>
      </div>

    </DrawerTrigger>
    <DrawerContent>
      <form @submit.prevent="handleSwitchSubmit" class="mx-auto w-full  ">
        <DrawerHeader class="flex flex-col items-center justify-center">
          <img src="https://www.vianaar.com/images-vianaar/logo.svg" alt="Puugle" class="w-auto h-10 mb-4" />
          <DrawerTitle class="font-medium tracking-widest py-2">
            BY AWL INDIA
          </DrawerTitle>
          <DrawerDescription class="font-semibold">Select Details.</DrawerDescription>
        </DrawerHeader>
        <div class="p-4 w-full  pb-0 flex flex-col gap-y-4">
          <ComboBox v-if="userType == 'admin'" referenceIs="warehouse" title="Warehouse" v-model="warehouse"
            :defaultValue="warehouse" :frameworks="warehouseData" :is-open="false" placeholder="Select warehouse"/>

          <ComboBox referenceIs="client" title="Client" :is-open="false" :default-value="client" v-model="client"
            :frameworks="cleintData" placeholder="Select Client"/>
          <Button class=" w-full" type="submit">Submit</Button>
        </div>
      </form>
      <DrawerFooter class="flex items-center justify-center w-full">
        <DrawerClose class="" v-if="!onWhere" as-child>
          <Button class=" w-full " variant="destructive">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
