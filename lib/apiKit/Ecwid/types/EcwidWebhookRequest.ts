export type EcwidEventCategory =
  | "unfinished_order"
  | "order"
  | "product"
  | "category"
  | "application"
  | "profile"
  | "discount_coupon"
  | "customer"
  | "invoice";

export type EcwidEventAction = "created" | "updated" | "deleted";
type EcwidEvent = `${EcwidEventCategory}.${EcwidEventAction}`;

interface EcwidWebhookRequest {
  eventId: string;
  eventCreated: number;
  storeId: number;
  entityId: number; //order number, category id, product id, etc ...
  eventType: EcwidEvent;
  data?: {
    [key: string]: any;
  };
}

export default EcwidWebhookRequest;
