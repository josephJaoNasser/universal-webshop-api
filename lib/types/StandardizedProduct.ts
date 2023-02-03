import { Image, Translations } from "./generalTypes";

interface ProductBasicData {
  id: string | number;
  sku: string;
  name: string;
  url: string;
  description: string;
  translations?: Translations;
  short_description: string;
  current_price: number;
  regular_price: number;
  sale_price: number;
  price_formatted: string;
  in_stock: boolean;
  weight: string | number;
  dimensions: Dimensions;
  date_created: Date;
  date_modified: Date;
  related_product_ids: string[] | number[];
  quantity: number;
  categories: number[];
  fileAttachments: FileAttachments[];
  images: Image[];
  rawData: any;
}

interface Dimensions {
  length: string | number;
  width: string | number;
  height: string | number;
}

export interface FileAttachments {
  id: string | number;
  name?: string;
  description?: string;
  url: string;
  size?: number;
}

export default interface StandardizedProduct extends ProductBasicData {
  variations?: ProductBasicData[];
}
