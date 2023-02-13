import EcwidApi from "@/lib/apiKit/Ecwid";
import EcwidWebhookRequest, { EcwidEventAction } from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";
import getStoreInfo from "@/lib/getStoreInfo";

export default async function ecwidProductWebhook(
  webhookRequest: EcwidWebhookRequest,
  token: string
) {
  try {
    const storeInfo = await getStoreInfo(webhookRequest.storeId, token);
    const Ecwid = new EcwidApi(
      storeInfo.storeId as number,
      storeInfo.credentials.token as string
    );

    const updatedOrCreatedProduct = await Ecwid.Categories.getById({
      id: webhookRequest.entityId,
    });

    const action = webhookRequest.eventType.split(".")[1] as EcwidEventAction;

    if (action === "created") {
      // do something when a product was created
      console.log("product created")
      return;
    }

    if (action === "updated") {
      // do something when a product was updated
      console.log("product updated")
      return;
    }

    if (action === "deleted") {
      // do something when a product was deleted
      console.log("product deleted")
      return;
    }
  } catch (e) {
    throw e;
  }
}
