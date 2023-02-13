import EcwidApi from "@/lib/apiKit/Ecwid";
import EcwidWebhookRequest, {
  EcwidEventAction,
} from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";

export default async function ecwidCategoryWebhook(
  webhookRequest: EcwidWebhookRequest,
  storeInfo: StoreInfo
) {
  try {
    const Ecwid = new EcwidApi(
      storeInfo.storeId as number,
      storeInfo.credentials.token as string
    );

    const updatedOrCreatedCategory = await Ecwid.Categories.getById({
      id: webhookRequest.entityId,
    });

    const action = webhookRequest.eventType.split(".")[1] as EcwidEventAction;

    if (action === "created") {
      // do something when a category was created
      console.log("category created");
      return;
    }

    if (action === "updated") {
      // do something when a category was updated
      console.log("category updated");
      return;
    }

    if (action === "deleted") {
      // do something when a category was deleted
      console.log("category deleted");
      return;
    }
  } catch (e) {
    throw e;
  }
}
