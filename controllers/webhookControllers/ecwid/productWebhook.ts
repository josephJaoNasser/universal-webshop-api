import EcwidApi from "@/lib/apiKit/Ecwid";
import EcwidWebhookRequest, {
  EcwidEventAction,
} from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";
import { prune, stripHtml } from "@/lib/helpers/stripHtml";
import axios from "axios";

export default async function ecwidProductWebhook(
  webhookRequest: EcwidWebhookRequest,
  storeInfo: StoreInfo
) {
  try {
    const action = webhookRequest.eventType.split(".")[1] as EcwidEventAction;

    const Ecwid = new EcwidApi(
      storeInfo.storeId as number,
      storeInfo.credentials.token as string
    );

    const updatedOrCreatedProduct = await Ecwid.Products.getById({
      id: webhookRequest.entityId,
    });

    const fetchCategoriesRequest = updatedOrCreatedProduct.categories.map(
      (catId) => Ecwid.Categories.getById({ id: catId })
    );

    const categories = await Promise.all(fetchCategoriesRequest);
    const categoryNames = categories.map((catItem) => catItem.name);
    categoryNames.unshift(storeInfo.categoryAggregator);

    const body = {
      syncId: updatedOrCreatedProduct.original_id,
      bloggerId: "8989560993773713237",
      metadata: {
        title: updatedOrCreatedProduct.name,
        description: stripHtml(prune(updatedOrCreatedProduct.description, 150)),
        image: updatedOrCreatedProduct.images[0]?.src || "",
        categories: categoryNames,
      },
      payload: {
        locationPageIdSource: storeInfo.locationPageIdSource,
        name: updatedOrCreatedProduct.name, // this will define the page name upon publishing
        data: updatedOrCreatedProduct,
      },
    };

    const url =
      "https://www.uptodateconnect.com/api/v1/site-builder/location-pages/" +
      storeInfo.siteId +
      "?access_token=" +
      storeInfo.builder_token;

    if (action !== "deleted") {
      const utdRes = await axios.post(url, body);

      console.log({ utd_response: utdRes.data });
    } else {
      const utdRes = await axios.delete(
        url + "&syncId=" + webhookRequest.entityId
      );

      console.log({ utd_response: utdRes.data });
    }
    return;
  } catch (e) {
    throw e;
  }
}
