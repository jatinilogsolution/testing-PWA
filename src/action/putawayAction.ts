import { useToast } from "@/components/ui/toast";
import axiosClient from "./api";
import { useAuthStore } from "@/store/authStore";
import { useLoaderStore } from "@/store/loaderStore";
import { usePutawayStore } from "@/store/putAwayStore";

export const fetchMRNInvoice = async ({
  mrnInvoice,
}: {
  mrnInvoice: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  //   const putAwayStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/search-Mrn-Invoice", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        mrnInvoice: mrnInvoice,
        page: 1,
        per_page: 10,
      },
    });

    if (response.data.length == 0) {
      toast({
        title: "No MRN Invoice found!",
        variant: "destructive",
      });
    } else {
      return response.data;
    }
  } catch (err: any) {
    toast({
      title: "Something went wrong!",
      variant: "destructive",
    });
  } finally {
    loader.stopLoading();
  }
};

export const fetchAndValidateBin = async ({ binNo }: { binNo: string }) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/search-bin", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        bin: binNo,
      },
    });
    if (response.data.error == "notFounds") {
      toast({
        title: "Bin not found!",
        variant: "destructive",
      });
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    toast({
      title: "Something went wrong!",
      variant: "destructive",
    });
  } finally {
    loader.stopLoading();
  }
};

export const fetchAndValidateSKU = async ({
  mrnNo,
  skuNo,
}: {
  mrnNo: string;
  skuNo: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/search-bin-sku", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        sku: skuNo,
        mrnNo: mrnNo,
      },
    });
    if (response.data.error == "notFound") {
      toast({
        title: "SKU not found!",
        variant: "destructive",
      });
      return false;
    } else {
      return response.data;
    }
  } catch (error) {
    toast({
      title: "Something went wrong!",
      variant: "destructive",
    });
  } finally {
    loader.stopLoading();
  }
};

export const UpdateAndFetchMannualQuantity = async ({
  skuinputvalue,
  skuRadio,
}: {
  skuinputvalue: any;
  skuRadio: any;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  const mrnStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/update-sku-put-away", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        skuinputvalue: skuinputvalue,
        ENTRYBY:   authStore.session.userType,
        skuRadio: skuRadio,
        ...mrnStore.mrn,
      },
    });

    console.log("this updateMAnualQty", response);
if(response.data.success == "1")
    toast({
      title: "Added Successfully.",
      class: "text-green-600"
  })
  if(response.data.success == "2")
    toast({
      title: "Removed Successfully.",
      class: "text-green-600"
  })
  if(response.data.success == "3")
    toast({
      title: "Less Quantity.",
      class: "text-red-600"
  })
    // // if (response.data.error == "notFound") {
    // //   toast({
    // //     title: "SKU not found!",
    // //     variant: "destructive",
    // //   });
    // //   return false;
    // // } else {
    // //   return response.data;
    // // }
  } catch (error) {
    toast({
      title: "Something went wrong!",
      variant: "destructive",
    });
  } finally {
    loader.stopLoading();
  }
};
