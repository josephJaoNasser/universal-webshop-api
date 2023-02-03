import { Image } from "./generalTypes";

interface StandardizedCategory {
  id: string;
  name: string;
  url: string;
  description: string;
  parent_id: string;
  image: Image;
  order: number;
  product_count: number;
}

export default StandardizedCategory;
