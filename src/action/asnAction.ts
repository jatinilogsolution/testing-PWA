import { useToast } from "@/components/ui/toast";
import axiosClient from "./api";

export const fetchLPNNo: any = async (params: any) => {
  const { toast } = useToast();

  try {
    const response = await axiosClient.get("/search-lpn-box", { params });

    if (response.data != "ok") {
 
    
      toast({
        title: "Invalid LPN",
        variant: "destructive",
        duration: 1000

      });
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
};

export const fetchSKUNo: any = async (params: any) => {
  const { toast } = useToast();

  try {
    const response = await axiosClient.get("/search-SKU", { params });

    if (response.data.success == "success") {
      return response.data;
    } else {
      toast({
        title: "Invalid SKU",
        variant: "destructive",
        duration: 1000,
        class: "mt-60 "
      });
    }
  } catch (error) {
    console.error("Error fetching data", error);
    toast({
      title: "Something",
      variant: "destructive",
    });
  }
};

export const updateSKUQty: any = async (params: any) => {
  const { toast } = useToast();

  try {
    await axiosClient.get("/sku-insert-update-values", {
      params,
    });

    toast({
      title: "SKU Update Success",
      class: " bg-green-600",
    });
  } catch (error) {
    console.error("Error fetching data", error);
    toast({
      title: "Something went wrong",
      variant: "destructive",
    });
  }
};
