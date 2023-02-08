import EcwidApi from "@/lib/apiKit/Ecwid";
import { ConvertedOrderPayload } from "@/lib/apiKit/Ecwid/cart";
import OrderEntry from "@/lib/apiKit/Ecwid/types/Order/Order";
import { Params } from "..";

type EcwidCartResponse =
  | OrderEntry
  | ConvertedOrderPayload
  | { updateCount: number };

export default async function ecwidCartHandler({
  method,
  credentials,
  storeInfo,
  queries,
  id,
  payload,
}: Params): Promise<EcwidCartResponse> {
  if (!credentials.token) {
    throw new Error("No token provided");
  }

  if (!storeInfo.storeId) {
    throw new Error("No store ID provided");
  }

  try {
    const Ecwid = new EcwidApi(storeInfo.storeId as number, credentials.token);

    if (method === "updateCart") {
      Ecwid.Cart.setCartPayload(payload);
      return await Ecwid.Cart.updateCart({ id: id as number });
    }

    if (method === "calculateOrderDetails") {
      Ecwid.Cart.setCartPayload(payload);
      return await Ecwid.Cart.calculateOrderDetails();
    }

    return await Ecwid.Cart[method]({ id: id as number });
  } catch (e) {
    throw e;
  }
}
