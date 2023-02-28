import syncStore, { syncStoreProducts } from "@/lib/helpers/syncStore";
import express from "express";
import verifyStore from "../middleware/verifyStore";

const router = express.Router();

/***
 * @method get
 * @desc Sync everything. Products, Categories, etc.
 */
router.get("/api/sync", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  try {
    await syncStore(storeInfo);
    return res.status(200).send("All store pages have been synced");
  } catch (e: any) {
    console.error({ e });
    return res
      .status(e.response?.status || 404)
      .send(e.response?.data || "Error when syncing store");
  }
});

/***
 * @method get
 * @desc Sync products.
 */
router.get("/api/sync/products", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  try {
    await syncStoreProducts(storeInfo);
    return res.status(200).send("All store products have been synced");
  } catch (e: any) {
    console.error({ e });
    return res
      .status(e.response?.status || 404)
      .send(e.response?.data || "Error when syncing store");
  }
});

/***
 * @method get
 * @desc Sync categories.
 */
router.get("/api/sync/categories", verifyStore, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  try {
    return res.status(200).send("This function is not available yet");
  } catch (e: any) {
    console.error({ e });
    return res
      .status(e.response?.status || 404)
      .send(e.response?.data || "Error when syncing store");
  }
});

export default router;
