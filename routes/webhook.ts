import express from "express";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const source = req.headers["x-webshop-source"];
  const token = req.headers["x-webshop-token"];

  try {
    console.log("A webshop has connected to the webhook");
    console.log(source);
    console.log({ body: req.body });
    return res.status(200).send("Webhook has been executed");
  } catch (e) {
    console.error({ err: e });
    return res.status(200).send("Webhook has failed");
  }
});

export default router;
