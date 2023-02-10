import express from "express";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const source = req.headers["x-webshop-source"];
  const token = req.headers["x-webshop-token"];
  
  try {
    return res.status(200).send()
  } catch (e) {
    console.log(e);
    return res.status(200).send();
  }
});

export default router;
