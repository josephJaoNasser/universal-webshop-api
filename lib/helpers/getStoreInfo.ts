import axios, { AxiosResponse } from "axios";
import { shopInfoObj } from "./store";
interface GetStoreParams {
  id?: string;
  storeId?: string;
  storeSource?: string;
}

export default async function getStoreInfo({
  id,
  storeId,
  storeSource,
}: GetStoreParams): Promise<StoreInfo> {
  let storeInfo: StoreInfo = shopInfoObj[id as string];
  if (!storeInfo) {
    const res: AxiosResponse<any> = await axios.get(
      process.env.SITE_BUILDER_API +
        `/shop/info?storeId=${id}&access_token=${process.env.SITE_BUILDER_TOKEN}`
    );

    if (res.data.success) {
      const payload = res.data.payload;
      shopInfoObj[payload.encryptedId] = payload;
      storeInfo = payload;
    } else {
      throw new Error("Store does not exist");
    }
  }

  return storeInfo;
}
