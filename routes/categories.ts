import { AxiosError } from "axios";
import express from "express";
import { Params } from "@/controllers";
import verifyStore from "../middleware/verifyStore";
import StandardizedCategory from "../lib/types/StandardizedCategory";
import categoryControllers from "@/controllers/categoryControllers";

const router = express.Router();

/***
 * @method get
 * @desc get all categories
 */
router.get("/api/:storeId/categories", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getAll",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await categoryControllers[storeInfo.source](
      payload
    )) as StandardMultiItemResponse<StandardizedCategory>;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.error({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching categories");
  }
});

/***
 * @method get
 * @desc get categories by category path
 */
router.get("/api/:storeId/categories/path", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getByPath",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await categoryControllers[storeInfo.source](
      payload
    )) as StandardMultiItemResponse<StandardizedCategory>;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.error({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching categories");
  }
});

/***
 * @method get
 * @desc get category order
 */
router.get("/api/:storeId/categories/sort", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getSorted",
    credentials: storeInfo.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = (await categoryControllers[storeInfo.source](
      payload
    )) as number[];
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.error({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching categories");
  }
});

/***
 * @method get
 * @desc get categories by id
 */
router.get("/api/:storeId/categories/:id", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload: Params = {
    method: "getById",
    credentials: storeInfo.credentials,
    id: req.params.id,
    storeInfo,
  };

  try {
    const data = (await categoryControllers[storeInfo.source](
      payload
    )) as StandardizedCategory;
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.error({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.response?.data || "Error when fetching categories");
  }
});

export default router;
