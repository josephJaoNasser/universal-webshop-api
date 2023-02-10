import categoryWebhookHandler from "./categoryWebhook";
import productWebhookHandler from "./productWebhook";

export default {
  product: productWebhookHandler,
  category: categoryWebhookHandler,
};
