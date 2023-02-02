import { Image, Translations } from "./generalTypes";

interface ProductBasicData {
  id: String;
  sku: String;
  name: String;
  url: String;
  description: String;
  translations: Translations;
  short_description: String;
  current_price: number;
  regulare_price: number;
  sale_price: Number;
  price_formatted: String;
  in_stock: Boolean;
  weight: String;
  dimensions: Dimensions;
  date_created: Date;
  date_modified: Date;
  related_product_ids: String[];
  quantity: Number;
  categories: Number[];
  fileAttatchments: FileAttatchments[];
  images: Image[];
  thumbnail: string;
}

interface Dimensions {
  length: String;
  width: String;
  height: String;
}

interface FileAttatchments {
  id: String;
  name: String;
  url: String;
}

export interface StandardizedProduct extends ProductBasicData {
  variations: ProductBasicData[];
  rawData: Object;
}
