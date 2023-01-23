const express = require("express");
const api = require("../helpers/ecwidAPI");
const router = express.Router();

/***
 * @method get
 * @desc get all products
 */
router.get("/api/products", async (req, res) => {
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
router.get("/api/products/search", async (req, res) => {
  const { keyword } = req.query;

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
router.get("/api/products/filter", async (req, res) => {
  const queryKeys = [
    "priceFrom",
    "priceTo",
    "categories",
    "includeProductsFromSubcategories",
    "sortBy",
    "limit",
    "offset",
  ];

  let route = "/products";

  for (let index in queryKeys) {
    const key = queryKeys[index];
    if (req.query[key]) {
      route += route.includes("?") ? "&" : "?";
      route += key + "=" + req.query[key].replace(" ", "%20");
    }
  }

  try {
    const products = await api.get(route);

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
router.get("/api/products/:id", async (req, res) => {
  const { id } = params.id;
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

router.post("/api/products", async (req, res) => {});

router.patch("/api/products/:id", async (req, res) => {});

router.delete("/api/products/:id", async (req, res) => {});

module.exports = router;
