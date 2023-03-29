import axios, { AxiosResponse } from "axios";

interface GetStoreParams {
  id?: string;
}

interface StoreDBResponse {
  success: boolean;
  payload: StoreInfo;
}

export default async function getStoreInfo({
  id,
}: GetStoreParams): Promise<StoreInfo> {
  try {
    const res: AxiosResponse<StoreDBResponse> = await axios.get(
      `https://www.uptodateconnect.com/api/v1/shop/info?access_token=${process.env.UTD_SHOP_DB_TOKEN}&storeId=${id}`
    );

    const storeInfo = res.data.payload;

    if (!storeInfo) {
      throw new Error("Store does not exist");
    }

    return storeInfo;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
