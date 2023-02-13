import categoryWebhookHandler from "./categoryWebhook";
import productWebhookHandler from "./productWebhook";
import { Request } from "express";
import EcwidWebhookRequest, {
  EcwidEventCategory,
} from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";

const handlers = {
  product: productWebhookHandler,
  category: categoryWebhookHandler,
};

export default async function handleEcwidWebhook(req: Request, token: string) {
  const webhookBody = req.body as EcwidWebhookRequest;
  const handlerType = webhookBody.eventType.split(".")[0] as EcwidEventCategory;

  try {
    await handlers[handlerType](webhookBody, token);
    return;
  } catch (e) {
    throw e;
  }
}
