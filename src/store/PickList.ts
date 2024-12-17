import { defineStore } from "pinia";
import { ref } from "vue";

export const usePickListStore = defineStore(
  "PickListStore",
  () => {
    const selectedPickList = ref();

    const selectedAilse = ref();

    const selectedZone = ref();

    const setSelectedZone = (zone: string) => {
      selectedZone.value = "";

      selectedZone.value = zone;
    };
    const setSelectedAilseList = (values: any) => {
      selectedAilse.value = values ? { ...values } : undefined;
    };
    const setSelectedPickList = (values: any) => {
      selectedPickList.value = values ? { ...values } : undefined;
    };

    const resetStore = () => {
      selectedPickList.value = undefined;
    };

    return {
      selectedPickList,
      setSelectedPickList,
      resetStore,
      selectedAilse,
      setSelectedAilseList,
      setSelectedZone,
      selectedZone
    };
  },
  {
    persist: true,
  }
);
