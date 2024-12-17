import { defineStore } from "pinia";
import { ref } from "vue";

export const usePutawayStore = defineStore("PutAwayStore", () => {
  const mrn = ref<any>();
  const updateMannualData = ref<any>();
  const setMRN = (value: any) => {
     mrn.value = value ? { ...value } : undefined;
  };

  const setUpdateManualData = (props: any) => {
    const newMRN = {
      sku: props.sku,
      batchVal: props.batchno,
      sloc: props.SEGTYPE,
      skuQty: props.qty,
      location: props.location,
      mrnNo: props.mrn,
      invoice: props.invoice,
    };

    setMRN(newMRN);
  };

  const resetStore = () => {
    mrn.value = undefined;
    console.log("MRN has been reset");
  };

  return {
    mrn,
    setMRN,
    updateMannualData,
    setUpdateManualData,
    resetStore,
  };
});
