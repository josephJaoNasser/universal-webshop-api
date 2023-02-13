interface GetStoreParams {
  id?: string;
  token?: string;
  storeSource?: string;
}

export default async function getStoreInfo({
  id,
  token,
  storeSource,
}: GetStoreParams): Promise<StoreInfo> {
  /** Replace this with an API call, either find by id or find by store source + token */
  const storeInfo: StoreInfo = {
    id: 1,
    storeId: process.env.ECWID_STORE_ID,
    source: "ecwid",
    token: "asd123456xyz",
    credentials: {
      token: process.env.ECWID_TOKEN as string,
    },
  };

  /** change this condition, if !storeInfo */
  if (id != "1" && token !== "asd123456xyz" && storeSource !== "ecwid") {
    throw new Error("Store does not exist");
  }

  if (!token || token !== storeInfo.token) {
    storeInfo.token = "";
    storeInfo.credentials = {};

    return storeInfo;
  }

  return storeInfo;
}
