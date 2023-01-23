const express = require("express");
const api = require("../helpers/ecwidAPI");
const router = express.Router();

/***
 * @method get
 * @desc get all categories
 */
router.get("/api/categories", async (req, res) => {
  try {
    const categories = await api.get("/categories");

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
 * @desc get categories by id
 */
router.get("/api/categories/:id", async (req, res) => {
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

router.post("/api/categories", async (req, res) => {});

router.patch("/api/categories/:id", async (req, res) => {});

router.delete("/api/categories/:id", async (req, res) => {});

module.exports = router;
