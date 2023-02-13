import express from "express";
import webhookControllers from "@/controllers/webhookControllers";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const source = req.headers["x-webshop-source"];
  const token = req.headers["x-webshop-token"];

  try {
    await webhookControllers[source as string](req, token);
    return res.status(200).send("Webhook has been executed");
  } catch (e) {
    console.error({ err: e });
    return res.status(200).send("Webhook has failed");
  }
});

export default router;
