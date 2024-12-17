import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/authStore";
import { useLoaderStore } from "@/store/loaderStore";
import axiosClient from "./api";

export const fetchPickList = async ({
  pickList,
  currentPage,
  page,
}: {
  pickList: string;
  currentPage?: any;
  page?: any;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  //   const putAwayStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/pending-pick-list", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        picklistcontrol: pickList,
        page: currentPage ?? 1,
        per_page: page ?? 10,
      },
    });
     if (response.data.error == "NorFound") {
      toast({
        title: "No PickList found!",
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

export const fetchZone = async ({ refNo }: { refNo: string }) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  //   const putAwayStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/pending-pick-list-box", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        refNo: refNo,
      },
    });
    if (response.data.picklist.error == "noReocrd") {
      toast({
        title: "No Zone found!",
        variant: "destructive",
      });
      return false;
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

export const fetchFindAilse = async ({
  refNo,
  zone,
}: {
  refNo: string;
  zone: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  //   const putAwayStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/get-ailes", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        REF_NO: refNo,
        zone: zone,
      },
    });
    if (response.data.error == "noReocrd") {
      toast({
        title: "No Zone found!",
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

export const fetchRackList = async ({
  refNo,
  zone,
  dnno,
  tq,
  ts,
  ailes,
}: {
  refNo: string;
  zone: string;
  dnno: string;
  tq: string;
  ts: string;
  ailes: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();
  //   const putAwayStore = usePutawayStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/get-rack", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        refNo: refNo,
        zoneBarCode: zone,
        dnno: dnno,
        tq: tq,
        ts: ts,
        ailes: ailes,
      },
    });
    if (response.data.error == "noReocrd") {
      toast({
        title: "No Rack found!",
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

export const fetchRackLocation = async ({
  inv,
  dnno,
  rack,
  zone,
  tq,
  ts,
  location,
  page,
}: {
  inv: string;
  zone: string;
  dnno: string;
  tq: string;
  ts: string;
  rack: string;
  location: string;
  page: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/get-rack-location", {
      params: {
        warehouseId: authStore.session.warehouseId,
        inv: inv,
        zone: zone,
        dnno: dnno,
        tq: tq,
        ts: ts,
        rack: rack,
        location: location,
        page: page,
      },
    });
    if (response.data.data.length == 0) {
      toast({
        title: "No Rack Location found!",
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

export const updateSQUQTY = async ({
  dnno,
  sku,
  batchNo,
  wlocation,
  qty,
  page,
}: {
  sku: string;
  batchNo: string;
  dnno: string;
  wlocation: string;
  qty: string;

  page: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/update-sku-qty-value-hht", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        userid: sessionStorage.getItem("userType") as any,
        dnno,
        sku,
        batchNo,
        wlocation,
        qty,
        page: page,
      },
    });
    if (response.data.error == "err") {
      toast({
        title:
          "Picking Data Retail Record could not be updated due to negative quantity Or quantity is greater!",
        variant: "destructive",
      });
    } else if (response.data.error == "notFound") {
      toast({
        title: "No SKU found!",
        variant: "destructive",
      });
    } else if (response.data == "") {
      toast({
        title: "No SKU found!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "SKU Updated!",
        class: " text-green-600 font-semibold",
      });

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


export const UpdateAndFetchPickListMannualQuantity =async ({
  dnno,
  sku,
  batchNo,
  wlocation,
  qty,
  page,
  skuRadioButton
}: {
  sku: string;
  batchNo: string;
  dnno: string;
  wlocation: string;
  qty: string;
  skuRadioButton: string
  page: string;
}) => {
  const { toast } = useToast();

  const authStore = useAuthStore();
  const loader = useLoaderStore();

  try {
    loader.startLoading();
    const response = await axiosClient.get("/update-sku-qty-value", {
      params: {
        warehouseId: authStore.session.warehouseId,
        clientId: authStore.session.clientId,
        userid: sessionStorage.getItem("userType") as any,
        dnno,
        sku,
        batchNo,
        wlocation,
        qty,
        skuModel: "skuModel",
        skuRadioButton: skuRadioButton,
        page: page,
      },
    });
    if (response.data.error == "err") {
      toast({
        title:
          "Picking Data Retail Record could not be updated due to negative quantity Or quantity is greater!",
        variant: "destructive",
      });
    } else if (response.data.error == "notFound") {
      toast({
        title: "No SKU found!",
        variant: "destructive",
      });
    } else if (response.data == "") {
      toast({
        title: "No SKU found!",
        variant: "destructive",
      });
    } else {
      toast({
        title: "SKU Updated!",
        class: " text-green-600 font-semibold",
      });

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