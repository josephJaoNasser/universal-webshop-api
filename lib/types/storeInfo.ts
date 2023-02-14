interface StoreInfo {
  id: string | number;
  encryptedId?: string;
  storeId?: string | number;
  storeUrl?: string;
  source: string;
  builder_token: string;
  credentials: {
    [key: string]: string;
  };
  siteId: string;
  locationPageIdSource: number;
}
