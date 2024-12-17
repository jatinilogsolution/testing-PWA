import axiosClient from "@/action/api";
import { useToast } from "@/components/ui/toast";
import { ASNDataProps, ASNScanDataProps } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAsnDetailsStore = defineStore("ASNDetailsStore", () => {
  const asn = ref<ASNScanDataProps | undefined>(undefined); // Type safely initialized as undefined
  const data = ref<any[]>([]); // Typing as an empty array initially
  const totalItems = ref<number>(0); // Ensuring this is a number
  const sku = ref();

  const setSku = (value: any) => {
    sku.value = value ? { ...value } : undefined;
  };
  const setAsnNo = (value?: ASNScanDataProps) => {
    asn.value = value ? { ...value } : undefined; // Only set ASN if value exists
  };

  const { toast } = useToast();
  const userType: string | null = sessionStorage.getItem("userType");

  const warehouseId = ref<string | null>(null); // Type as a string or null
  if (userType === "admin") {
    warehouseId.value = sessionStorage.getItem("warehouseId");
  } else {
    warehouseId.value = sessionStorage.getItem("userWarehouseId");
  }

  const fetchASN = async ({
    currentPage,
    page,
    searchAsn,
    updateCurrentASN,
  }: ASNDataProps) => {
    const params = {
      warehouseId: warehouseId.value,
      clientId: sessionStorage.getItem("clientId"),
      UserId: sessionStorage.getItem("userId"),
      UserType: userType,
      searchScanValue: searchAsn ?? asn.value?.ASN_NO,
      page: currentPage ?? 1,
      per_page: page ?? 1,
    };

    try {
      const response = await axiosClient.get("/search-asn", { params });
      if (response.data && response.data.data) {
        data.value = response.data.data;
        totalItems.value = response.data.total;
        if (updateCurrentASN && response.data.data.length > 0) {
          setAsnNo(response.data.data[0]);
        }
      }
    } catch (error: any) {
      data.value = []; // Clear data in case of error
      const errorMessage =
        error?.response?.data?.error ||
        "Unknown error occurred while fetching data";

      toast({
        title: `${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  // Reset the store's state to initial values
  const resetStore = () => {
    asn.value = undefined;
    data.value = [];
    totalItems.value = 0;
  };

  return {
    asn,
    sku,
    setSku,
    setAsnNo,
    fetchASN,
    data,
    totalItems,
    resetStore, // Return the resetStore function so it can be used in components
  };
});
