import EcwidApi from "@/lib/apiKit/Ecwid";
import EcwidWebhookRequest, {
  EcwidEventAction,
} from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";
import axios from "axios";

export default async function ecwidProductWebhook(
  webhookRequest: EcwidWebhookRequest,
  storeInfo: StoreInfo
) {
  try {
    const Ecwid = new EcwidApi(
      storeInfo.storeId as number,
      storeInfo.credentials.token as string
    );

    const updatedOrCreatedProduct = await Ecwid.Products.getById({
      id: webhookRequest.entityId,
    });

    const action = webhookRequest.eventType.split(".")[1] as EcwidEventAction;

    if (action === "created") {
      const utdRes = await axios.post(
        "https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
          storeInfo.siteId +
          "?access_token=" +
          storeInfo.builder_token,
        {
          syncId: updatedOrCreatedProduct.original_id,
          bloggerId: "2245555036362307138",
          payload: {
            locationPageIdSource: storeInfo.locationPageIdSource,
            data: updatedOrCreatedProduct,
          },
        }
      );
      console.log(utdRes.data);
      return;
    }

    if (action === "updated") {
      const utdRes = await axios.patch(
        "https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
          storeInfo.siteId +
          "?access_token=" +
          storeInfo.builder_token,
        {
          syncId: updatedOrCreatedProduct.original_id,
          payload: {
            data: updatedOrCreatedProduct,
          },
        }
      );

      console.log(utdRes.data);
      return;
    }

    if (action === "deleted") {
      // do something when a product was deleted
      const utdRes = await axios.delete(
        "https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
          storeInfo.siteId +
          "?syncId=" +
          webhookRequest.entityId +
          "&access_token=" +
          storeInfo.builder_token
      );

      console.log(utdRes.data);
      return;
    }
  } catch (e) {
    throw e;
  }
}
