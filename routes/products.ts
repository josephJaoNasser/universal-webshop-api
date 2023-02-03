import { AxiosError } from "axios";
import express from "express";
import getProductData from "../controllers/getProductData";
import getStoreInfo from "../helpers/getStoreInfo";
import StandardizedProduct from "../lib/types/StandardizedProduct";

const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/products", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    method: "getAll",
    credentials: req.body.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await getProductData(
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
router.get("/api/:storeId/products/search", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    method: "searchByKeywords",
    credentials: req.body.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await getProductData(
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
router.get("/api/:storeId/products/filter", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    method: "searchByFilters",
    credentials: req.body.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await getProductData(
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
router.get("/api/:storeId/products/:id", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    method: "getById",
    credentials: req.body.credentials,
    id: req.params.id,
    storeInfo,
  };

  try {
    const data = (await getProductData(payload)) as StandardizedProduct;
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
