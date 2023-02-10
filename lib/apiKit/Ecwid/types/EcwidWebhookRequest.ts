type EventCategory =
  | "unfinished_order"
  | "order"
  | "product"
  | "category"
  | "application"
  | "profile"
  | "discount_coupon"
  | "customer"
  | "invoice";

type EventAction = "created" | "updated" | "deleted";
type Event = `${EventCategory}.${EventAction}`;

interface EcwidWebhookRequest {
  eventId: string;
  eventCreated: number;
  storeId: number;
  entityId: number; //order number, category id, product id, etc ...
  eventType: Event;
  data?: {
    [key: string]: any;
  };
}

export default EcwidWebhookRequest;
