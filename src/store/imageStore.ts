import { defineStore } from "pinia";
import { ref } from "vue";

export const useReceivingStore = defineStore("ReceveingStore", () => {
  // inbound
  const vehicleImage = ref<string>("");
  const vehicleSealImage = ref<string>("");
  const vehicleNumberPlateImage = ref<string>("");
  const materialLoadedImage1 = ref<string>("");
  const materialLoadedImage2 = ref<string>("");
  const materialLoadedImage3 = ref<string>("");
  const vehicleImageFile = ref<File | null>(null);
  const vehicleSealImageFile = ref<File | null>(null);
  const vehicleNumberPlateImageFile = ref<File | null>(null);
  const materialLoadedImage1File = ref<File | null>(null);
  const materialLoadedImage2File = ref<File | null>(null);
  const materialLoadedImage3File = ref<File | null>(null);

  const handleVehicleImage = (value: string, file: File) => {
    vehicleImage.value = value;
    vehicleImageFile.value = file;
    return file;
  };
  const handleVehicleSealImage = (value: string, file: File) => {
    vehicleSealImage.value = value;
    vehicleSealImageFile.value = file;
    return file;
  };
  const handleVehicleNumberPlateImage = (value: string, file: File) => {
    vehicleNumberPlateImage.value = value;
    vehicleNumberPlateImageFile.value = file;
    return file;
  };
  const handleMaterialLoadedImage1 = (value: string, file: File) => {
    materialLoadedImage1.value = value;
    materialLoadedImage1File.value = file;
    return file;
  };
  const handleMaterialLoadedImage2 = (value: string, file: File) => {
    materialLoadedImage2.value = value;
    materialLoadedImage2File.value = file;
    return file;
  };
  const handleMaterialLoadedImage3 = (value: string, file: File) => {
    materialLoadedImage3.value = value;
    materialLoadedImage3File.value = file;
    return file;
  };

  const storeReset = () => {
    vehicleImage.value = "";
    vehicleSealImage.value = "";
    vehicleNumberPlateImage.value = "";
    materialLoadedImage1.value = "";
    materialLoadedImage2.value = "";
    materialLoadedImage3.value = "";
    vehicleImageFile.value = null;
    vehicleSealImageFile.value = null;
    vehicleNumberPlateImageFile.value = null;
    materialLoadedImage1File.value = null;
    materialLoadedImage2File.value = null;
    materialLoadedImage3File.value = null;
  };

  return {
    // inbound
    vehicleImage,
    vehicleSealImage,
    vehicleNumberPlateImage,
    materialLoadedImage1,
    materialLoadedImage2,
    materialLoadedImage3,
    handleVehicleImage,
    handleVehicleSealImage,
    handleVehicleNumberPlateImage,
    handleMaterialLoadedImage1,
    handleMaterialLoadedImage2,
    handleMaterialLoadedImage3,
    storeReset,
    vehicleImageFile,
    vehicleSealImageFile,
    vehicleNumberPlateImageFile,
    materialLoadedImage1File,
    materialLoadedImage2File,
    materialLoadedImage3File,
  };
});

// export const useOutboundStore = defineStore("Outbound", () => {
//   // inbound
//   const invoiceDocument = ref();
//   const lrDocument = ref();
//   const boe = ref();
//   const otherDocuments = ref();
//   const invoiceDocumentFile = ref();
//   const lrDocumentFile = ref();
//   const boeFile = ref();
//   const otherDocumentsFile = ref();
//   const handleInvoiceDocument = (value: string, file: File) => {
//     invoiceDocument.value = value;
//     invoiceDocumentFile.value = value;
//     return file;
//   };
//   const handleLRDocument = (value: string, file: File) => {
//     lrDocument.value = value;
//     lrDocumentFile.value = value;
//     return file;
//   };
//   const handleBOE = (value: string, file: File) => {
//     boe.value = value;
//     boeFile.value = value;
//     return file;
//   };
//   const handleOtherDocuments = (value: string, file: File) => {
//     otherDocuments.value = value;
//     otherDocumentsFile.value = value;
//     return file;
//   };

//   const storeReset = () => {
//     invoiceDocument.value = "";
//     lrDocument.value = "";
//     boe.value = "";
//     otherDocuments.value = "";

//     invoiceDocumentFile.value = "";
//     lrDocumentFile.value = "";
//     boeFile.value = "";
//     otherDocumentsFile.value = "";
//   };
//   return {
//     // inbound
//     lrDocumentFile,
//     invoiceDocument,
//     invoiceDocumentFile,

//     lrDocument,
//     boe,
//     otherDocuments,
//     handleInvoiceDocument,
//     handleLRDocument,
//     handleBOE,
//     handleOtherDocuments,
//     storeReset,
//     otherDocumentsFile,
//     boeFile,
//   };
// });
