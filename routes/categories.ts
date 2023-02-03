import express from "express";
import getCategoryData from "../controllers/getCategoryData";
import getStoreInfo from "../helpers/getStoreInfo";

const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/categories", getStoreInfo, async (req, res) => {
  const storeInfo = req["store_info"] as StoreInfo;

  const payload = {
    route: req.route,
    credentials: req.body.credentials,
    queries: req.query,
    storeInfo,
  };

  try {
    const data = await getCategoryData(payload);
    return res.status(200).send(data);
  } catch (e) {
    return res.status(404).send(e);
  }
});

// /***
//  * @method get
//  * @desc get categories by category path
//  */
// router.get("/api/:storeId/categories/path", async (req, res) => {
//   const store_id = req.params.storeId;
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(403).send();
//   }

//   if (!req.query.path) {
//     return res.status(400).send("Invalid path");
//   }

//   if (!req.query.delimiter) {
//     return res
//       .status(400)
//       .send("Provide the delimiter you are using to separate your categories");
//   }

//   const api = new EcwidApiHelper(store_id, authorization);
//   const searchParams = new URLSearchParams(req.query).toString();

//   try {
//     const category = await api.get("/categories?" + searchParams);

//     return res.status(200).send(category.data);
//   } catch (e: any) {
//     console.log(e);
//     return res
//       .status(e?.response?.status || 404)
//       .send(e?.message || "Failed to fetch (404)");
//   }
// });

// /***
//  * @method get
//  * @desc get category order
//  */
// router.get("/api/:storeId/categories/sort", async (req, res) => {
//   const store_id = req.params.storeId;
//   const { authorization } = req.headers;
//   const { parentCategory } = req.query;

//   if (!authorization) {
//     return res.status(403).send();
//   }

//   const api = new EcwidApiHelper(store_id, authorization);

//   try {
//     const category = await api.get(
//       "/categories/sort?parentCategory=" + parentCategory
//     );

//     return res.status(200).send(category.data);
//   } catch (e: any) {
//     console.log(e);
//     return res
//       .status(e?.response?.status || 404)
//       .send(e?.message || "Failed to fetch (404)");
//   }
// });

// /***
//  * @method get
//  * @desc get categories by id
//  */
// router.get("/api/:storeId/categories/:id", async (req, res) => {
//   const store_id = req.params.storeId;
//   const { authorization } = req.headers;

//   if (!authorization) {
//     return res.status(403).send();
//   }

//   const api = new EcwidApiHelper(store_id, authorization);

//   try {
//     const category = await api.get("/categories", id);

//     return res.status(200).send(category.data);
//   } catch (e: any) {
//     console.log(e);
//     return res
//       .status(e?.response?.status || 404)
//       .send(e?.message || "Failed to fetch (404)");
//   }
// });

export default router;
