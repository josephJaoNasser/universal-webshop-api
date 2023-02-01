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
  images: ProductImage[];
}

interface ProductImage {
  id: String;
  src: String;
  alt: String;
}

interface Translations {
  [key: string]: String;
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

interface ProductOptions {
  
}

export interface StandardizedProduct extends ProductBasicData {
  variations: ProductBasicData[];
}
