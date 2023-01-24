const express = require("express");
const EcwidApiHelper = require("../helpers/EcwidApiHelper");
const router = express.Router();

/***
 * @method get
 * @desc get all categories
 */
router.get("/api/:storeId/categories", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;

  const api = new EcwidApiHelper(store_id, authorization);

  let searchParams = "";
  if (Object.keys(req.query).length) {
    searchParams += "?"
    searchParams += new URLSearchParams(req.query).toString();
  }

  try {
    const categories = await api.get("/categories" + searchParams);

    return res.status(200).send(categories.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc get categories by category path
 */
router.get("/api/:storeId/categories/path", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;

  if (!req.query.path) {
    return res.status(400).send("Invalid path");
  }

  if (!req.query.delimiter) {
    return res
      .status(400)
      .send("Provide the delimiter you are using to separate your categories");
  }

  const api = new EcwidApiHelper(store_id, authorization);
  const searchParams = new URLSearchParams(req.query).toString();

  try {
    const category = await api.get("/categories?" + searchParams);

    return res.status(200).send(category.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc get category order
 */
router.get("/api/:storeId/categories/sort", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;
  const { parentCategory } = req.query;

  const api = new EcwidApiHelper(store_id, authorization);

  try {
    const category = await api.get(
      "/categories/sort?parentCategory=" + parentCategory
    );

    return res.status(200).send(category.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

/***
 * @method get
 * @desc get categories by id
 */
router.get("/api/:storeId/categories/:id", async (req, res) => {
  const store_id = req.params.storeId;
  const { authorization } = req.headers;

  const api = new EcwidApiHelper(store_id, authorization);

  try {
    const category = await api.get("/categories", id);

    return res.status(200).send(category.data);
  } catch (e) {
    console.log(e);
    return res
      .status(e?.response?.status || 404)
      .send(e?.message || "Failed to fetch (404)");
  }
});

router.post("/api/:storeId/categories", async (req, res) => {});

router.patch("/api/:storeId/categories/:id", async (req, res) => {});

router.delete("/api/:storeId/categories/:id", async (req, res) => {});

module.exports = router;
