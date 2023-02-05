export default interface EcwidCategoryType {
  id: number;
  parentId: number;
  orderBy: number;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
  imageUrl: string;
  originalImageUrl: string;
  originalImage: ImageDetails;
  thumbnail: ImageDetails;
  name: string;
  nameTranslated: Translations;
  origin: string;
  url: string;
  productCount: number;
  enabledProductCount: number;
  description: string;
  descriptionTranslated: Translations;
  enabled: boolean;
  productIds: Array<number>;
}

interface ImageDetails {
  url: string;
  width: number;
  height: number;
}

interface Translations {
  [key: string]: string;
}
