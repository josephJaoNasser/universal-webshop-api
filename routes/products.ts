import { AxiosError } from "axios";
import express from "express";
import getProductData from "../controllers/getProductData";
import getStoreInfo from "../helpers/getStoreInfo";

const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/products", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    route: req.route,
    credentials: req.body.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = await getProductData(payload);
    return res.status(200).send(data);
  } catch (e: any) {
    const err: AxiosError = e;
    console.log({ err });
    return res
      .status(err.response?.status || 404)
      .send(err.message || "Error when fetching products");
  }
});

/***
 * @method get
 * @desc search for a product by keyword/s
 */
router.get("/api/:storeId/products/search", async (req, res) => {});

// /***
//  * @method get
//  * @desc filter products (see ecwid api docs)
//  */
// router.get("/api/:storeId/products/filter", async (req, res) => {
//   const store_id = req.params.storeId;
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(403).send();
//   }

//   const api = new EcwidApiHelper(store_id, authorization);
//   const searchParams = new URLSearchParams(req.query).toString();

//   try {
//     const products = await api.get("/products?" + searchParams);

//     return res.status(200).send(products.data);
//   } catch (e: any) {
//     console.log(e);
//     return res
//       .status(e?.response?.status || 404)
//       .send(e?.message || "Failed to fetch (404)");
//   }
// });

// /***
//  * @method get
//  * @desc get a product by id
//  */
// router.get("/api/:storeId/products/:id", async (req, res) => {
//   const id = req.params.id;
//   const store_id = req.params.storeId;
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(403).send();
//   }

//   const api = new EcwidApiHelper(store_id, authorization);

//   try {
//     const product = await api.get("/products", id);

//     return res.status(200).send(product.data);
//   } catch (e: any) {
//     console.log(e);
//     return res
//       .status(e?.response?.status || 404)
//       .send(e?.message || "Failed to fetch (404)");
//   }
// });

export default router;
