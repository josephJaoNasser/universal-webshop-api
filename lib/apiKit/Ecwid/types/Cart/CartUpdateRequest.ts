export default interface CartUpdateRequest {
  hidden: boolean;
  taxesOnShipping: Array<TaxOnShipping>;
  b2b_b2c: string;
  customerRequestedInvoice: boolean;
  customerFiscalCode: string;
  electronicInvoicePecEmail: string;
  electronicInvoiceSdiCode: string;
}

interface TaxOnShipping {
  name: string;
  value: number;
  total: number;
}
