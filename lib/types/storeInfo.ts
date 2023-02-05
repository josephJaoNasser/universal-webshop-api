interface StoreInfo {
  id: string | number;
  storeId?: string | number;
  storeUrl?: string;
  source: string;
  token: string;
  credentials: {
    [key: string]: string;
  };
}
