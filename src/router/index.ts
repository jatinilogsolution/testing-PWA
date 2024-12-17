import MainLayout from "@/components/layout/main-layout.vue";
import { useAuthStore } from "@/store/authStore";
import Dashboard from "@/views/Dashboard.vue";
import ASNScan from "@/views/inbound/ASNScan.vue";
import Inbound from "@/views/inbound/Inbound.vue";
import InboundDocument from "@/views/inbound/InboundDocument.vue";
import Putaway from "@/views/inbound/Putaway.vue";
import PutAwayChild from "@/views/inbound/PutAwayChild.vue";
import Receiving from "@/views/inbound/Receiving.vue";
import Inventory from "@/views/inventory/Inventory.vue";
import Login from "@/views/Login.vue";
import DocumentUpload from "@/views/outbound/DocumentUpload.vue";
import Outbound from "@/views/outbound/Outbound.vue";
import Picklist from "@/views/outbound/Picklist.vue";
import AilseList from "@/views/outbound/picklist/AilseList.vue";
import RackList from "@/views/outbound/picklist/RackList.vue";
import RackListData from "@/views/outbound/picklist/RackListData.vue";
import PickListChild from "@/views/outbound/PickListChild.vue";
import VehicleOutUpload from "@/views/outbound/VehicleOutUpload.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "/dashboard", name: "dashboard", component: Dashboard },
        // { path: "/master", name: "master", component: Master },
      ],
    },
    {
      path: "/inbound",
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: "", name: "Inbound", component: Inbound },

        { path: "receiving", name: "Receiving", component: Receiving },
        { path: "asn-scan", name: "AsnScan", component: ASNScan },
        { path: "put-away", name: "PutAway", component: Putaway },
        {
          path: "/put-away/:id",
          name: "PutAwayChild",
          component: PutAwayChild,
        },
        {
          path: "inbound-document",
          name: "InboundDocument",
          component: InboundDocument,
        },
      ],
    },
    {
      path: "/outbound",
      component: MainLayout,
      meta: { requiredAuth: true },
      children: [
        { path: "", name: "Outbound", component: Outbound },
        { path: "pick-list", name: "PickList", component: Picklist },
        {
          path: "pick-list/:id",
          name: "PickListChildParent",
          children: [
            { path: "", name: "PickListChild", component: PickListChild },
            { path: "ailse-list", name: "AilseList", component: AilseList },
            { path: "rack-list", name: "RackList", component: RackList },
            {
              path: "rack-list/:id",
              name: "RackListData",
              component: RackListData,
            },
          ],
        },

        {
          path: "document-upload",
          name: "DocUpload",
          component: DocumentUpload,
        },
        {
          path: "wechile-out-upload",
          name: "VehicleOutUpload",
          component: VehicleOutUpload,
        },
        //   { path: "picklist", name: "PickList", component: PickList },
        //   {
        //     path: "picklist-retail",
        //     name: "PicklistRetail",
        //     component: PickListRetail,
        //   },
        //   {
        //     path: "shipment-docs-outbound",
        //     name: "ShipmentDocsOutBound",
        //     component: ShipmentDocsOutbound,
        //   },
        //   {
        //     path: "shipment-images-outbound",
        //     name: "ShipmentImagesOutBound",
        //     component: ShipmentImagesOutbound,
        //   },
        //   {
        //     path: "shipment-images-outbound/:id",
        //     name: "ShipmentImgOutBoundChild",
        //     component: ShipmentImagesOutBoundChild,
        //   },
        //   {
        //     path: "shipment-docs-outbound/:id",
        //     name: "ShipmentDocsOutBoundChild",
        //     component: ShipmentDocsOutBoundChild,
        //   },
      ],
    },
    {
      path: "/inventory",
      component: MainLayout,
      meta: { requiredAuth: true },
      children: [
        { path: "", name: "Inventory", component: Inventory },
        //   { path: "bin-to-bin", name: "BinToBin", component: BinToBinTransfer },
        //   {
        //     path: "bin-to-Location",
        //     name: "BinToLocation",
        //     component: BinToLocationTransfer,
        //   },
        //   { path: "cycle-Count", name: "CycleCount", component: CycleCount },
        //   {
        //     path: "hu-count-Data",
        //     name: "HUCountData",
        //     component: HUContentData,
        //   },
        //   {
        //     path: "identify-serial",
        //     name: "IdentifySerial",
        //     component: IdentifySerial,
        //   },
        //   {
        //     path: "identify-sku-bin",
        //     name: "IdentifySKUBin",
        //     component: IdentifySKUBin,
        //   },
        //   { path: "stock-count", name: "StockCount", component: StockCount },
        //   { path: "call-away", name: "Callaway", component: CallAway },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    // { path: "/:pathMatch(.*)*", name: "notfound", component: NotFound },
  ],
});

const getAuth = () => {
  const store = useAuthStore();

  const user: boolean =
    store.isAuthenticated || sessionStorage.getItem("token") ? true : false;
  return user;
};

router.beforeEach(async (to, _from, next) => {
  const user: boolean = getAuth();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (user && to.name === "login") {
      // alert(`You are already ${to.name} .`);
      next("/");
    } else {
      next();
    }
  }
});

export default router;
