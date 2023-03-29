import express from "express";
import webhookControllers from "@/controllers/webhookControllers";
import getStoreInfo from "@/lib/helpers/getStoreInfo";

const router = express.Router();

router.post("/api/webhook", async (req, res) => {
  const encryptedId =
    (req.headers["x-webshop-encryptedid"] as string) ||
    (req.headers["x-webshop-encryptedId"] as string) ||
    (req.headers["x-webshop-encrypted-id"] as string);

  try {
    const storeInfo = await getStoreInfo({
      id: encryptedId,
    });

    const source = storeInfo.source; //req.headers["x-webshop-source"] as string;

    await webhookControllers[source as string](req, storeInfo);

    return res.status(200).send("Webhook has been executed");
  } catch (e) {
    console.error({ err: e });
    return res.status(200).send("Webhook has failed");
  }
});

export default router;
