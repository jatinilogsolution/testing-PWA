import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore("Loader", () => {
  const load = ref<boolean>(false);
  console.log(load.value)

  const startLoading = () => {
    load.value = true;
  };

  const stopLoading = () => {
    load.value = true;
  };

  return {
    load,
    startLoading,
    stopLoading,
  };
});

export const useScaningMode = defineStore("ScaningMode", () => {
  const scaning = ref(true);

  const handleScaning = () => {
    scaning.value = !scaning.value;
  };

  return {
    scaning,
    handleScaning,
  };
});
