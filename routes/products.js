const express = require("express");
const ecommerce = require("../helpers/ecwidAPI");
const router = express.Router();

router.get("/api/products", async (req, res) => {
  try {
    const products = await ecommerce.cart.get();
    return res.status(200).send(products);
  } catch (e) {
    console.log(e);
    return res.status(404).json({ ...e });
  }
});

router.get("/api/products/:id", async (req, res) => {});

router.post("/api/products", async (req, res) => {});

router.patch("/api/products/:id", async (req, res) => {});

router.delete("/api/products/:id", async (req, res) => {});

module.exports = router;
