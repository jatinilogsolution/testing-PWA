export interface userLoginProps {
  username: string;
  password: string;
}

export interface ASNScanDataProps {
  ASNQTY: string;
  ASN_NO: string;
  CustID: string;
  InvoiceNO: string;
  PONO: string;
  ScanQty: string;
  TOTSKUCODEV: string;
  WH: string;
}

interface SkuItem {
  totalRows: string;
  SKU: string;
  batchno: string;
  ASNQTY: string;
  ScanQty: string;
  BalanceFOrScan: string;
}

interface ScanQtyTotal {
  scanqty: string;
}

export interface SkuData {
  canQtyTotalvalues: ScanQtyTotal[];
  sku: SkuItem[];
  success: string;
  total: number;
}

export interface ASNDataProps {
  searchAsn?: any;
  currentPage?: any;
  page?: any;
  updateCurrentASN?: false |boolean;
}
