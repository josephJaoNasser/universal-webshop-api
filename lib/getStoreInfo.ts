export default async function getStoreInfo(
  id,
  token?: string
): Promise<StoreInfo> {
  /** Replace this with an API call */
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
  if (id != 1) {
    throw new Error("Store does not exist");
  }

  if (!token || token !== storeInfo.token) {
    storeInfo.token = "";
    storeInfo.credentials = {};

    return storeInfo;
  }

  return storeInfo;
}
