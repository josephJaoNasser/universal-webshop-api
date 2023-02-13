import express from "express";
import webhookControllers from "@/controllers/webhookControllers";
import getStoreInfo from "@/lib/getStoreInfo";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const source = req.headers["x-webshop-source"] as string;
  const token = req.headers["x-webshop-token"] as string;

  const storeInfo = await getStoreInfo({ storeSource: source, token });

  try {
    await webhookControllers[source as string](req, storeInfo);
    return res.status(200).send("Webhook has been executed");
  } catch (e) {
    console.error({ err: e });
    return res.status(200).send("Webhook has failed");
  }
});

export default router;
