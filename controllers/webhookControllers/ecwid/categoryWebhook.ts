import EcwidWebhookRequest from "@/lib/apiKit/Ecwid/types/EcwidWebhookRequest";
import getStoreInfo from "@/lib/getStoreInfo";

export default async function ecwidCategoryWebhook(
  webhookRequest: EcwidWebhookRequest
) {
  // get store info
  const storeInfo = await getStoreInfo(webhookRequest.storeId) 
}