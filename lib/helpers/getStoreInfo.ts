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
  /** Replace this with an API call, either find by id or find by store source + token */

  let storeInfo = shopInfoObj[id];
  if (!storeInfo) {
    const res: AxiosResponse<number[]> = await axios.get(
      process.env.SITE_BUILDER_API + `/shop/info?storeId=${id}&access_token=${process.env.SITE_BUILDER_TOKEN}`);

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
