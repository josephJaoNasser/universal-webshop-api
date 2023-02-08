import { Translations } from "./generalTypes";

interface StandardizedCategory {
  id?: string;
  original_id: string | number;
  name: string;
  url: string;
  description: string;
  parent_id: string | number;
  image: string;
  order?: number;
  product_count: number;
  translations?: Translations;
}

export default StandardizedCategory;
