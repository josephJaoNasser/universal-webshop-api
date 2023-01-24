const e = require("express");
const express = require("express");
const EcwidApiHelper = require("../helpers/EcwidApiHelper");
const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/:storeId/products", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;

  const api = new EcwidApiHelper(store_id, authorization);

  try {
    const products = await api.get("/products");

    return res.status(200).send(products.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc search for a product by keyword/s
 */
router.get("/api/:storeId/products/search", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;
  const api = new EcwidApiHelper(store_id, authorization);

  try {
    const product = await api.get("/products?keyword=" + keyword);

    return res.status(200).send(product.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc filter products (see ecwid api docs)
 */
router.get("/api/:storeId/products/filter", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;
  const api = new EcwidApiHelper(store_id, authorization);
  const searchParams = new URLSearchParams(req.query).toString();

  try {
    const products = await api.get("/products?" + searchParams);

    return res.status(200).send(products.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc get a product by id
 */
router.get("/api/:storeId/products/:id", async (req, res) => {
  const id = req.params.id;
  const store_id = req.params.storeId;
  const { authorization } = req.headers;
  const api = new EcwidApiHelper(store_id, authorization);

  try {
    const product = await api.get("/products", id);

    return res.status(200).send(product.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

router.post("/api/:storeId/products", async (req, res) => {});

router.patch("/api/:storeId/products/:id", async (req, res) => {});

router.delete("/api/:storeId/products/:id", async (req, res) => {});

module.exports = router;
