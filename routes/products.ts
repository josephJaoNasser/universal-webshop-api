import { AxiosError } from "axios";
import express from "express";
import productControllers from "@/controllers/productControllers";
import verifyStore from "../middleware/verifyStore";
import StandardizedProduct from "../lib/types/StandardizedProduct";
import { Params } from "@/controllers";

const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/products", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getAll",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await productControllers[storeInfo.source](
      payload
    )) as StandardMultiItemResponse<StandardizedProduct>;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching products");
  }
});

/***
 * @method get
 * @desc search for a product by keyword/s
 */
router.get("/api/:storeId/products/search", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "searchByKeywords",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await productControllers[storeInfo.source](
      payload
    )) as StandardMultiItemResponse<StandardizedProduct>;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching products");
  }
});

/***
 * @method get
 * @desc filter products (see ecwid api docs)
 */
router.get("/api/:storeId/products/filter", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "searchByFilters",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await productControllers[storeInfo.source](
      payload
    )) as StandardMultiItemResponse<StandardizedProduct>;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching products");
  }
});

/***
 * @method get
 * @desc get a product by id
 */
router.get("/api/:storeId/products/:id", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getById",
    credentials: storeInfo.credentials,
    id: req.params.id,
    storeInfo,
  };

  try {
    const data = (await productControllers[storeInfo.source](payload)) as StandardizedProduct;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching products");
  }
});

export default router;
