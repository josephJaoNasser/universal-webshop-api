export default interface EcwidProductType {
  id: number;
  sku: string;
  quantity: number;
  unlimited: boolean;
  inStock: boolean;
  name: string;
  nameTranslated: Translations;
  price: number;
  defaultDisplayedPrice: number;
  defaultDisplayedPriceFormatted: string;
  costPrice: number;
  tax: TaxInfo;
  wholesalePrices: Array<WholesalePrice>;
  compareToPrice: number;
  compareToPriceFormatted: string;
  compareToPriceDiscount: number;
  compareToPriceDiscountFormatted: string;
  compareToPriceDiscountPercent: number;
  compareToPriceDiscountPercentFormatted: string;
  isShippingRequired: boolean;
  weight: number;
  url: string;
  created: string;
  updated: string;
  createTimestamp: number;
  updateTimestamp: number;
  productClassId: number;
  enabled: boolean;
  options: Array<ProductOption>;
  warningLimit: number;
  fixedShippingRateOnly: boolean;
  fixedShippingRate: number;
  shipping: ShippingSettings;
  defaultCombinationId: number;
  originalImage: Array<OriginalImage>;
  description: string;
  descriptionTranslated: Translations;
  galleryImages: Array<GalleryImages>;
  media: ProductMedia;
  categoryIds: Array<number>;
  categories: Array<CategoriesInfo>;
  defaultCategoryId: number;
  seoTitle: string;
  seoTitleTranslated: string;
  seoDescription: string;
  seoDecriptionTranslated: string;
  favorites: FavoritesStats;
  attributes: Array<AttributeValue>;
  files: Array<ProductFile>;
  relatedProducts: RelatedProducts;
  combinations: Array<Variation>;
  dimensions: ProductDimensions;
  volume: number;
  showOnFrontpage: number;
  isSampleProduct: boolean;
  isGiftCard: boolean;
  discountsAllowed: boolean;
  nameYourPriceEnabled: boolean;
  subscriptionSettings: Array<SubscriptionSettings>;
  subtitle: string;
  ribbon: Ribbon;
  subtitleTranslated: Translations;
  ribbonTranslated: Translations;
  externalReferenceId: string;
  customsHsTariffCode: string;
  outOfStockVisibilityBehaviour: string;
}

interface FavoritesStats {
  count: number;
  displayedCount: string;
}

interface WholesalePrice {
  quantity: number;
  price: number;
}

interface ProductOption {
  type: string;
  name: string;
  nameTranslated: Translations;
  choices: Array<ProductOptionChoice>;
  defaultChoice: number;
  required: boolean;
}

interface ShippingSettings {
  type: string;
  methodMarkup: number;
  flatRate: number;
  disabledMethods: Array<string>;
  enabledMethods: Array<string>;
}

interface OriginalImage {
  url: string;
  width: number;
  height: number;
}

interface GalleryImages {
  id: number;
  url: string;
  thumbnail: string;
  originalImageUrl: string;
  imageUrl: string;
  hdThumbnailUrl: string;
  thumbnailUrl: string;
  smallThumbnailUrl: string;
  width: number;
  height: number;
  orderBy: number;
  borderInfo: Array<BorderInfo>;
}

interface BorderInfo {
  dominatingColor: Array<DominatingColor>;
  homogeneity: boolean;
}

interface DominatingColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

interface ProductMedia {
  images: Array<ProductImage>;
}

interface ProductImage {
  id: number;
  orderBy: number;
  isMain: boolean;
  image160pxUrl: string;
  image400pxUrl: string;
  image800pxUrl: string;
  image1500pxUrl: string;
  imageOriginalUrl: string;
}

interface CategoriesInfo {
  id: number;
  enabled: boolean;
}

interface AttributeValue {
  id: number;
  name: string;
  nameTranslated: Translations;
  value: string;
  valueTranslated: Translations;
  type: string;
  show: string;
}

interface ProductFile {
  id: number;
  name: string;
  description: string;
  size: number;
  adminUrl: string;
}

interface RelatedProducts {
  productIds: Array<number>;
  relatedCategory: RelatedCategory;
}

interface RelatedCategory {
  enabled: boolean;
  categoryId: number;
  productCount: number;
}

interface Variation {
  id: number;
  combinationNumber: number;
  options: Array<OptionValue>;
  sku: string;
  thumbnailUrl: string;
  imageUrl: string;
  smallThumbnailUrl: string;
  hdThumbnailUrl: string;
  originalImageUrl: string;
  quantity: number;
  unlimited: boolean;
  price: number;
  wholesalePrices: Array<WholesalePrice>;
  weight: number;
  warningLimit: number;
  attributes: Array<AttributeValue>;
  compareToPrice: number;
}

interface OptionValue {
  name: string;
  nameTranslated: Translations;
  value: string;
  valueTranslated: Translations;
}

interface ProductOptionChoice {
  text: string;
  textTranslated: Translations;
  priceModifier: number;
  priceModifierType: string;
}

interface Translations {
  [key: string]: string;
}

interface ProductDimensions {
  length: number;
  width: number;
  height: number;
}

interface SubscriptionSettings {
  subscriptionAllowed: boolean;
  oneTimePurchaseAllowed: boolean;
  oneTimePurchasePrice: number;
  oneTimePurchasePriceFormatted: string;
  oneTimePurchaseMarkup: number;
  oneTimePurchaseMarkupFormatted: string;
  oneTimePurchaseMarkupPercent: number;
  oneTimePurchaseMarkupPercentFormatted: string;
  displayedOneTimePurchaseMarkupPercent: number;
  displayedOneTimePurchaseMarkupPercentFormatted: string;
  recurringChargeSettings: RecurringChargeSettings;
}

interface RecurringChargeSettings {
  recurringInterval: string;
  recurringIntervalCount: number;
  subscriptionPriceWithSignUpFee: number;
  subscriptionPriceWithSignUpFeeFormatted: string;
  signUpFee: number;
  signUpFeeFormatted: string;
}

interface TaxInfo {
  taxable: boolean;
  defaultLocationIncludedTaxRate: number;
  enabledManualTaxes: Array<number>;
  taxClassCode: string;
}

interface NameYourPriceEnabled {
  priceDefaultTier: number;
  customPriceTiers: Array<any>;
}

interface Ribbon {
  text: string;
  color: string;
}
