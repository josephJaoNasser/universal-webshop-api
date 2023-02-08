import { AxiosError } from "axios";
import express from "express";
import { Params } from "@/controllers";
import getStoreInfo from "../middleware/getStoreInfo";
import cartControllers from "@/controllers/cartControllers";

const router = express.Router();

router.get("/api/:storeId/cart/:cartId", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getAll",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
    id: req.params.cartId,
  };

  try {
    const data = await cartControllers[storeInfo.source](payload);
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching cart data");
  }
});

export default router;
